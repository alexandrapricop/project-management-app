import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { AddClientModal } from "./components/AddClientModal";
import { ClientsList } from "./components/ClientsList";

import { Header } from "./components/Header";
import { ProjectsList } from "./components/ProjectList";
import { HomePage } from './pages/Home';
import { ProjectPage } from './pages/Project';
import { NotFoundPage } from './pages/NotFound';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
          <Router>
            <Header />
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ProjectPage />} path="/project/:projectId" />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </Router> 
      </ApolloProvider>
    </>
  );
}

export default App;
