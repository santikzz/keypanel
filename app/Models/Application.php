<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = ['owner_id', 'app_hash_id', 'name', 'description', 'status', 'download_url'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function licenses()
    {
        return $this->hasMany(License::class, 'app_id');
    }
}
