import { gql } from "apollo-angular";

const BusinessById = gql`
    query GetBusinessById($businessId: ID!){
        business(businessId: $businessId){
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
`
export {BusinessById}