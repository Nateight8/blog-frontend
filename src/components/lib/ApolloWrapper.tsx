// lib/apollo-provider.js
"use client";

import { ApolloLink, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { createClient } from "graphql-ws";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/graphql/subscriptions",
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: splitLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
