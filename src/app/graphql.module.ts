import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, createHttpLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const uri = 'http://localhost:8080/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const link = createHttpLink({
    uri: 'http://localhost:8080/graphql'
  });
  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
function setContext(arg0: (operation: any, context: any) => { headers: { Accept: string; }; }) {
  throw new Error('Function not implemented.');
}

