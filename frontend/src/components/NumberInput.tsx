import React from 'react'
import {NumberInput as NumInt, NumberInputProps, NumberInputField, Box} from '@chakra-ui/react'

type Props = NumberInputProps & {
    defaultValue: Number,
    min: Number,
    value?: string,
    label: string
}

const NumberInput = ({defaultValue, min, value, label, ...rest}: Props) =>  (
    <Box width="100%">
        <NumInt
            defaultValue={defaultValue}
            min={min}
            value={value}
            {...rest}
        >
            <span>{label}</span>
            <NumberInputField />
        </NumInt>
    </Box>
)

export default NumberInput