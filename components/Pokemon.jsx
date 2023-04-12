import Image from "next/image";
import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Query($pokemonId: String) {
    pokemon(id: $pokemonId) {
      attacks {
        fast {
          damage
          name
          type
        }
        special {
          damage
          name
          type
        }
      }
      classification
      evolutions {
        image
        name
        number
        evolutions {
          id
          image
          name
          number
        }
      }
      id
      image
      name
      number
    }
  }
`;

const Pokemon = ({ pokeId }) => {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { pokemonId: pokeId },
  });

  if (loading) {
    return (
      <div className="container flex items-center justify-center">
        <h2 className="text-3xl text-center font-medium">Loading...</h2>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const pokemon = data.pokemon;

  return (
    <section className="container py-5">
      <Image src={pokemon.image} alt={pokemon.name} width={100} height={100} />
      <h1>{pokemon.name}</h1>
      <h2>{pokemon.number}</h2>
    </section>
  );
};

export default Pokemon;
