<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_id',
        'status',
        'starts_at',
        'ends_at'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }

    public function isActive()
    {
        return $this->status === 'active' &&
            ($this->ends_at === null || $this->ends_at->isFuture());
    }

    public function isExpired()
    {
        return $this->ends_at !== null && $this->ends_at->isPast();
    }

    public function extendPeriod()
    {
        $interval = $this->plan->billing_interval;

        if ($this->ends_at === null) {
            $this->ends_at = now();
        }

        switch ($interval) {
            case 'day':
                $this->ends_at = $this->ends_at->addDay();
                break;
            case 'week':
                $this->ends_at = $this->ends_at->addWeek();
                break;
            case 'month':
                $this->ends_at = $this->ends_at->addMonth();
                break;
            case 'year':
                $this->ends_at = $this->ends_at->addYear();
                break;
        }

        $this->last_payment_date = now();
        $this->save();

        return $this;
    }

    // Update subscription with PayPal data
    public function updateWithPayPalSubscription($paypalSubscriptionId)
    {
        $this->paypal_subscription_id = $paypalSubscriptionId;
        $this->status = 'active';
        $this->last_payment_date = now();
        $this->save();
        return $this;
    }

    public function cancel()
    {
        $this->status = 'cancelled';
        $this->save();
        return $this;
    }
}
