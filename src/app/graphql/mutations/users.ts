import { gql } from "apollo-angular";

const CreateUser = gql`
    mutation CreateUser($userRegister: RegisterUserRequest!) {
        newUser(user: $userRegister){
            firstName
            lastName
            email
            id
            favorites{
                business{
                    id
                }
            }
            errorMessage
            roles
        }
    }
`

const UpdateUser = gql`
    mutation UpdateUser($userRegister: RegisterUserRequest!, $userId: ID!) {
        updateUser(user: $userRegister, userId: $userId){
            firstName
            lastName
            email
            id
        }
    }
`
const DeleteUser = gql`
    mutation DeleteUser($userId: ID!) {
        deleteUser(userId: $userId)
    }
`
export {CreateUser, UpdateUser, DeleteUser}