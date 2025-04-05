<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerificationMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Mail;
use URL;

class RegisterController extends Controller
{
    public function Register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::create($validator->validated());
        $token = $user->createToken("access_token")->plainTextToken;
        $signedUrl = URL::temporarySignedRoute(
            'auth.verify-email',
            now()->addMinutes(10),
            ['id' => $user->id]
        );
        Mail::to($user->email)->send(new EmailVerificationMail($signedUrl));
        return response()
        ->json(['message' => 'User created successfully , Check Your email']);
    }
}
