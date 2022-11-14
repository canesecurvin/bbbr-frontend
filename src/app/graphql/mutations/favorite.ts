import { gql } from "apollo-angular";

const AddUserFavorite = gql`
    mutation AddFavorite($favorite: FavoritesRequest){
        addUserFavorite(favorite: $favorite){
            id
            business{
                id
                businessName
            }
        }
    }
`
export {AddUserFavorite}