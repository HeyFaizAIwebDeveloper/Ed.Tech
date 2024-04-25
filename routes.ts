/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentications
 * @type {string[]}
 **/

export const publicRoutes = [
    "/"
];

/** 
 * An array of routes that are used for authentication
 * These routes will redirect logged in user to /setting
 * @type {string[]}
 **/
export const authRoutes = [
    "/logIn",
    "/signUp",
]

/** 
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication puposes
 * 
 * @type {string}
 **/
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in 
 * @type {string}
 **/
export const DEFAULT_LOGIN_REDIRECT = "/settings"