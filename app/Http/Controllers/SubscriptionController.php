<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class SubscriptionController extends Controller
{

    public function index(): Response
    {
        return inertia('Subscriptions/Index');
    }
    
}
