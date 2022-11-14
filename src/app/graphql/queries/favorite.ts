import { gql } from "apollo-angular";

const GetUserFavorites = gql`
    query UserFavorites($userId: ID!){
        userFavorites(userId: $userId){
            id
            business{
                id
                businessName
                ownerName
                description
                location
                website
                number
                credentials
                categoryId
            }
        }
    }
`
export {GetUserFavorites}