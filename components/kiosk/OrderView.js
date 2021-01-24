import React, {useContext, useState, useEffect} from "react";
import { 
  Flex, VStack, HStack, Checkbox, 
  Heading, Text, Container, Box,
  Button, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import fb from "../../util/firebaseConfig";
import Router from 'next/router';

export default function({ isPending, order }) {

  const [showAlert, setShowAlert] = useState(false);
  const onClose = () => setShowAlert(false);
  const cancelRef = React.useRef();

  function renderItems(items){
    return items.map((item, index) => {
      return <Text key={index}> x{item.quantity} {item.title} </Text>
    });
  }

  function alertCompleteOrder(){
    console.log("order completed!!");
    console.log(JSON.stringify(order, null, 2));
    setShowAlert(false);

    var completeOrder = fb.functions().httpsCallable('completeOrder');
    completeOrder({ orderId: order.orderID })
    .then((result) => {
      const results = result.data;
      Router.reload();
      console.log(results);
    });
 
  }

  function renderCheckBox() {
    if (isPending)
      return <Button colorScheme="orange" onClick={() => setShowAlert(true)} mr={5}> Complete Order </Button>
  }

  return(
    <>
      <Box w="100%" borderWidth={0.25} borderRadius={8} mb={4} p={5}>

        <HStack justify="space-between">
          <HStack>
            <VStack align="flex-start" mx={5}> {renderCheckBox()} </VStack>
            <VStack align="flex-start" mx={5}>
              <Heading> Order for { order.customer.name } </Heading>
              <Heading> Total: ${ order.totalCost } </Heading>
            </VStack>
          </HStack>

          <VStack align="flex-end">
            { renderItems(order.items) }
          </VStack>
        </HStack>
      </Box>

      <AlertDialog
        isOpen={showAlert}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Move the order to completed
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={alertCompleteOrder} mx={3}>
                Complete Order
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
