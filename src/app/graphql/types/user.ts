import { FavoriteResponse } from "./favorite"

enum ROLES {
    ROLE_GENERAL,
    ROLE_ADMIN,
    ROLE_BUSINESS_OWNER
}

interface JwtResponse {
    id: number
    jwtToken: string
    tokenType: string
    username: string
    roles: [string]
    favorites: [FavoriteResponse]
}

interface UserResponse{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    favorites: [FavoriteResponse]
    roles: [ROLES]
    jwtResponse: JwtResponse
    errorMessage: String

}

export {ROLES, UserResponse, JwtResponse};