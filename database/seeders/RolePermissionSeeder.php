<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $ownerRole = Role::firstOrCreate(['name' => 'owner']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $resellerRole = Role::firstOrCreate(['name' => 'reseller']);

        // Define permissions
        $permissions = [
            // apps
            'APPS_CREATE',
            'APPS_READ',
            'APPS_UPDATE',
            'APPS_DELETE',
            // keys
            'KEYS_CREATE',
            'KEYS_READ',
            'KEYS_UPDATE',
            'KEYS_DELETE',
            'KEYS_RESET_HWID',
            'KEYS_ADD_TIME',
            // resellers
            'RESELLER_CREATE',
            'RESELLER_READ',
            'RESELLER_UPDATE',
            'RESELLER_DELETE',
            'RESELLER_ADD_BALANCE',
            // managers
            'MANAGER_CREATE',
            'MANAGER_READ',
            'MANAGER_UPDATE',
            'MANAGER_DELETE',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign all permissions to the owner
        $ownerRole->givePermissionTo(Permission::all());
    }
}
