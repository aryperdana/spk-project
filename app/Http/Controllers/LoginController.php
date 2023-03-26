<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        if (Auth::user()) {
            if (Auth::user()->level === "1")  {
                return redirect()->intended('/admin/dashboard');
            } else {
                return redirect()->intended('/');
            }
          
        }

        return Inertia::render('Auth/Login',  [
            'status' => session('status'),
        ]);
    }

    public function proses(Request $request)
    {

        // dd($request);
        $request->validate(
            [
                'username' => 'required',
                'password' => 'required',
            ],
            [
                'username.required' => 'Username Tidak Boleh Kosong',
                'password.required' => 'Password Tidak Boleh Kosong'
            ]
        );

        $credential = $request->only('username', 'password');
        if (Auth::attempt($credential)) {
            $request->session()->regenerate();
            $user = Auth::user();

            if ($user) {
                if ($user->level === "1")  {
                    return redirect()->intended('/admin/dashboard');
                } else {
                    return redirect()->intended('/');
                }
            }

            return redirect()->intended('/');
        }

        return back()->withErrors([
            'username' => 'Username atau Password Salah'
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        // dd($request);
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('login');
    }
}
