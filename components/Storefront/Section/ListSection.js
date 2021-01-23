import {List, ListItem, Text, Divider, AspectRatio, Image, Box, HStack} from "@chakra-ui/react"

// Generic list component
// Each item should include a title, description, imageURL, and href
export default function ListSection({content}) {
    return <List spacing={4}>
        {content.map((item, index) => <>
                <ListItem key={index} lineHeight={1.25}>
                    <HStack>
                        {item.imageURL &&
                        <Image src={item.imageURL} w="12" h="12" mr={1} alt="" objectFit="cover" borderRadius={8}/>}
                        <Box>
                            <Text fontWeight={600} fontSize="xl">{item.title}</Text>
                            <Text fontSize="md" opacity={0.75}>{item.description}</Text>
                        </Box>

                    </HStack>
                </ListItem>
                <Divider opacity={1}/>
            </>
        )}
    </List>
}