<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobVacancyController;
use App\Http\Controllers\Api\SavedJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // Crud job vacancies
    Route::get('/my-jobs', [JobVacancyController::class, 'indexMyJobs']);
    Route::get('/jobs', [JobVacancyController::class, 'index']);
    Route::get('/jobs/{id}', [JobVacancyController::class, 'show']);
    Route::post('/jobs', [JobVacancyController::class, 'store']);
    Route::put('/jobs/{id}', [JobVacancyController::class, 'update']);
    Route::delete('/jobs/{id}', [JobVacancyController::class, 'destroy']);


    Route::get('/saved-jobs', [SavedJobController::class, 'index']);
    Route::post('/save/{id}', [SavedJobController::class, 'save']);
    Route::post('/unsave/{id}', [SavedJobController::class, 'unSave']);

    // Job Applications
    Route::post('/jobs/{id}/apply', [ApplicationController::class, 'apply']);
    Route::get('/my-applications', [ApplicationController::class, 'index']);
});
