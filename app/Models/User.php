<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Paddle\Billable;
use Spatie\Permission\Traits\HasRoles;

/**
 * @mixin \Spatie\Permission\Traits\HasRoles
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */

    use HasFactory;
    use Notifiable;
    use HasRoles;
    use Billable;

    // protected $guard_name = 'web';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'owner_id',
        'balance',
        'disabled',
        'plan_id',
        'plan_ends_at',
        'is_super',
        'paddle_json',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'plan_id',
        'disabled',
        'is_super',
        'paddle_json'
    ];

    protected $with = ['roles', 'permissions'];

    protected $appends = ['all_permissions', 'subscription', 'application_count', 'license_count', 'resellers_count', 'managers_count'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'disabled' => 'boolean',
            'paddle_json' => 'array',
        ];
    }

    public function getAllPermissionsAttribute()
    {
        return $this->getAllPermissions()->pluck('name'); // Returns an array of permission names
    }

    public function isOwner()
    {
        return $this->role === 'owner';
    }
    public function isManager()
    {
        return $this->role === 'manager';
    }
    public function isReseller()
    {
        return $this->role === 'reseller';
    }

    public function owner()
    {
        if ($this->isOwner()) {
            return $this;
        }
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->hasMany(User::class, 'owner_id');
    }

    public function resellers()
    {
        return $this->hasMany(User::class, 'owner_id')->where('role', 'reseller');
    }

    public function managers()
    {
        return $this->hasMany(User::class, 'owner_id')->where('role', 'manager');
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'owner_id');
    }

    public function licenses()
    {
        return $this->hasMany(License::class, 'issued_by');
    }

    public function transactions()
    {
        return $this->hasMany(BalanceTransaction::class, 'user_id');
    }

    public function getRealOwnerIdAttribute(): ?int
    {
        return $this->isOwner() ? $this->id : ($this->owner?->id ?? null);
    }
    public function getLicenseCountAttribute()
    {
        if ($this->isOwner()) {
            return $this->licenses->count();
        }
        return $this->owner->licenses->count();
    }

    public function getManagersCountAttribute()
    {
        if ($this->isOwner()) {
            return $this->managers()->count();
        }
        return $this->owner->managers()->count();
    }

    public function getResellersCountAttribute()
    {
        if ($this->isOwner()) {
            return $this->resellers()->count();
        }
        return $this->owner->resellers()->count();
    }

    public function getApplicationCountAttribute()
    {
        if ($this->isOwner()) {
            return $this->applications->count();
        }
        return $this->owner->applications->count();
    }

    /*
        ========================= Subscription methods =========================
    */
    public function subscription()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'plan_id');
    }

    public function getSubscriptionPlan()
    {
        $subscription = $this->subscription()->first();
        if ($subscription) {
            return $subscription;
        }
        return SubscriptionPlan::getFreePlan();
    }

    public function getSubscriptionAttribute()
    {
        return $this->getSubscriptionPlan();
    }

    // public function getSubscriptionDaysRemaining()
    // {
    //     $subscription = $this->getActiveSubscription();
    //     if (!$subscription) {
    //         return null;
    //     }
    //     return now()->diffInDays($subscription->ends_at, false);
    // }

    // Check if user can create more applications
    public function canCreateMoreApplications()
    {
        $plan = $this->getSubscriptionPlan();
        return $this->applications()->count() < $plan->max_applications;
    }

    // Check if user can create more licenses
    public function canCreateMoreLicenses()
    {
        $plan = $this->getSubscriptionPlan();
        return $this->licenses()->count() < $plan->max_licenses;
    }

    // Check if user can create more resellers
    public function canCreateMoreResellers()
    {
        $plan = $this->getSubscriptionPlan();
        return $this->resellers()->count() < $plan->max_resellers;
    }

    // Check if user can create more managers
    public function canCreateMoreManagers()
    {
        $plan = $this->getSubscriptionPlan();
        return $this->managers()->count() < $plan->max_managers;
    }

    public function subscribeToPlan(SubscriptionPlan $plan, $endsAt = null)
    {
        // Find or create a subscription
        // $subscription = UserSubscription::firstOrNew(['user_id' => $this->id]);

        // $isNewSubscription = !$subscription->exists;
        // $subscription->plan_id = $plan->id;
        // $subscription->status = 'active';

        // if ($isNewSubscription) {
        //     $subscription->starts_at = now();
        // }

        // if ($plan->isFree()) {
        //     $subscription->ends_at = null;
        // } else {
        //     switch ($plan->billing_interval) {
        //         case 'day':
        //             $subscription->ends_at = now()->addDays(1);
        //             break;
        //         case 'week':
        //             $subscription->ends_at = now()->addWeeks(1);
        //             break;
        //         case 'month':
        //             $subscription->ends_at = now()->addMonths(1);
        //             break;
        //         case 'year':
        //             $subscription->ends_at = now()->addYears(1);
        //             break;
        //         default:
        //             $subscription->ends_at = now()->addMonths(1);
        //     }

        //     $subscription->last_payment_date = now();
        //     $subscription->extendPeriod();
        // }

        // $subscription->save();
        // return $subscription;

        $this->update(['plan_id' => $plan->id, 'plan_ends_at' => $endsAt]);
        return $this;
    }

    public function plantExtendPeriod($date)
    {
        $this->update(['plan_ends_at' => $date]);
    }

    public function assignFreePlan()
    {
        $freePlan = SubscriptionPlan::getFreePlan();
        if (!$freePlan) {
            throw new \Exception('No free plan found');
        }
        return $this->subscribeToPlan($freePlan);
    }
}
