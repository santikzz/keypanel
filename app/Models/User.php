<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

/**
 * @mixin \Spatie\Permission\Traits\HasRoles
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

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
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['roles', 'permissions'];

    protected $appends = ['all_permissions'];

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
            'disabled' => 'boolean'
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
        return $this->belongsTo(User::class, 'owner_id');
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

    /*
        ========================= Subscription methods =========================
    */
    public function subscription()
    {
        return $this->hasOne(UserSubscription::class, 'user_id');
    }

    public function getSubscriptionPlan()
    {
        if ($this->hasActiveSubscription()) {
            return $this->subscription->plan;
        }
        return SubscriptionPlan::getFreePlan();
    }

    public function hasActiveSubscription()
    {
        return $this->subscription && $this->subscription->isActive();
    }

    public function getSubscriptionDaysRemaining()
    {
        if (!$this->hasActiveSubscription()) {
            return null;
        }
        return now()->diffInDays($this->subscription->ends_at, false);
    }

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
        return $this->licenses()->count() < $plan->max_keys;
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

    public function subscribeToPlan(SubscriptionPlan $plan, $paypalSubscriptionId = null)
    {

        // Find or create a subscription
        $subscription = UserSubscription::firstOrNew([
            'user_id' => $this->id
        ]);

        $isNewSubscription = !$subscription->exists;

        $subscription->plan_id = $plan->id;
        $subscription->status = 'active';

        if ($isNewSubscription) {
            $subscription->starts_at = now();
        }

        if ($plan->isFree() || $paypalSubscriptionId == null) {
            $subscription->ends_at = now()->add($plan->billing_interval, 1);
        } else {
            $subscription->paypal_subscription_id = $paypalSubscriptionId;
            $subscription->last_payment_date = now();
            $subscription->extendPeriod();
        }

        $subscription->save();
        return $subscription;
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
