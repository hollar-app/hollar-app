
import { useContext, useEffect, useReducer, useState } from "react";
import { 
  Container, Text, Heading, VStack, Input, Button, HStack, Spacer, Box, Select, 
  Badge, Center, Image
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import NavbarComplete from "../../components/NavbarComplete";

export default function(){
  const router = useRouter();

  const adOne = {
    imageUrl: "https://images.unsplash.com/photo-1528800190552-c3aae2994f70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Blue Bottle",
    store_id: "B9BjBsZZ726zkoVAwHec", 
  }

  const adTwo = {
    imageUrl: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Luigi's Pizzaria",
    store_id: "KR3rfs04Fl7Vb0NoA0xs", 
  }

  function renderStore(data){

    return <>
      
        <Box 
          maxW="md" 
          borderWidth="1px" 
          borderRadius="lg" 
          overflow="hidden" 
          mx={6} 
          my={10}
          _hover={{ cursor: "pointer" }}
          onClick={() => router.push(`storefront/${data.store_id}`)}
        >
          <Image h="xs" src={data.imageUrl} />

          <Box p="6">

            <Heading as="h5" sz="sm">
              {data.title}
            </Heading>
            <Badge borderRadius="full" px="2" colorScheme="teal"> New!! </Badge>

          </Box>
        </Box>
    </>

  }

  return <>
    <NavbarComplete />

    <Center mt={10} mb={5}>
      <Heading size="2xl"> Recommendations </Heading>
    </Center>

    <Center>
      { renderStore(adOne) }
      { renderStore(adTwo) }
    </Center>


  </>
}
