import { gql } from "@apollo/client";
import client from "../apollo-client";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home({ pokemons }) {
  const router = useRouter();
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
            <p className="pt-4 text-xl">{pokemon.number}</p>
            {pokemon.types.map((type, idx) => (
              <p className="pt-4 text-xl" key={idx}>
                {type}
              </p>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

const QUERY = gql`
  query Query($first: Int!) {
    pokemons(first: $first) {
      id
      image
      name
      number
      types
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: QUERY,
    variables: { first: 60 },
  });

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
