import { Button, Image, Heading, Box, Text, VStack, HStack, StackDivider, Grid, GridItem } from "@chakra-ui/react";
import ListSection from "./ListSection";
import GridSection from "./GridSection";

import { AddIcon } from "@chakra-ui/icons"

import { useContext, useEffect, useReducer, useState } from "react";


export default function Section({ section }) {

    const [itemQuantity, setItemQuantity] = useState({})

    useEffect(() => {
        console.log("section data", section)
    }, [])

    function onAddButton(id, title, price, itemImage, storeId) {
        setItemQuantity({ ...itemQuantity, id: itemQuantity[id] + 1 })

        const obj = {
            "item": title,
            "item_id": id,
            "price": price,
            "store_id": storeId,
            "image_url": itemImage,
            "quantity": 1
        }

        var cartCurrent = localStorage.getItem("hollar-cart")
        if (cartCurrent == null) {
           localStorage.setItem("hollar-cart", ["hello"])
        }
        cartCurrent = JSON.parse(cartCurrent)
        console.log("current cart", cartCurrent)
        console.log("current cart 2", cartCurrent)
        localStorage.setItem("hollar-cart", JSON.stringify(cartCurrent))
    }

    return (<>
        <Text fontSize="3xl">{section.sectionTitle}</Text>
        <Box w="100%" borderWidth="1px" borderRadius="lg" mb={2} p={2}>

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

                            <Button onClick={() => onAddButton(value.id, value.title, value.price, value.itemImage, section.storeId)} variant="outline" size="sm" w="50%" leftIcon={<AddIcon />} >
                                <Text>cart</Text> {value.id in itemQuantity ? <Text>| {itemQuantity[value.id]} in cart</Text> : <Text></Text>}
                            </Button>
                        </Grid>

                    </>)
            })}
        </Box>
    </>)
}