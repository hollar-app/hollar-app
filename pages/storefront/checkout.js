
import { useContext, useEffect, useReducer, useState } from "react";
import {
    Avatar,
    Box,
    Container,
    Heading,
    Image,
    Text,
    Stack,
    Button,
    IconButton,
    Center,
    List, ListItem, AspectRatio, HStack, VStack, 
    Divider
} from "@chakra-ui/react";

export default function checkout(props){

  const content = [
    {
      title: "fruit cup", 
      imageURL: "https://images.unsplash.com/photo-1524904237821-786af6d620ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
      cost: 3, 
      quantity: 1
    }, 
    {
      title: "burger", 
      imageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1202&q=80", 
      cost: 10, 
      quantity: 2
    }, 
  ]

  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    var total = 0;
    content.map((value, index) => {
      total += value.cost * value.quantity;
    });
    setTotalCost(total);
  })

  return(
    <Container maxW="5xl" centerContent textAlign="center" p={4}>
        <Box opacity={0.9} w="50%" my={10} borderRadius={12} overflow="hidden">

          <Heading size="3xl" my={20}>CHECKOUT</Heading>

          <List spacing={4}>
            {content.map((item, index) => <>
              <ListItem key={index} lineHeight={1.25}>

                <HStack>
                  {item.imageURL &&
                  <Image src={item.imageURL} w="24" h="24" mr={5} alt="" objectFit="cover" borderRadius={8}/>}

                  <VStack align="start">
                    <Heading as="h3" size="lg">{item.title}</Heading>
                    <Text fontSize="md" opacity={0.75}>{`$${item.cost} x ${item.quantity}`}</Text>
                  </VStack>

                </HStack>

              </ListItem>
              <Divider opacity={1}/>
            </>
            )}
          </List>

          <Container my={10}>
            <Heading size="3xl" my={5}> Total: ${totalCost} </Heading>
            <Button colorScheme="orange" w="30%"> Send </Button>
          </Container>

        </Box>
    </Container>

  );
}

