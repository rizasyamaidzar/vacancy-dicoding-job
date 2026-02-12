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
        Schema::create('job_vacancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('position');
            $table->enum('type', ['Full-Time', 'Part-Time', 'Kontrak', 'Intern']);
            $table->integer('candidates_needed');
            $table->date('active_until');
            $table->string('location');
            $table->boolean('is_remote')->default(false);
            $table->longText('description');
            $table->unsignedBigInteger('salary_min')->nullable();
            $table->unsignedBigInteger('salary_max')->nullable();
            $table->boolean('show_salary')->default(false);
            $table->string('min_experience');
            // $table->enum('min_experience', [
            //     'Kurang dari 1 tahun',
            //     '1-3 tahun',
            //     '4-5 tahun',
            //     '6-10 tahun',
            //     'Lebih dari 10 tahun'
            // ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_vacancies');
    }
};
