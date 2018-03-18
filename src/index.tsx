import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./style/index.css";
import Home from "./pages/home";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://api.github.com/graphql",
        headers: {
            Authorization: "Bearer 19870b8a8017d30b258d550cf0134af619338c16"
        }
    }),
    cache: new InMemoryCache()
});

const root = (
    <ApolloProvider client={client}>
        <Home userName="rodrigo-brito" />
    </ApolloProvider>
);

ReactDOM.render(root, document.getElementById("root") as HTMLElement);
registerServiceWorker();
