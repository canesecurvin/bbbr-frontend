import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as userQueries from '../graphql/queries/users';
import * as userMutations from '../graphql/mutations/users';
import * as categoryQueries from '../graphql/queries/categories';
import * as businessQueries from '../graphql/queries/business'
import * as favoriteMutations from '../graphql/mutations/favorite'
import * as favoriteQueries from '../graphql/queries/favorite'

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(
    private apollo: Apollo
  ) { }

  createQuery(query,variableObject){
    console.log('made it here')
    return this.apollo.query({
      query: query,
      variables: variableObject
    })
  }

  createMutation(mutation, variablesObject){
    return this.apollo.mutate({
      mutation: mutation,
      variables: variablesObject
    })
  }

  userLogin(email, password){
    console.log('tryingggg')
    let variables = {
      user: {
        email: email,
        password: password
      }
    }
    console.log(variables);
    return this.createQuery(userQueries.LoginUser, variables)
  }

  newUser(email, firstName, lastName, password){
    let variables = {
      userRegister: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        roles: ['ROLE_GENERAL']
      }
    }
    console.log(variables);
    return this.createMutation(userMutations.CreateUser, variables)
  }

  updateUser(userId, email, password, firstName, lastName){
    let variables = {
      userId: userId,
      user: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        roles: ['ROLE_GENERAL']
      }
    }
    return this.createMutation(userMutations.UpdateUser, variables)
  }

  deleteUser(userId){
    let variables = {userId: userId}
    return this.createMutation(userMutations.DeleteUser, variables);
  }

  businessesByCategory(categoryId){
    console.log(categoryId)
    let variables = {id: categoryId}
    return this.createQuery(categoryQueries.BusinessesByCategoryId, variables);
  }

  businessById(businessId) {
    let variables = {businessId: businessId}
    return this.createQuery(businessQueries.BusinessById, variables);
  }

  addUserFavorite(userId, businessId){
    let variables = {
      favorite: {userId: userId, businessId: businessId}
    }
    return this.createMutation(favoriteMutations.AddUserFavorite, variables);
  }

  getUserFavorites(userId){
    let variables = {userId: userId}
    return this.createQuery(favoriteQueries.GetUserFavorites, variables);
  }
}
