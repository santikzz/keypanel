<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\License;
use App\Models\SubscriptionPlan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'adminadmin'
        ]);
        $user->assignRole('owner');

        SubscriptionPlan::factory()->create([
            'name' => 'Free',
            'price' => 0,
            'billing_interval' => 'monthly',
            'max_applications' => 1,
            'max_keys' => 5,
            'max_resellers' => 1,
            'max_managers' => 1,
            'features' => []
        ]);

        // Application::factory(10)->create([
        //     'owner_id' => $user->id  
        // ]);

        // License::factory(10)->create([
        //     'app_id' => Application::inRandomOrder()->first()->id
        // ]);

    }
}
