<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;

class SavedJobController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $savedJobs = $user->savedJobs()->with('user')->get();
        return response()->json([
            'message' => 'Success fetch saved jobs',
            'data' => $savedJobs
        ], 200);
    }
    public function save($id)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $jobVacancy = JobVacancy::find($id);
        if (!$jobVacancy) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        if ($user->savedJobs()->where('job_vacancy_id', $id)->exists()) {
            return response()->json(['message' => 'Job already saved'], 409);
        }
        $user->savedJobs()->attach($id);

        return response()->json(['message' => 'Job saved successfully'], 201);
    }

    public function unSave($id)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if (!$user->savedJobs()->where('job_vacancy_id', $id)->exists()) {
            return response()->json(['message' => 'Job not saved yet'], 404);
        }
        $user->savedJobs()->detach($id);
        return response()->json(['message' => 'Job Unsaved successfully'], 200);
    }
}
