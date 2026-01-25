import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface RBACContextType {
    hasRole: (roles: string[]) => boolean;
    hasPermission: (permission: string) => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const hasRole = (roles: string[]) => {
        if (!user || !user.roles) return false;
        return roles.some((role) => user.roles.includes(role));
    };

    const hasPermission = (permission: string) => {
        if (!user || !user.permissions) return false;
        return user.permissions.includes(permission);
    };

    return (
        <RBACContext.Provider value={{ hasRole, hasPermission }}>
            {children}
        </RBACContext.Provider>
    );
};

export const useRBAC = () => {
    const context = useContext(RBACContext);
    if (context === undefined) {
        throw new Error('useRBAC must be used within a RBACProvider');
    }
    return context;
};

interface RequireRoleProps {
    children: ReactNode;
    roles: string[];
}

export const RequireRole = ({ children, roles }: RequireRoleProps) => {
    const { hasRole } = useRBAC();
    if (!hasRole(roles)) {
        return <div>Access Denied</div>;
    }
    return <>{children}</>;
};
