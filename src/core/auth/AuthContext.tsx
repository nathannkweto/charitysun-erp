import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials, logout } from '@/store/authSlice';

interface AuthContextType {
    login: (userData: any, token: string) => void;
    signout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const login = (userData: any, token: string) => {
        dispatch(setCredentials({ user: userData, token }));
        localStorage.setItem('token', token);
    };

    const signout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ login, signout, isLoading: false }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
