import React from 'react'
import {Container, ContainerProps} from '@chakra-ui/react'
import theme from '../theme'
import CSS from 'csstype'

const cardStyle: CSS.Properties = {
    margin: '30px auto',
    borderRadius: '40px',
    boxShadow: '5px 5px 30px 7px rgba(0,0,0,0.10), -5px -5px 30px 7px rgba(0,0,0,0.10)',
    padding: '20px'
}

type Props = ContainerProps & {
    children?: React.ReactNode,
    pt?: Number
}

const Card = ({children, pt, ...rest} : Props) => (
    <Container style={cardStyle} pt={pt} {...rest}>
        <>{children}</>
    </Container>
)

export default Card