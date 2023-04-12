import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokédex</title>
        <link
          rel="shortcut icon"
          href="https://assets.pokemon.com/static2/_ui/img/favicon.ico"
        />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
