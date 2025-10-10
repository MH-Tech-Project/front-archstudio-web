export type Login = {
    email: string
    password: string
}

export type AuthResponse = {
    message: string
    token: string
}

export type AuthError = {
    message: string
    status?: number
}

export type JWTPayload = {
    id: number
    email: string
    tokenVersion: number
    iat: number  // issued at
    exp: number  // expiration time
}
