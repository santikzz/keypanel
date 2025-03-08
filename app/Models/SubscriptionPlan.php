<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'billing_interval',
        'max_applications',
        'max_keys',
        'max_resellers',
        'max_managers',
        'features'
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
    ];

    public function subscriptors()
    {
        return $this->hasMany(UserSubscription::class, 'plan_id');
    }

    public function getFreePlan()
    {
        return self::where('price', 0)->first();
    }

    public function isFree()
    {
        return $this->price == 0;
    }
}
