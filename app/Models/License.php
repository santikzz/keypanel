<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class License extends Model
{
    use HasFactory;

    protected $fillable = [
        'app_id',
        'license_key',
        'status',
        'duration',
        'activation_date',
        // 'expiry_date',
        'lifetime',
        'hwid',
        'issued_by',
        'is_reseller',
        // 'revoked',
        'note'
    ];

    protected $casts = [
        'activation_date' => 'datetime',
        // 'expiry_date' => 'datetime',
        'lifetime' => 'boolean',
        'is_reseller' => 'boolean',
        // 'revoked' => 'boolean',
    ];

    protected $appends = ['time_left'];

    public function application()
    {
        return $this->belongsTo(Application::class, 'app_id');
    }

    public function issuer()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function getTimeLeftAttribute()
    {
        if (!$this->activated_at) {
            return $this->duration;
        }

        $activationTime = Carbon::parse($this->activated_at);
        $expirationTime = $activationTime->addHours($this->duration);
        $timeLeft = Carbon::now()->diffInHours($expirationTime, false);
        return $timeLeft > 0 ? $timeLeft : 0;
    }
}
