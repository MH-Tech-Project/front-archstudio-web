import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * personalized hook to use the authentication context
 * facilitates access to authentication data and methods
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
};