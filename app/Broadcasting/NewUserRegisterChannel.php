<?php

namespace App\Broadcasting;

use App\Models\Admin;
use App\Models\User;

class NewUserRegisterChannel
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(Admin $admin): array|bool
    {
        return true;
    }
}