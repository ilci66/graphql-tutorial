import BookList from "./components/BookList";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// now apollo knows we will make request to this enpoint from this component
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    // we need to wrap it with the provider in order to use apollo
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ilker's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
