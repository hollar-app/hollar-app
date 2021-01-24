
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
import NavbarComplete from "../../components/NavbarComplete";
import { getLocalStorageCartItems, setLocalStorageCartItems } from "../../util/localStorage.js";

export default function checkout(props){

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {

    // get user id from session storage (eg in components/navbar/index.js);
    var tempItems = getLocalStorageCartItems();
    console.log("local storage in checkout");
    console.log(JSON.stringify(tempItems));
    var storeID = tempItems.store_id;
    delete tempItems["storeID"];
    setItems(tempItems);

    var total = 0;
    tempItems.forEach((value, index) => {
      console.log("%c total: " + total, "background-color: purple");
      total += value.price.toString() * value.quantity;
    });

    setForm({
      items: tempItems,
      storeID: storeID, 
      totalCost: total, 
    });
  }, [])

  function sendOrder(){
    localStorage.clear();
    var temp = getLocalStorageCartItems();
    console.log("order sent")
    return;
  }

  return(
    <>
      <NavbarComplete />


      <Container maxW="5xl" centerContent textAlign="center" p={4}>
        <Box opacity={0.9} w="50%" my={10} borderRadius={12} overflow="hidden">

          <Heading size="3xl" my={20}>CHECKOUT</Heading>

          <List spacing={4}>
            {items.map((item, index) => <>
              <ListItem key={index} lineHeight={1.25}>
                <HStack>
                  {item.image_url &&
                    <Image src={item.image_url} w="24" h="24" mr={5} alt="" objectFit="cover" borderRadius={8}/>
                  }

                  <VStack align="start">
                    <Heading as="h3" size="lg">{item.title}</Heading>
                    <Text fontSize="md" opacity={0.75}>{`$${item.price} x ${item.quantity}`}</Text>
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
    </>

  );
}

