import { Image, Heading, Box, Text, VStack, HStack, StackDivider, Grid, GridItem } from "@chakra-ui/react";
import ListSection from "./ListSection";
import GridSection from "./GridSection";

import { useContext, useEffect, useReducer, useState } from "react";


export default function Section({ section }) {

    useEffect(() => {
        console.log("section data", section)
    }, [])

    return (<>
        <Text fontSize="3xl">{section.sectionTitle}</Text>
        <Box w="100%" borderWidth="1px" borderRadius="lg" mb={2} p={2}>

            {"items" in section && section.items.map((value, index, arr) => {

                return (
                    <>
                        {index == 0 && <Grid templateColumns="repeat(4, 1fr)" gap={3}>
                            <Text fontSize="2xl"></Text>
                            <Text fontSize="2xl">Item</Text>
                            <Text fontSize="2xl">Description</Text>
                            <Text fontSize="2xl">Price</Text>
                        </Grid>}
                        <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={4}>
                            <Image borderRadius="full"
                                boxSize="150px"
                                objectFit="cover"
                                src={value.itemImage}
                                ml={3} />
                            <Text fontSize="2xl" color="gray.500">{"title" in value && value.title}</Text>
                            <Text fontSize="2xl" color="gray.500">{"description" in value && value.description}</Text>
                            <Text fontSize="2xl" color="gray.500">${"price" in value && value.price}</Text>
                        </Grid>

                    </>)
            })}
        </Box>
    </>)
}