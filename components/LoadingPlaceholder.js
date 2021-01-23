import {Center, CircularProgress} from "@chakra-ui/react";

export default function LoadingPlaceholder () {
    return <Center mt={32}>
        <CircularProgress isIndeterminate color="gray.500" size="84px" thickness="4px"/>
    </Center>
}