<?php

namespace App\Http\Controllers\Dashboard;

use App\Events\NewAdminEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;

class AuthController extends Controller
{
    public function login()
    {
        return view('dashboard.login');
    }


    public function store(Request $request)
    {
        $request->validate([
            'email' => "required|email|string|max:255",
            'password' => "required|string",
        ]);
        if (auth('admin')->attempt($request->only('email', 'password'))) {
            Broadcast(new NewAdminEvent());
            return redirect()->route('admin.home');
        }
        return redirect()->back()->withInput($request->only('email'))->with('error', 'Invalid User');
    }


    public function logout()
    {
        auth('admin')->logout();
        return redirect()->route('admin.login');
    }
}