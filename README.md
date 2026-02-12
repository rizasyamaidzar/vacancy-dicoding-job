# 🚀 Job Vacancy - Dicoding Jobs Clone

Aplikasi Portal Lowongan Kerja (Job Board) modern yang menggunakan arsitektur **Decoupled** (Pemisahan Frontend & Backend). Dibangun menggunakan **Laravel 11** sebagai RESTful API dan **Next.js** sebagai antarmuka pengguna yang dinamis.

---

## 📝 Deskripsi Project
Project ini mensimulasikan platform pencarian kerja profesional dengan dua peran utama:
1.  **Recruiter (Admin):** Mempublikasikan, mengubah, dan menghapus lowongan kerja.
2.  **Candidate (User):** Menjelajahi lowongan, menyimpan lowongan favorit (Bookmark), dan mengirim lamaran kerja dengan mengunggah Resume/CV.
## 📝 Akun 
1. admin@dicoding.com | password
2. jobseeker@dicoding.com | password

---

## 🏗️ Tech Stack
| Komponen | Teknologi |
| :--- | :--- |
| **Backend API** | Laravel 12, PHP 8.2+, MySQL |
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS |
| **Authentication** | JWT (JSON Web Token) / Sanctum |
| **Editor** | Quill.js Rich Text Editor (via CDN) |
| **HTTP Client** | Axios |

---

## ⚙️ Persyaratan Sistem
Sebelum memulai, pastikan perangkat Anda sudah terpasang:
* **PHP** ≥ 8.2 & **Composer**
* **Node.js** ≥ 18.x (v20 sangat direkomendasikan)
* **MySQL** Server

---

## 🚀 Panduan Instalasi Lokal

### 1. Setup Backend (Laravel)
Buka terminal Anda dan jalankan perintah berikut:
```bash
# Masuk ke folder backend
cd backend

# Instal dependensi PHP
composer install

# Siapkan environment
cp .env.example .env

# Buat database baru di MySQL dengan nama 'job_vacancy_db'
# Sesuaikan DB_DATABASE, DB_USERNAME, dan DB_PASSWORD di file .env

# Generate Key & JWT Secret
php artisan key:generate

# Migrasi Database & Seeding data dummy (10 Lowongan)
php artisan migrate --seed

# Hubungkan folder storage agar file resume bisa diakses
php artisan storage:link

# Jalankan server
php artisan serve
```
### 2. Setup Frontend (Next JS)
Buka terminal Anda dan jalankan perintah berikut:
```bash
# Masuk ke folder frontend
cd frontend

# Instal dependensi Node.js
npm install

# Jalankan aplikasi (Development Mode)
npm run dev
