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

        $rps = new RolePermissionSeeder;
        $rps->run();

        SubscriptionPlan::create([
            'name' => 'Free',
            'is_free' => true,
            'max_applications' => 1,
            'max_licenses' => 5,
            'max_resellers' => 1,
            'max_managers' => 1,
            'features' => []
        ]);

        SubscriptionPlan::create([
            'name' => 'Tier 1',
            'patreon_tier_id' => '123',
            'patreon_cents' => 500,
            'max_applications' => 10,
            'max_licenses' => 100,
            'max_resellers' => 10,
            'max_managers' => 10,
            'features' => []
        ]);

        SubscriptionPlan::create([
            'name' => 'Tier 2',
            'patreon_tier_id' => '123',
            'patreon_cents' => 1500,
            'max_applications' => 100,
            'max_licenses' => 10000,
            'max_resellers' => 50,
            'max_managers' => 10,
            'features' => []
        ]);

        SubscriptionPlan::factory()->create([
            'name' => 'Tier 3',
            'patreon_tier_id' => '123',
            'patreon_cents' => 2500,
            'max_applications' => 200,
            'max_licenses' => 100000,
            'max_resellers' => 100,
            'max_managers' => 10,
            'features' => []
        ]);

        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'adminadmin',
            'plan_id' => SubscriptionPlan::getFreePlan()->id,
        ]);
        $user->assignRole('owner');
    }
}
