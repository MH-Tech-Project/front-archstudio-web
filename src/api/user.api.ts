import type { createAccountDTO, ResetPasswordRequestDTO, User } from "../types/user";
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

/**
 * Sends a password reset email to the user
 * @param data - request password reset email data (email)
 * @returns Promise with success message
 * @throws Error in case of failure
 */
export const resetPasswordEmailRequest = async (email: string): Promise<{ message: string }> => {
    try {
        const response = await axiosInstance.post('/resetPassword/send-email-reset', { email });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Erro ao solicitar redefinição de senha';
            if (status === 400) {
                throw new Error('Usuário não encontrado. Verifique o email informado.');
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


/**
 * reset user password
 * @param data - request password reset data (token, newPassword)
 * @returns Promise with success message
 * @throws Error in case of failure
 */
export const resetPasswordRequest = async (data: ResetPasswordRequestDTO): Promise<{ message: string }> => {
    try {
        const response = await axiosInstance.post(`/resetPassword/reset-password/${data.token}`, { newPassword: data.newPassword });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Erro ao redefinir senha';
            if (status === 400) {
                throw new Error('Dados inválidos fornecidos');
            } else if (status >= 500) {
                throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
            } else {
                throw new Error(message);
            }
        } else if (error.request) {
            throw new Error('Erro de conexão. Verifique sua internet.');
        } else {
            throw new Error(error.message || 'Erro desconhecido durante a redefinição de senha');
        }
    }
}