<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    //
    protected $fillable = [
        'user_id',
        'job_vacancy_id',
        'resume',
        'cover_letter',
        'status',
    ];
    protected $appends = ['resume_url'];
    public function getResumeUrlAttribute()
    {
        if ($this->resume) {
            return asset('storage/' . $this->resume);
        }

        return null;
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function jobVacancy()
    {
        return $this->belongsTo(JobVacancy::class);
    }
}
