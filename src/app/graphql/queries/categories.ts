import { gql } from "apollo-angular";

const BusinessesByCategoryId = gql`
    query GetCategory($id: ID!){
        category(id: $id){
            categoryName
            businesses{
                id
                businessName
                ownerName
                description
                location
                website
                number
                credentials
            }
        }
    }
`
export {BusinessesByCategoryId}