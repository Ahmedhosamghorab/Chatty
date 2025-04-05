<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SendEmailVerificationController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\FriendController;
use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(["auth:sanctum" , "verified"]);
Route::prefix("auth")->group(function (){
    Route::post("/register" , [RegisterController::class , "Register"]);
    Route::post("/login" , [LoginController::class , "Login"]);
    Route::post("/logout" , [LogoutController::class , "Logout"])->middleware(["auth:sanctum" , "verified"]);
    Route::post("/send-email-verification" , [SendEmailVerificationController::class , "sendVerificationEmail"])->middleware("auth:sanctum");
    Route::get("/verify-email/{id}" , [VerifyEmailController::class , "VerifyEmail"])->name('auth.verify-email');
});
Route::controller(FriendController::class)->group(function () {
    Route::get('/friends', 'index')->middleware(["auth:sanctum" , "verified"]);

});
