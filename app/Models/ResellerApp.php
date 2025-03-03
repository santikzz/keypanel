<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResellerApp extends Model
{
    protected $fillable = ['user_id', 'app_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function app()
    {
        return $this->belongsTo(Application::class);
    }

    public function timeTypes()
    {
        return $this->hasMany(ResellerTimeType::class);
    }

}
