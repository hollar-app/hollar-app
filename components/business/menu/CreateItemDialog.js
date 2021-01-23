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
                description: event.target.description.value
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
                                <Button variant="outline">Upload Image</Button>
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