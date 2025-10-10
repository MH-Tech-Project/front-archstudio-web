export type User = {
    id: number
    actived: boolean
    tokenVersion: number
    name: string
    email: string
    accessTypeId: string
}

export type createAccountDTO = {
    name: string
    email: string
    password: string
    planId?: string
    roleId: number
}