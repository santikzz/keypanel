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

    // public function subscriptions()
    // {
    //     return $this->hasMany(UserSubscription::class);
    // }

    // public function activeSubscription()
    // {
    //     return $this->hasOne(UserSubscription::class)->where('status', 'active');
    // }

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

    public function applications(){
        return $this->hasMany(Application::class, 'owner_id');
    }

    public function licenses(){
        return $this->hasMany(License::class, 'issued_by');
    }

    public function getRealOwnerIdAttribute(): ?int
    {
        return $this->isOwner() ? $this->id : ($this->owner?->id ?? null);
    }

}