import { View, Text, Stack, Center, AspectRatio, Image, HStack, Heading, Skeleton } from "native-base";
import { MainStackScreenProps } from "../navigators/types";
import { useQuery } from "@tanstack/react-query";
import { Pokemon, Species, fetchFn } from "../utils/api";
import { formatNumber, getColorType, removeEscapeCharacters } from "../utils/helper";

export default function Detail({ route }: MainStackScreenProps<"Detail">) {
  const { name, url } = route.params;
  console.log(url)

  const { isLoading, error, data } = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: () => fetchFn(url),
  });

  const { isLoading: isSpeciesLoading, error: speciesError, data: species } = useQuery<Species>({
    queryKey: ["species", name],
    queryFn: () => fetchFn(data?.species.url || ''),
    enabled: !!data
  });

  console.log(isLoading)

  if (!data || error) return null;

  return (
    <Stack>
      <Center
        safeArea
        backgroundColor={getColorType(data.types[0].type.name) + '.500'}
      >
        <AspectRatio ratio={1} width="90%">
          <Image source={{ uri: data.sprites.other['official-artwork'].front_default }}
            alt={name + ' image.'} />
        </AspectRatio>
        <HStack
          justifyContent="space-between"
          width='100%'
          p='1'
          alignItems='baseline'
          position='absolute'
          bottom={0}
          left={0}
          right={0}
        >
          <Heading color='white' textTransform='capitalize' size='2xl'>
            {name}
          </Heading>
          <Heading color='white'>
            #{formatNumber(data.id)}
          </Heading>
        </HStack>
      </Center>
      <Stack p='3'>
        <HStack justifyContent='center'>
          {data.types.map(type => (
            <Center key={type.type.name}
              backgroundColor={getColorType(type.type.name) + '.500'}
              rounded='full'
              p='1'
              minW='32'
              _text={{
                color: 'white',
                fontSize: 'lg',
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}
              mx='3'
            >
              {type.type.name}
            </Center>
          ))}
        </HStack>
        <Center>
          {isSpeciesLoading && <Skeleton.Text />}
          {!!species && (
            <Text fontSize='lg' mt='5'>
              {removeEscapeCharacters(species.flavor_text_entries[0].flavor_text)}
            </Text>
          )}
        </Center>
      </Stack>
    </Stack>
  );
}
