import type { Login, AuthResponse } from "../types/auth"
import { axiosInstance } from "./axios";

/**
 * authenticates user in the system
 * @param data - login data (email and password)
 * @returns Promise with authentication data (token and message)
 * @throws AuthError in case of authentication failure
 */
export const authenticate = async (data: Login): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        
        if (!response.data?.token) {
            throw new Error('Resposta inválida do servidor');
        }
        
        return response.data as AuthResponse;
    } catch (error: any) {
        // error handling
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Erro na autenticação';
            
            if (status === 401) {
                throw new Error('Email ou senha incorretos');
            } else if (status === 422) {
                throw new Error('Dados inválidos fornecidos');
            } else if (status >= 500) {
                throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
            } else {
                throw new Error(message);
            }
        } else if (error.request) {
            throw new Error('Erro de conexão. Verifique sua internet.');
        } else {
            throw new Error(error.message || 'Erro desconhecido durante a autenticação');
        }
    }
}