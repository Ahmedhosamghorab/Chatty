<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function Logout(){
        $user = auth()->user();
        if($user){
            $user->tokens()->delete();
            return response()->json([
                'message' => 'Logout successful',
            ]);
    }
    }
}
