<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user = [
            [
                'name' => 'admin',
                'username' => 'admin',
                'password' => bcrypt('123456'),
                'level' => 1,
                'email' => 'admin@gmail.com',
            ],
            [
                'name' => 'customer',
                'username' => 'customer',
                'password' => bcrypt('123456'),
                'level' => 2,
                'email' => 'customer@gmail.com',
            ],
        ];

        foreach ($user as $key => $value) {
            User::create($value);
        };
    }
}
