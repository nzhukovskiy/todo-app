import {createContext, use, useContext, useEffect, useState} from "react";
import type {User} from "../models/user.ts";
import {jwtDecode} from "jwt-decode";
import {loginUser} from "../../features/auth/api/auth.api.ts";
import type {LoginUserDto} from "../../features/auth/dtos/login-user.dto.ts";

type AuthContextDataType = {logout: () => Promise<void>, login: (loginUserDto: LoginUserDto) => Promise<void>, user: User | null}

const AuthContext = createContext<AuthContextDataType | null>(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getUserFromToken();
    }, [])

    const login = async (loginUserDto: LoginUserDto) => {
        const token = await loginUser(loginUserDto);
        console.log(token);
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
        logout
    }

    const getUserFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwtDecode(token) as User;
            console.log(user);
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