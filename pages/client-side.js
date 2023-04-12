import ClientOnly from "../components/ClientOnly";
import Pokemons from "../components/Pokemons";

export default function ClientSide() {
  return (
    <ClientOnly>
      <Pokemons />
    </ClientOnly>
  );
}
