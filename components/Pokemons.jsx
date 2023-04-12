import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";

const QUERY = gql`
  query Query($first: Int!) {
    pokemons(first: $first) {
      id
      image
      classification
      maxCP
      maxHP
      name
      number
      weaknesses
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
      evolutions {
        id
        image
        evolutions {
          evolutions {
            id
            image
            name
            number
          }
        }
      }
    }
  }
`;

export default function Pokemons() {
  const router = useRouter();
  const { data, loading, error } = useQuery(QUERY, {
    variables: { first: 20 },
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

  const pokemons = data.pokemons;

  return (
    <main className="container mx-auto my-8 px-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 place-content-center">
        {pokemons.map((pokemon) => (
          <div
            onClick={() => {
              router.push(`/pokemon/${pokemon.id}`);
            }}
            key={pokemon.id}
            className="p-6 border rounded-md hover:border-black cursor-pointer"
          >
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={80}
              height={80}
              className="object-cover"
            />
            <h1 className="text-3xl text-blue-500 font-semibold">
              {pokemon.name}
            </h1>
            <p className="pt-4 text-xl">
              {pokemon.number} - {pokemon.classification}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
