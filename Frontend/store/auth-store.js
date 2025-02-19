import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    user: [],
    loginResponse: "",
    authenticationStatus: false,
    userData: [],
    userPictures: [],
    islogging_siggningIn: false,
    authenticateUser: async () => {
        try {
            const response = await fetch(
                "https://pixify-dtpr.onrender.com/api/auth/authenticate",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (response.status === 401) {
                set({ authenticationStatus: false });
                return;
            }

            const data = await response.json();
            console.log(data);
            set({
                authenticationStatus: data.isAuthenticated,
                userData: data.user,
                userPictures: data.uploadedPictures,
            });
            console.log(get().authenticationStatus);
        } catch (error) {
            console.error("Error authenticating user", error);
        }
    },

    normalSignupUser: async (username, email, password) => {
        try {
            set({ islogging_siggningIn: true });
            const response = await fetch(
                "https://pixify-dtpr.onrender.com/api/auth/normal/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password }),
                }
            );
            const data = await response.json();

            if (response.status === 200) {
                toast.success(data.message);
                set({ authenticationStatus: true });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.data.message);
            console.error("Error authenticating user", error);
        } finally {
            set({ islogging_siggningIn: false });
        }
    },
    normalLoginUser: async (usernameOrEmail, password) => {
        try {
            set({ islogging_siggningIn: true });
            const response = await fetch(
                "https://pixify-dtpr.onrender.com/api/auth/normal/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ usernameOrEmail, password }),
                    credentials: "include",
                }
            );
            console.log(await response.json());

            if (response.ok) {
                toast.success("Login successful");
                set({ authenticationStatus: true });
            } else {
                toast.error("Wrong Credidentials");
            }
        } catch (error) {
            toast.error("Wrong Credidentials");
            console.error("Error authenticating user", error);
        } finally {
            set({ islogging_siggningIn: false });
        }
    },
    sendLoginRequest: async () => {
        console.log("Sending login request");
        try {
            window.location.href =
                "https://pixify-dtpr.onrender.com/api/auth/google/login";
        } catch (error) {
            toast.error("Failed to redirect to Google login");
            console.error("Error sending login request", error);
        }
    },
    sendLogoutRequest: async () => {
        console.log("Sending logout request");
        try {
            const response = await fetch(
                "https://pixify-dtpr.onrender.com/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            console.log(response);
            if (response.ok) {
                toast.success("Logout successful");
                set({ authenticationStatus: false });
            }
        } catch (error) {
            toast.error("Failed to logout");
            console.error("Error sending logout request", error);
        }
    },
}));
