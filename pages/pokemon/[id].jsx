import React from "react";
import { useRouter } from "next/router";
import Pokemon from "@/components/Pokemon";

const PokemonView = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Pokemon pokeId={id} />;
};

export default PokemonView;
