
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
import { getLocalStorageCartItems, setLocalStorageCartItems } from "../../../util/localStorage";

export default function checkout(props){

  const items = [
    {
      itemID: "blehhhhh", 
      title: "fruit cup", 
      imageURL: "https://images.unsplash.com/photo-1524904237821-786af6d620ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
      cost: 3, 
      quantity: 1
    }, 
    {
      itemID: "blaaaaaaaahh", 
      title: "burger", 
      imageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1202&q=80", 
      cost: 10, 
      quantity: 2
    }, 
  ]

  // const [items, setItems] = useState([]);
  const [form, setForm] = useState({});

  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {

    // var storeID = localStorage.getItem('store_ID');
    // get user id from session storage (eg in components/navbar/index.js);
    var cart = getLocalStorageCartItems();
    setItems(cart);

    var total = 0;
    items.map((value, index) => {
      total += value.cost * value.quantity;
    });
    setTotalCost(total);

    setForm({
      items: items,
      storeID: storeID, 
      totalCost: totalCost, 
    });
  })

  function sendOrder(){
    setLocalStorageCartItems([]);
    return;
  }

  return(
    <Container maxW="5xl" centerContent textAlign="center" p={4}>
        <Box opacity={0.9} w="50%" my={10} borderRadius={12} overflow="hidden">

          <Heading size="3xl" my={20}>CHECKOUT</Heading>

          <List spacing={4}>
            {items.map((item, index) => <>
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
            <Heading size="2xl" my={5}> Total: ${form.totalCost} </Heading>
            <Button colorScheme="orange" w="30%" onClick={sendOrder}> Send Order </Button>
          </Container>

        </Box>
    </Container>

  );
}

