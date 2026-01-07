import { createContext, useState, useEffect, type ReactNode } from 'react';
import {
    AuthenticationControllerService,
    OpenAPI,
    type LoginRequest,
    type UserDetail
} from '../../client';

interface AuthContextType {
    user: UserDetail | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const userProfile = await AuthenticationControllerService.authMeGet();
            setUser(userProfile);
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            logout();
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('token');

            if (storedToken) {
                OpenAPI.TOKEN = storedToken;

                await fetchUserProfile();
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials: LoginRequest) => {
        try {
            const response = await AuthenticationControllerService.authLoginPost(credentials);
            const token = response.accessToken;

            if (token) {
                localStorage.setItem('token', token);
                OpenAPI.TOKEN = token;

                await fetchUserProfile();
            } else {
                throw new Error("No access token received from server");
            }
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        OpenAPI.TOKEN = undefined;
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};