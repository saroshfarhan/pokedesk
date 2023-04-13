import React from "react";
import client from "@/apollo-client";
import { useRouter } from "next/router";
import Pokemon from "@/components/Pokemon";
import Image from "next/image";
import { gql } from "@apollo/client";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

const PokemonView = ({ pokemon }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="container flex items-center justify-center">
        <h2 className="text-3xl text-center font-medium">Loading...</h2>
      </div>
    );
  }
  return (
    <section className="container py-5">
      <Link href="/">
        <BiArrowBack size={24} />
      </Link>
      <div className="mt-8">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
        />
        <h1>{pokemon.name}</h1>
        <h2>{pokemon.number}</h2>
      </div>
    </section>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data } = await client.query({
    query: gql`
      query Query($first: Int!) {
        pokemons(first: $first) {
          id
        }
      }
    `,
    variables: { first: 20 },
  });

  // Get the paths we want to pre-render based on posts
  const paths = data.pokemons.map((pokemon) => ({
    params: { id: pokemon.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /pokemon/i2o1io1, then params.id is i2o1io1
  const { data } = await client.query({
    query: gql`
      query Query($pokemonId: String) {
        pokemon(id: $pokemonId) {
          id
          image
          name
          height {
            maximum
            minimum
          }
          weight {
            maximum
            minimum
          }
          classification
          types
          weaknesses
          resistant
          evolutions {
            id
            image
            name
            number
            types
          }
        }
      }
    `,
    variables: { pokemonId: params.id },
  });
  const pokemon = data.pokemon;
  // Pass pokemon data to the page via props
  return { props: { pokemon } };
}

export default PokemonView;
