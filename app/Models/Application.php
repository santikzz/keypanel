<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = ['owner_id', 'app_hash_id', 'app_secret', 'name', 'description', 'status', 'download_url'];

    protected $appends = ['license_count'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function licenses()
    {
        return $this->hasMany(License::class, 'app_id');
    }

    public function resellerApps()
    {
        return $this->hasMany(ResellerApp::class, 'app_id');
    }

    public function getLicenseCountAttribute()
    {
        return $this->licenses()->count();
    }
}
