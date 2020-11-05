import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';

Vue.use(VueApollo);

const AUTH_TOKEN = 'apollo-token';
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'https://calendarapplication.herokuapp.com/graphql';

// Config
const defaultOptions = {
  httpEndpoint,
  wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || '',
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
};

export function createProvider(options = {}) {
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });
  apolloClient.wsClient = wsClient;

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {},
    },
  });

  return apolloProvider;
}

export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  await apolloClient.resetStore();
}

export async function onLogout(apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  await apolloClient.resetStore();
}
