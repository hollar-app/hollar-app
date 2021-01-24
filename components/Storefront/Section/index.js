import { Button, Image, Heading, Box, Text, VStack, HStack, StackDivider, Grid, GridItem, Container } from "@chakra-ui/react";
import ListSection from "./ListSection";
import GridSection from "./GridSection";

import { AddIcon } from "@chakra-ui/icons"

import { useContext, useEffect, useReducer, useState } from "react";
import { getLocalStorageCartItems, setLocalStorageCartItems } from "../../../util/localStorage";


export default function Section({ section, storeId, itemQuantity, setItemQuantity }) {

  // const [itemQuantity, setItemQuantity] = useState({})

  useEffect(() => {
    // console.log("section data", section);
  }, [])

  function onAddButton(id, title, price, itemImage, storeId) {
    var foo = {...itemQuantity};
    foo[id] = (itemQuantity[id]) ? itemQuantity[id] + 1 : 1;

    setItemQuantity(foo);

    var cartCurrent = getLocalStorageCartItems();

    var exists = false;
    cartCurrent = cartCurrent.map((value) => {
      if (value && value.item_id === id){
        exists = true;
        var newValue = {...value};
        newValue[quantity] = itemQuantity[id] + 1;
        return newValue;
      }
    })

    if (!exists){
      cartCurrent.push(obj);
      const obj = {
        "title": title,
        "item_id": id,
        "price": price,
        "store_id": storeId,
        "image_url": itemImage,
        "quantity": itemQuantity[id] + 1
      }
    }

    setLocalStorageCartItems(cartCurrent);
  }

    return (<>
      <Heading fontSize="4xl" mb={5}>{section.sectionTitle}</Heading>
        <Box w="100%" borderWidth="1px" borderRadius="lg" mb={2} p={4}>

            {"items" in section && section.items.map((value, index, arr) => {

                return (
                    <>
                        {index == 0 && <Grid templateColumns="repeat(5, 1fr)" gap={3}>
                            <Text fontSize="2xl"></Text>
                            <Text fontSize="2xl">Item</Text>
                            <Text fontSize="2xl">Description</Text>
                            <Text fontSize="2xl">Price</Text>
                            <Text fontSize="2xl"></Text>
                        </Grid>}
                        <Grid templateColumns="repeat(5, 1fr)" gap={6} pb={4}>
                            <Image borderRadius="full"
                                boxSize="150px"
                                objectFit="cover"
                                src={value.itemImage}
                                ml={3} />
                            <Text fontSize="2xl" color="gray.500">{"title" in value && value.title}</Text>
                            <Text fontSize="2xl" color="gray.500">{"description" in value && value.description}</Text>
                            <Text fontSize="2xl" color="gray.500">${"price" in value && value.price}</Text>


                          <HStack align="flex-start">
                            <Button onClick={() => onAddButton(value.id, value.title, value.price, value.itemImage, section.storeId)} variant="outline" size="sm" w="50%" leftIcon={<AddIcon />} >
                              <Text>cart</Text> 
                            </Button>

                            <Container>
                              { itemQuantity[value.id] && 
                                <Text fontSize="2xl" color="gray.500">x{itemQuantity[value.id]}</Text>
                              }
                            </Container>

                          </HStack>
                        </Grid>

                    </>)
            })}
        </Box>
      <Container mb={20} />
    </>)
}
