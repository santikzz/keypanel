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
            $table->decimal('price', 10, 2);
            $table->string('billing_interval');
            $table->integer('interval_count')->default(1);
            $table->unsignedInteger('max_applications');
            $table->unsignedInteger('max_licenses');
            $table->unsignedInteger('max_resellers');
            $table->unsignedInteger('max_managers');
            $table->json('features');
            $table->boolean('is_visible')->default(true);
            $table->string('paddle_price_id')->nullable()->default(null);
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
