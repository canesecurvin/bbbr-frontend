import { UserResponse } from "./user"
import { BusinessResponse } from "./business"

export interface FavoriteResponse {
    id: number
    user: UserResponse
    business: BusinessResponse
}