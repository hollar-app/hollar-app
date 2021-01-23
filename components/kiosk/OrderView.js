import React, {useContext, useState, useEffect} from "react";
import { Spacer, Flex, VStack, HStack, Checkbox, Heading, Text, Container, Box } from "@chakra-ui/react";

export default function({ isPending, order }) {

  function renderItems(items){
    return items.map((item, index) => {
      return <VStack align="flex-start" mx={5}>
        <Text> x{item.quantity} {item.title} </Text>
      </VStack>
    });
  }

  function renderCheckBox() {
    if (isPending)
      return (<Checkbox size="lg" mr={5} colorScheme="orange" />);
    else
      return (<Checkbox size="lg" mr={5} colorScheme="orange" defaultIsChecked />);
  }

  return(
    <Box w="100%" p={4} m={5} color="white">

      <Flex>
        {renderCheckBox()}

        <VStack align="flex-start" mx={5}>
          <Heading> Order from { order.customer.name } </Heading>
          <Heading> Total: ${ order.totalCost } </Heading>
        </VStack>

        <VStack>
          { renderItems(order.items) }
        </VStack>

      </Flex>
    </Box>
  );
}
