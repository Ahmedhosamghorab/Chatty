<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        return response()->json(['message' => 'User created successfully' , "token" => $token])
        ->cookie('name', 'value', 60, '/', null, true, true, false, 'None');
        ;

    }
}
