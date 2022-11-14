import { gql } from "apollo-angular";

const LoginUser = gql`
    query LoginUser($user: LoginUserRequest!){
        userLogin(user: $user){
            firstName
            lastName
            email
            id
            jwtResponse{
                jwtToken
                tokenType
                roles
            }
            favorites{
                business{
                id
                businessName
                }
            }
        }
    }
`
export {LoginUser}