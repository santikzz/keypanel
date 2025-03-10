<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('is_free')->default(false);
            $table->string('patreon_tier_id')->nullable();
            $table->unsignedInteger('patreon_cents')->nullable();
            // $table->enum('billing_interval', ['day', 'week', 'month', 'year']);
            $table->unsignedInteger('max_applications');
            $table->unsignedInteger('max_licenses');
            $table->unsignedInteger('max_resellers');
            $table->unsignedInteger('max_managers');
            $table->json('features');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_plans');
    }
};
