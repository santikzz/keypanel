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
        // 'billing_interval',
        'patreon_tier_id',
        'patreon_cents',
        'max_applications',
        'max_licenses',
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
        return $this->hasMany(User::class);
    }

    public static function getFreePlan()
    {
        return self::where('is_free', true)->first();
    }

    public function isFree()
    {
        return $this->is_free == 0;
    }
}
