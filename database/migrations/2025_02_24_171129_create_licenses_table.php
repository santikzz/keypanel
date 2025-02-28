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
        Schema::create('licenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('app_id')->constrained('applications')->onDelete('cascade');
            $table->string('license_key')->unique();
            $table->enum('status', ['unused', 'active', 'expired', 'revoked'])->default('unused');
            $table->bigInteger('duration');
            $table->timestamp('activated_at')->nullable();
            $table->boolean('lifetime')->default(false);
            $table->string('hwid')->nullable()->default(null);
            $table->foreignId('issued_by')->constrained('users', 'id')->onDelete('cascade');
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses');
    }
};
