<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\License>
 */
class LicenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'license_key' => bin2hex(random_bytes(16)),
            'status' => $this->faker->randomElement(['unused', 'active', 'expired', 'revoked']),
            'duration' => $this->faker->numberBetween(720, int2: 17280),
            'activated_at' => $this->faker->dateTimeThisYear(),
            'lifetime' => $this->faker->boolean(10),
            'hwid' => $this->faker->uuid(),
            'issued_by' => 1,
            'note' => $this->faker->sentence(),
        ];
    }
}
