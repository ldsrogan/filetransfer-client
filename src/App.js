import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
// import { HttpLink } from 'apollo-link-http';
// import { split } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import './App.css';
import { MainRoutes } from './routes';
import { typeDefs, resolvers } from './resolvers';
import { RoleEnum } from './resources/enum';

// let serverIpAddress = process.env.REACT_APP_SERVER_IP;
// const serverPort = process.env.REACT_APP_SERVER_PORT;

// if (process.env.REACT_APP_DEV) {
//   serverIpAddress = 'localhost';
// }

// // Create an http link:
// const httpLink = new HttpLink({
//   uri: `http://${serverIpAddress}:${serverPort}/graphql`,
//   headers: {
//     authorization: localStorage.getItem('token'),
//   },
// });

// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://${serverIpAddress}:${serverPort}/graphql`,
//   options: {
//     reconnect: true,
//   },
// });

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: window.localStorage,
});

const client = new ApolloClient({
  cache,
  // link,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: false,
    role: RoleEnum.Manager,
    tenantName: '',
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Router>
            <MainRoutes />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
