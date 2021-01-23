import {SimpleGrid, Box, Text, Image, ListItem, AspectRatio} from '@chakra-ui/react'

// A generic image grid component
// Each item should include an imageURL, title, description, and href

export default function GridSection({content}) {
    return <SimpleGrid columns={[2, null, 3, 4]} spacing="32px">
        {content.map((item, index) => <Box lineHeight={1.25}>
            <Box opacity={0.9} mb={3} w="100%" bg="gray.900"  borderRadius={12} overflow="hidden">
                <AspectRatio maxW="100%" ratio={1}>
                    <Image src={item.imageURL} alt="" objectFit="cover"/>
                </AspectRatio>
            </Box>
            <Text fontWeight={600} fontSize="xl">{item.title}</Text>
            <Text fontSize="md" opacity={0.75}>{item.description}</Text>
        </Box>)}
    </SimpleGrid>
}