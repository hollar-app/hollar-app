import {Center, Heading, Stack, Icon} from "@chakra-ui/react"
import { WarningTwoIcon } from '@chakra-ui/icons'


export default function ErrorPlaceholder () {
    return <Center mt={64}>
        <Stack spacing={6} textAlign="center">
            <Heading>We couldn't find the store you were looking for</Heading>
        </Stack>
    </Center>
}