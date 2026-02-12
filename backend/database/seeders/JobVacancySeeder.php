<?php

namespace Database\Seeders;

use App\Models\JobVacancy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class JobVacancySeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan ada user (recruiter) di database agar user_id tidak error
        $recruiterId = User::first()->id ?? User::factory()->create(['is_admin' => true])->id;

        $jobs = [
            [
                'title' => 'Senior Backend Engineer (Laravel)',
                'position' => 'Developer',
                'type' => 'Full-Time',
                'description' => '<h3>Tanggung Jawab</h3><ul><li>Membangun API yang scalable</li><li>Optimasi database</li></ul>',
                'location' => 'Jakarta (Remote)',
                'min_experience' => '4-5 tahun',
            ],
            [
                'title' => 'UI/UX Designer',
                'position' => 'Designer',
                'type' => 'Full-Time',
                'description' => '<h3>Deskripsi</h3><p>Mendesain antarmuka aplikasi mobile yang user-friendly.</p>',
                'location' => 'Bandung',
                'min_experience' => '1-3 tahun',
            ],
            [
                'title' => 'Mobile Developer (Flutter)',
                'position' => 'Developer',
                'type' => 'Kontrak',
                'description' => '<p>Membangun aplikasi cross-platform untuk klien internasional.</p>',
                'location' => 'Yogyakarta',
                'min_experience' => '1-3 tahun',
            ],
            [
                'title' => 'Android Developer (Kotlin)',
                'position' => 'Developer',
                'type' => 'Full-Time',
                'description' => '<h3>Kualifikasi</h3><ul><li>Menguasai MVVM</li><li>Paham Jetpack Compose</li></ul>',
                'location' => 'Jakarta',
                'min_experience' => '1-3 tahun',
            ],
            [
                'title' => 'Quality Assurance (QA) Engineer',
                'position' => 'Developer',
                'type' => 'Full-Time',
                'description' => '<p>Melakukan automated testing menggunakan Selenium atau Cypress.</p>',
                'location' => 'Remote',
                'min_experience' => '1-3 tahun',
            ],
            [
                'title' => 'Fullstack Web Developer',
                'position' => 'Developer',
                'type' => 'Full-Time',
                'description' => '<p>Menguasai TALL Stack (Tailwind, Alpine, Laravel, Livewire).</p>',
                'location' => 'Surabaya',
                'min_experience' => '4-5 tahun',
            ],
            [
                'title' => 'Internship Frontend Developer',
                'position' => 'Developer',
                'type' => 'Intern',
                'description' => '<p>Belajar membangun antarmuka web modern dengan Next.js.</p>',
                'location' => 'Bandung',
                'min_experience' => 'Kurang dari 1 tahun',
            ],
            [
                'title' => 'DevOps Engineer',
                'position' => 'Developer',
                'type' => 'Full-Time',
                'description' => '<p>Mengelola infrastruktur AWS dan CI/CD pipeline.</p>',
                'location' => 'Jakarta',
                'min_experience' => '6-10 tahun',
            ],
            [
                'title' => 'Product Designer',
                'position' => 'Designer',
                'type' => 'Full-Time',
                'description' => '<p>Bekerja sama dengan tim product manager untuk fitur baru.</p>',
                'location' => 'Remote',
                'min_experience' => '1-3 tahun',
            ],
            [
                'title' => 'Scrum Master',
                'position' => 'Project Manager',
                'type' => 'Kontrak',
                'description' => '<p>Memastikan proses agile berjalan dengan lancar dalam tim engineering.</p>',
                'location' => 'Jakarta',
                'min_experience' => '4-5 tahun',
            ],
        ];

        foreach ($jobs as $job) {
            JobVacancy::create([
                'user_id' => $recruiterId,
                'title' => $job['title'],
                'position' => $job['position'],
                'type' => $job['type'],
                'candidates_needed' => rand(1, 5),
                'active_until' => Carbon::now()->addMonths(2),
                'location' => $job['location'],
                'is_remote' => str_contains($job['location'], 'Remote'),
                'description' => $job['description'],
                'salary_min' => rand(5, 10) * 1000000,
                'salary_max' => rand(11, 25) * 1000000,
                'show_salary' => (bool)rand(0, 1),
                'min_experience' => $job['min_experience'],
            ]);
        }
    }
}
