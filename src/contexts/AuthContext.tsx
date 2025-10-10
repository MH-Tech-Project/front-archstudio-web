import { createContext, useEffect, useState } from "react";
import type { Login, JWTPayload } from "../types/auth";
import { authenticate } from "../api/auth.api";
import { 
    saveToken, 
    getToken, 
    isTokenValid, 
    clearAuthData,
    getTokenInfo,
    getTokenTimeToExpire
} from "../utils/auth";

export interface AuthContextType {
    login: (data: Login) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    tokenInfo: JWTPayload | null;
    timeToExpire: number | null;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tokenInfo, setTokenInfo] = useState<JWTPayload | null>(null);
    const [timeToExpire, setTimeToExpire] = useState<number | null>(null);

    const updateTokenInfo = (token: string | null) => {
        if (token && isTokenValid(token)) {
            const info = getTokenInfo(token);
            const ttl = getTokenTimeToExpire(token);
            setTokenInfo(info);
            setTimeToExpire(ttl);
        } else {
            setTokenInfo(null);
            setTimeToExpire(null);
        }
    };

    const login = async (data: Login) => {
        if (!data.email || !data.password) {
            throw new Error("Email e senha são obrigatórios");
        }

        setIsLoading(true);

        try {
            const authResponse = await authenticate(data);
            
            saveToken(authResponse.token);
            updateTokenInfo(authResponse.token);
            setIsAuthenticated(true);
            
        } catch (error) {
            clearAuthData();
            updateTokenInfo(null);
            setIsAuthenticated(false);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearAuthData();
        updateTokenInfo(null);
        setIsAuthenticated(false);
    };

    const validateSession = () => {
        setIsLoading(true);
        
        try {
            const token = getToken();
            
            if (isTokenValid(token)) {
                updateTokenInfo(token);
                setIsAuthenticated(true);
            } else {
                clearAuthData();
                updateTokenInfo(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Erro ao validar sessão:', error);
            clearAuthData();
            updateTokenInfo(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateSession();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(() => {
            const token = getToken();
            if (token && isTokenValid(token)) {
                const ttl = getTokenTimeToExpire(token);
                setTimeToExpire(ttl);
                if (ttl && ttl < 300) { // 300 sec = 5 minutes
                    console.warn(`Token expira em ${Math.floor(ttl / 60)} minutos`);
                }
            } else {
                // expired token
                logout();
            }
        }, 60000); // verify every minute

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isAuthenticated,
                isLoading,
                tokenInfo,
                timeToExpire,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};