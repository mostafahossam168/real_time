<?php

use App\Broadcasting\NewUserRegisterChannel;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

//Auth Private
Broadcast::channel('testing', NewUserRegisterChannel::class, ['guards' => ['admin']]);
// Broadcast::channel('testing', function ($user) {
//     return true;
// }, ['guards' => ['admin']]);

//Auth Precese
Broadcast::channel('admin_room_channel', function ($admin) {
    return ['id' => $admin->id, 'name' => $admin->name];
}, ['guards' => ['admin']]);