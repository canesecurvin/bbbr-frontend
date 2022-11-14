import { BusinessResponse } from "./business"

export interface CategoryResponse {
    id: number
    categoryName: string
    businesses: [BusinessResponse]
}