<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class VerifyEmailController extends Controller
{
    public function VerifyEmail(Request $request , $id){
        if (!URL::hasValidSignature($request)) {
            return response()->json(['message' => 'Invalid or expired verification link'], 403);
        }
        $user = User::findOrFail($id);
        $user->email_verified_at = now();
        $user->save();
        return view("auth.verified" , compact("user"));

    }
}
