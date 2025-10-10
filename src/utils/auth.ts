import { jwtDecode } from 'jwt-decode';
import type { JWTPayload } from '../types/auth';

const TOKEN_KEY = '@archstudio:token';

export const saveToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};


export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};


export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover token:', error);
  }
};


/**
 * valid if token exists and is not expired
 */
export const isTokenValid = (token: string | null): boolean => {
  if (!token || token.trim().length === 0) {
    return false;
  }

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    
    if (!decoded.exp) {
      console.warn('Token JWT não possui campo de expiração');
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isNotExpired = decoded.exp > currentTime;

    if (!isNotExpired) {
      console.info('Token JWT expirado');
    }

    return isNotExpired;
  } catch (error) {
    console.error('Erro ao decodificar token JWT:', error);
    return false;
  }
};

/**
 * decodes JWT and returns its payload
 */
export const getTokenInfo = (token: string | null): JWTPayload | null => {
  if (!token) {
    return null;
  }

  try {
    return jwtDecode<JWTPayload>(token);
  } catch (error) {
    console.error('Erro ao decodificar token JWT:', error);
    return null;
  }
};

/**
 * returns time in seconds until token expires, or null if token is invalid
 */
export const getTokenTimeToExpire = (token: string | null): number | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    
    if (!decoded.exp) {
      return null;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeToExpire = decoded.exp - currentTime;
    
    return timeToExpire > 0 ? timeToExpire : 0;
  } catch (error) {
    console.error('Erro ao calcular tempo de expiração:', error);
    return null;
  }
};


export const clearAuthData = (): void => {
  removeToken();
};