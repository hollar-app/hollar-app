import {
    Box,
    HStack,
    Editable,
    EditablePreview,
    EditableInput,
    ButtonGroup,
    IconButton,
    Flex,
    VStack,
    Text,
    Spacer,
    Button
} from "@chakra-ui/react"
import {
    CheckIcon, CloseIcon, EditIcon, DeleteIcon, AddIcon,
    SmallCloseIcon
} from "@chakra-ui/icons"
import fb from "../../../util/firebaseConfig";
import {useState} from "react";
import CreateItemDialog from "./CreateItemDialog";

export default function SectionCard({section, menuID}) {
    const firestore = fb.firestore()
    const sectionRef = firestore.collection('menu').doc(menuID).collection('sections').doc(section.id)

    const [newItemModal, toggleNewItemModal] = useState(false)
    const [newItemModalData, setNewItemModalData] = useState({title: "Hot Dogs"})

    const openModal = (item) => {
        setNewItemModalData(item)
        toggleNewItemModal(true)
    }

    const closeModal = () => {
        toggleNewItemModal(false)
        setNewItemModalData({})
    }

    function EditableTitle({value, onChange}) {
        /* Here's a custom control */
        function EditableControls({isEditing, onSubmit, onCancel, onEdit}) {
            return isEditing ? (
                <ButtonGroup justifyContent="center" size="sm">
                    <IconButton icon={<CheckIcon/>} onClick={onSubmit}/>
                    <IconButton icon={<CloseIcon/>} onClick={onCancel}/>
                </ButtonGroup>
            ) : (
                <Flex justifyContent="center">
                    <IconButton size="sm" icon={<EditIcon/>} onClick={onEdit}/>
                </Flex>
            )
        }

        return (
            <Editable
                textAlign="center"
                defaultValue={value}
                onSubmit={onChange}
                fontSize="xl"
                fontWeight={600}
                isPreviewFocusable={false}
                submitOnBlur={false}
            >
                {(props) => (
                    <HStack>
                        <EditablePreview/>
                        <EditableInput/>
                        <EditableControls {...props} />
                    </HStack>
                )}
            </Editable>
        )
    }

    const changeTitle = (newTitle) => {
        sectionRef.update({sectionTitle: newTitle})
    }

    const deleteSection = () => {
        sectionRef.delete()
    }

    return <>
        <CreateItemDialog sectionID={section.id} menuID={menuID} sectionRef={sectionRef} isOpen={newItemModal}
                          onClose={closeModal} formData={newItemModalData}/>
        <Box w="100%" borderWidth={0.25} borderRadius={8} mb={4}>
            <HStack justifyContent="space-between" p={3} px={5}>
                <EditableTitle value={section.sectionTitle} onChange={value => changeTitle(value)}/>
                <HStack>
                    <IconButton onClick={openModal} icon={<AddIcon/>}/>
                    <IconButton onClick={deleteSection} icon={<DeleteIcon/>}/>
                </HStack>

            </HStack>

            <VStack p={3}>
                {section.items ? section.items.map((item, index) => <HStack w="100%" justifyContent="space-between"
                                                                            pb={2} px={2}
                                                                            borderBottomWidth={(index !== (section.items.length - 1)) && 0.25}>
                    <HStack w="100%">
                        <Box key={index}>
                            <Text fontWeight={600}>{item.title} (${item.price})</Text>
                            <Text fontSize="sm">{item.description}</Text>
                        </Box>
                        <Spacer/>
                        <IconButton aria-label="Edit Item" variant="ghost"
                                    icon={<SmallCloseIcon/>}/>
                    </HStack>
                </HStack>) : <p>Add an item</p>}
            </VStack>

        </Box>
    </>
}