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
    Divider
} from "@chakra-ui/react";
import {PhoneIcon, LinkIcon, WarningIcon} from '@chakra-ui/icons'
import Section from "./Section";
import { useContext, useEffect, useReducer, useState } from "react";
import { getLocalStorageCartItems, setLocalStorageCartItems } from "../../util/localStorage";

export default function Storefront({pageData}) {
  const [itemQuantity, setItemQuantity] = useState({});

  useEffect(() => {
    // console.log(pageData.sections) 
    if (pageData.sections != undefined) {
      pageData.sections.map((val, index, arr) => {
        console.log("in the map ==>", val)
      })   
    }

    var cartCurrent = getLocalStorageCartItems();
    var itemQuantityCopy = {};
    cartCurrent.map((item, index) => {
      itemQuantityCopy[item.item_id] = item.quantity;
    });
    setItemQuantity(itemQuantityCopy);

  }, [pageData])

  function addToCart(itemData){
    var cartCurrent = getLocalStorageCartItems();

    var exists = false;
    cartCurrent = cartCurrent.map((value) => {
      if (value.item_id === itemData.item_id){
        exists = true;
        var newValue = {...value};
        newValue["quantity"] = value["quantity"] + 1;
        return newValue;
      }
      else{
        return value;
      }
    })

    if (!exists){
      const obj = {
        "title": itemData.title,
        "item_id": itemData.item_id,
        "price": itemData.price,
        "store_id": itemData.storeId,
        "image_url": itemData.itemImage,
        "quantity": 1
      }
      cartCurrent.push(obj);
    }

    setLocalStorageCartItems(cartCurrent);

    var itemQuantityCopy = {};
    cartCurrent.map((item, index) => {
      itemQuantityCopy[item.item_id] = item.quantity;
    });
    setItemQuantity(itemQuantityCopy);
  }

    return <Container maxW="5xl" centerContent textAlign="center" p={4}>
        <Box opacity={0.9} w="100%" bg="gray.900" mb={-24} borderRadius={12} overflow="hidden">
            <Image w="100%" h={64} src={pageData.coverImage} alt="" objectFit="cover"/>
        </Box>
        <Avatar size="2xl" showBorder name="Segun Adebayo" src={pageData.logo}/>
        <Box mt={4} w="100%">
            <Heading>{pageData.businessName}</Heading>
            <Text fontSize="lg">{pageData.headline}</Text>
            <Center mt={4}>
                <Stack direction="row" spacing={4}>
                    <IconButton aria-label="Visit store website" icon={<LinkIcon/>}/>
                    <IconButton aria-label="Call store" icon={<PhoneIcon/>}/>
                    <Button leftIcon={<i className="fas fa-map-marker-alt"/>} colorScheme="blue" variant="solid">
                        Get directions
                    </Button>
                </Stack>
            </Center>
            <Divider my={8}/>

            {pageData.sections != undefined && pageData.sections.map(section => 
              <Section 
                section={section} 
                storeId={pageData.storeId} 
                itemQuantity={itemQuantity}
                addToCart={addToCart}
              />)}


        </Box>

    </Container>
}
