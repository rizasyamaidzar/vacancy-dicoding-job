<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;

class JobVacancyController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = JobVacancy::with('user');
        $query->when($request->title, function ($q) use ($request) {
            return $q->where('title', 'like', '%' . $request->title . '%');
        });
        $query->when($request->position, function ($q) use ($request) {
            return $q->where('position', 'like', '%' . $request->position . '%');
        });

        $query->when($request->type, function ($q) use ($request) {
            return $q->where('type', $request->type);
        });
        $query->when($request->location, function ($q) use ($request) {
            return $q->where('location', 'like', '%' . $request->location . '%');
        });
        $query->when($request->has('is_remote'), function ($q) use ($request) {
            return $q->where('is_remote', $request->boolean('is_remote'));
        });
        $data = $query->latest()->get();
        return ApiResponse::success(
            $data,
            'Job vacancy list'
        );
    }
    public function indexMyJobs(Request $request)
    {
        $userId = auth()->id();
        $query = JobVacancy::with('user')->where('user_id', $userId);
        $data = $query->latest()->get();
        return ApiResponse::success(
            $data,
            'My Job vacancy list'
        );
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'position' => 'required|string',
            'type' => 'required|in:Full-Time,Part-Time,Kontrak,Intern',
            'candidates_needed' => 'required|integer',
            'active_until' => 'required|date',
            'location' => 'required|string',
            'is_remote' => 'boolean',
            'description' => 'required|string',
            'min_experience' => 'required'
        ]);
        $validated['user_id'] = auth()->id();
        $validated['is_remote'] = $request->is_remote ?? false;

        $job = JobVacancy::create($validated);

        return ApiResponse::success(
            $job,
            'Job vacancy created successfully'
        );
    }

    public function show($id)
    {
        $job = JobVacancy::with('user')->findOrFail($id);
        return ApiResponse::success(
            $job,
            'Job vacancy detail'
        );
    }

    public function update(Request $request, $id)
    {
        $job = JobVacancy::findOrFail($id);
        if ($job->user_id !== auth()->id()) {
            return response()->json(['message' => 'Anda tidak memiliki akses'], 403);
        }

        $job->update($request->all());
        return ApiResponse::success(
            $job,
            'Job vacancy updated successfully'
        );
    }
    public function destroy($id)
    {
        $job = JobVacancy::findOrFail($id);

        if ($job->user_id !== auth()->id()) {
            return response()->json(['message' => 'Anda tidak memiliki akses'], 403);
        }

        $job->delete();
        return ApiResponse::success(
            $job,
            'Job vacancy deleted successfully'
        );
    }
}
