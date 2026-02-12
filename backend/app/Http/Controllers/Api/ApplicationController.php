<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobVacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    public function apply(Request $request, $id)
    {
        $user = auth()->user();
        $request->validate([
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'cover_letter' => 'nullable|string'
        ]);
        $job = JobVacancy::find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }
        $alreadyApplied = JobApplication::where('user_id', $user->id)
            ->where('job_vacancy_id', $id)
            ->exists();

        if ($alreadyApplied) {
            return response()->json(['message' => 'You have already applied for this job'], 409);
        }
        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('resumes', 'public');
        }
        $application = JobApplication::create([
            'user_id' => $user->id,
            'job_vacancy_id' => $id,
            'resume' => $resumePath,
            'cover_letter' => $request->cover_letter,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'data' => $application
        ], 201);
    }

    public function index()
    {
        $user = auth()->user();
        $applications = JobApplication::with('jobVacancy.user')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Success fetch your applications',
            'data' => $applications
        ], 200);
    }
}
