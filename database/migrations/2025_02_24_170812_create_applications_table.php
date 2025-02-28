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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users', 'id')->onDelete('cascade');
            $table->string('app_hash_id', 16)->unique();
            $table->string('name');
            $table->enum('status', ['available', 'unavailable', 'hidden'])->default('available');
            $table->string('download_url', 2048)->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
