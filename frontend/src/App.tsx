import React, {useEffect} from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Savings from './containers/Savings'
import theme from './theme'

const defaultTheme = extendTheme(theme)

function App() {
    useEffect(() => {
        localStorage.clear()
    })

    return (
        <ChakraProvider theme={defaultTheme}>
            <Savings />
        </ChakraProvider>
    )
}

export default App
