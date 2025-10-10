import type { createAccountDTO, User } from "../types/user";
import { axiosInstance } from "./axios";

/**
 * create a new user account
 * @param data - create account data (name, email, password, planId(not required), roleId)
 * @returns Promise with created user data ( message, user)
 * @throws Error in case of failure
 */
export const createAccount = async (data: createAccountDTO): Promise<{ message: string; user: User }> => {
    try {
        const response = await axiosInstance.post('/users', data);
        return response.data as { message: string; user: User };
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Erro ao criar conta';
            
            if (status === 422) {
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