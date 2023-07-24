import { useEffect, useState } from "react";
import { Badge, Tr, Td, HStack, VStack, Heading, Box } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Table } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";

const Detail = ({ pokemon }) => {
  return (
    <Box>
      {pokemon && (
        <Box role="pokemon-detail">
          <Table>
            <Tbody>
              <Tr>
                <Td>
                  <Heading>{pokemon.name}</Heading>
                  {pokemon.types.map((currentPokemon, index) => (
                    <Badge key={index}>{currentPokemon.type.name}</Badge>
                  ))}
                  <HStack>
                    <Image src={pokemon.sprites.front_default} />
                    <Image src={pokemon.sprites.back_default} />
                    <Image src={pokemon.sprites.front_shiny} />
                    <Image src={pokemon.sprites.back_shiny} />
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>Height</Td>
                <Td>{pokemon.height}</Td>
              </Tr>
              <Tr>
                <Td>Weight</Td>
                <Td>{pokemon.weight}</Td>
              </Tr>
              <Tr>
                <Td>Base Experience</Td>
                <Td>{pokemon.base_experience}</Td>
              </Tr>
              <Tr>
                <Td w='50%'>Abilities</Td>
                <Td>
                  {pokemon.abilities.map((currentAbilities, index) => (
                    <Box key={index}>{currentAbilities.ability.name}</Box>
                  ))}
                </Td>
              </Tr>
              <Tr>
                <Td>Stats</Td>
                <Td>
                  {pokemon.stats.map((currentStats, index) => (
                    <Box key={index}>{`${currentStats.stat.name} : ${currentStats.base_stat}`}</Box>
                  ))}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
const Page = () => {
  const { pokemonId } = useParams()
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  return <Detail pokemon={pokemon} />;
};

export default Page;
