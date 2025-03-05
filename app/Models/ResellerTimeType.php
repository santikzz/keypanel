<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResellerTimeType extends Model
{
    protected $fillable = ['reseller_app_id', 'name', 'duration', 'lifetime', 'cost'];

    public function resellerApp()
    {
        return $this->belongsTo(ResellerApp::class, 'reseller_app_id', 'id');
    }
}
