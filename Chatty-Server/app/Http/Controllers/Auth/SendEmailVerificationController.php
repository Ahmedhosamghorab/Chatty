<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Mail;

class SendEmailVerificationController extends Controller
{
    public function sendVerificationEmail(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if($user && $user->hasVerifiedEmail()){
            return response()->json(['message' => 'Email is verified.']);
        }
        $signedUrl = URL::temporarySignedRoute(
            'auth.verify-email',
            now()->addMinutes(10),
            ['id' => $user->id]
        );
        Mail::to($user->email)->send(new EmailVerificationMail($signedUrl));
        return response()->json(['message' => 'Verification email sent']);
    }

}
