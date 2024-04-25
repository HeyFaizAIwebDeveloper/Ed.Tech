import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { auth } from "./auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
} from "./routes";

export const { auth: middleware } = NextAuth(authConfig);

export default auth((req)=>{
    const {nextUrl} = req
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return Promise.resolve(); // API routes should be public so no authentication
    }

    if (isAuthRoute){
        if (!isLoggedIn && !isPublicRoute && nextUrl.pathname !== "/logIn") {
            return Response.redirect(new URL("/logIn", nextUrl));
          }
        return Promise.resolve();
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/logIn", nextUrl))
    }
    return Promise.resolve();
})
