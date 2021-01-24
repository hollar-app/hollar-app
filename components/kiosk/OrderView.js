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

export default function({ isPending, order }) {

  const [showAlert, setShowAlert] = useState(false);
  const onClose = () => setShowAlert(false);
  const cancelRef = React.useRef();

  function renderItems(items){
    return items.map((item, index) => {
      return <VStack key={index} align="flex-start" mx={5}>
        <Text> x{item.quantity} {item.title} </Text>
      </VStack>
    });
  }

  function alertCompleteOrder(){
    console.log("order completed!!");
    setShowAlert(false);
    // var completeOrder = fb.functions().httpsCallable('completeOrder');
    // completeOrder({ storeId: store_id })
    //   .then((result) => {
    //     console.log(JSON.stringify(result.data));
    //   });
  }

  function renderCheckBox() {
    if (isPending)
      return <Button colorScheme="orange" onClick={() => setShowAlert(true)} mr={5}> Complete Order </Button>
  }

  return(
    <>
      <Box w="100%" borderWidth={0.25} borderRadius={8} mb={4} p={5}>

        <HStack justify="center">
          <VStack mx={5}> {renderCheckBox()} </VStack>

          <VStack align="flex-start" mx={5}>
            <Heading> Order for { order.customer.name } </Heading>
            <Heading> Total: ${ order.totalCost } </Heading>
          </VStack>

          <VStack>
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
