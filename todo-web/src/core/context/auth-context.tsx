import {createContext, use, useContext, useEffect, useState} from "react";
import type {User} from "../models/user.ts";
import {jwtDecode} from "jwt-decode";
import {loginUser, registerUser} from "../../features/auth/api/auth.api.ts";
import type {LoginUserDto} from "../../features/auth/dtos/login-user.dto.ts";
import type {CreateUserDto} from "../../features/auth/dtos/create-user-dto.ts";
import {axiosApi, setupInterceptors} from "../api/axios.api.ts";

type AuthContextDataType =  {logout: () => Promise<void>, login: (loginUserDto: LoginUserDto) => Promise<void>, user: User | null, register: (createUserDto: CreateUserDto) => Promise<void>};


const AuthContext = createContext<AuthContextDataType | null>(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const interceptors = setupInterceptors(value);
        getUserFromToken();

        return () => {
            axiosApi.interceptors.request.eject(interceptors.requestInterceptor);
            axiosApi.interceptors.response.eject(interceptors.responseInterceptor);
        }
    }, [])

    const login = async (loginUserDto: LoginUserDto) => {
        const token = await loginUser(loginUserDto);
        localStorage.setItem("token", token);
        getUserFromToken();
    }

    const register = async (createUserDto: CreateUserDto) => {
        const token = await registerUser(createUserDto);
        localStorage.setItem("token", token);
        getUserFromToken();
    }

    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const value = {
        user,
        login,
        logout,
        register
    }

    const getUserFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwtDecode(token) as User;
            setUser(user);
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ( ) => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("No context provider");
    }
    return context;
}