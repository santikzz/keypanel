<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_free',
        'price',
        'billing_interval',
        'interval_count',
        'max_applications',
        'max_licenses',
        'max_resellers',
        'max_managers',
        'features',
        'is_visible',
        'paddle_price_id',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'is_free' => 'boolean',
        'is_visible' => 'boolean'
    ];

    public function subscriptors()
    {
        return $this->hasMany(User::class);
    }

    public static function getFreePlan()
    {
        return self::where('is_free', true)->first();
    }

    public function isFree()
    {
        return $this->is_free === true;
    }
    
}
