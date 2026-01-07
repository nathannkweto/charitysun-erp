import { useAuth } from '../auth/useAuth';

export const usePermission = () => {
    const { user } = useAuth();

    const can = (requiredPermission: string): boolean => {
        if (!user || !user.permissions) {
            return false;
        }

        return user.permissions.includes(requiredPermission);
    };

    return { can };
};