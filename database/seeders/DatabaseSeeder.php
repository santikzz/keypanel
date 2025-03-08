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
            'cents' => 0,
            'billing_interval' => 'month',
            'max_applications' => 1,
            'max_keys' => 5,
            'max_resellers' => 1,
            'max_managers' => 1,
            'features' => []
        ]);

        SubscriptionPlan::factory()->create([
            'name' => 'Tier 1',
            'price' => 5.0,
            'cents' => 500,
            'billing_interval' => 'month',
            'max_applications' => 10,
            'max_keys' => 100,
            'max_resellers' => 10,
            'max_managers' => 10,
            'features' => []
        ]);

        SubscriptionPlan::factory()->create([
            'name' => 'Tier 2',
            'price' => 15.0,
            'cents' => 1500,
            'billing_interval' => 'month',
            'max_applications' => 100,
            'max_keys' => 10000,
            'max_resellers' => 50,
            'max_managers' => 10,
            'features' => []
        ]);

        SubscriptionPlan::factory()->create([
            'name' => 'Tier 3',
            'price' => 25.0,
            'cents' => 2500,
            'billing_interval' => 'month',
            'max_applications' => 200,
            'max_keys' => 100000,
            'max_resellers' => 100,
            'max_managers' => 10,
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
