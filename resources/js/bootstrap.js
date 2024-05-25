/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

console.log("ssssssssssssss");
window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
    wsHost: import.meta.env.VITE_PUSHER_HOST
        ? import.meta.env.VITE_PUSHER_HOST
        : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
});

//Public Channel
// window.Echo.channel(`testing`).listen("NewUserRegisterEvent", (e) => {
//     console.log(e);
//     $("#icon-notifications").load(" #icon-notifications > *");
//     $("#notifications").load(" #notifications > *");
// });

//Private Channel
window.Echo.private(`testing`).listen("NewUserRegisterEvent", (e) => {
    console.log(e);
    $("#icon-notifications").load(" #icon-notifications > *");
    $("#notifications").load(" #notifications > *");
});

//Precese Channel
window.Echo.join(`admin_room_channel`)
    .here((users) => {
        console.log("Here");
        console.log(users);
        $.each(users, function (index, user) {
            $("#online-admins").append($("<li>").text(user.name));
        });
    })
    .joining((user) => {
        console.log("joining : ");
        console.log(user);
        $("#online-admins").append($("<li>").text(user.name));
    })
    .leaving((user) => {
        console.log("leaving : ");
        console.log(user);
        $("#online-admins li:contains('" + user.name + "')").remove();
    })
    .error((error) => {
        console.log("error");
        console.error(error);
    });

// BroadCating Model Channel
window.Echo.channel(`new_user_model_broadcasting`).listen(
    ".UserCreated",
    (e) => {
        console.log(e);
        // $("#icon-notifications").load(" #icon-notifications > *");
        // $("#notifications").load(" #notifications > *");
    }
);
