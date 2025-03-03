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
        Schema::create('reseller_time_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reseller_app_id')->constrained('reseller_apps', 'id')->onDelete('cascade');
            $table->string('name');
            $table->unsignedBigInteger('duration');
            $table->boolean('lifetime')->default(false);
            $table->decimal('cost', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reseller_time_types');
    }
};
