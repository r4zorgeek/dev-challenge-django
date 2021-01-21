import React from 'react'
import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderProps,
    Text,
    Box,
    HStack
} from '@chakra-ui/react'
import CSS from 'csstype'

type Props = SliderProps & {
    label?: string
}

const Slider = ({ label, ...rest }: Props) => (
    <Box width="100%">
        {!!label && <Text align="left">{label}</Text>}
        <ChakraSlider {...rest} colorScheme="primary">
            <SliderTrack>
                <SliderFilledTrack bg="primary" />
            </SliderTrack>
            <SliderThumb />
        </ChakraSlider>
        <HStack spacing={50} align="stretch" justify="space-between">
            <label>{rest.min}</label>
            <label color="red">Value: {rest.value}</label>
            <label>{rest.max}</label>
        </HStack>
    </Box>
)

export default Slider
