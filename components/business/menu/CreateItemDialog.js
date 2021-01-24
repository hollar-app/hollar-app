import {
    Button,
    Modal,
    Flex,
    ModalOverlay,
    VStack,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Textarea
} from "@chakra-ui/react"
import fb from "../../../util/firebaseConfig";


export default function CreateItemDialog({isOpen, onClose, formData, sectionID, menuID}) {
    const sectionRef = fb.firestore().collection('menu').doc(menuID).collection('sections').doc(sectionID)

    const createItem = (event) => {
        event.preventDefault()
        sectionRef.update({
            items: fb.firestore.FieldValue.arrayUnion({
                title: event.target.title.value,
                price: event.target.price.value,
                description: event.target.description.value, 
                itemImage: "https://images.unsplash.com/photo-1608930532174-18ff53f01438?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"
            })
        })
            .then(onClose)
    }
    return <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{`${formData.title ? "Edit" : "Create New"} Item`}</ModalHeader>
                <ModalCloseButton/>
                <form onSubmit={createItem}>
                    <ModalBody>
                        <VStack w="100%" textAlign="left">
                            <Input id="title" required defaultValue={formData.title} placeholder="Item Name"/>
                            <Input id="price" required type="number" defaultValue={formData.price} placeholder="Item Price"/>
                            <Textarea id="description" defaultValue={formData.description}
                                      placeholder="Item Description"/>
                            <Flex justifyContent="flex-start" w="100%">
                                <Button variant="outline">
                                  <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                                </Button>
                            </Flex>
                        </VStack>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button colorScheme="blue" mr={3} type="submit">
                            Add
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    </>
}
