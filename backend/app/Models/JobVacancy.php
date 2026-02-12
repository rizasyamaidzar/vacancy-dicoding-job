<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobVacancy extends Model
{
    //
    protected $fillable = [
        'user_id',
        'title',
        'position',
        'type',
        'candidates_needed',
        'active_until',
        'location',
        'is_remote',
        'description',
        'salary_min',
        'salary_max',
        'show_salary',
        'min_experience'
    ];

    // Relasi ke User (Recruiter)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function savedByUsers()
    {
        return $this->belongsToMany(
            User::class,
            'job_saved'
        )->withTimestamps();
    }

    public function getIsSavedAttribute(): bool
    {
        $user = auth()->id();

        if (!$user) {
            return false;
        }

        return $this->savedByUsers()
            ->where('user_id', $user)
            ->exists();
    }
}
