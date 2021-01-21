import React, { useState, useEffect} from 'react'
import { Box, Container, Heading, SliderThumb, VStack } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'

const Savings = () => {
    let URL = 'http://127.0.0.1:8000'

    // function for requesting compound interest data
    const fetchData = async () => {
        let key = savingsAmount + ',' + depositAmount + ',' + interestRate

        let bodyContent = {
            'savings-amount': savingsAmount,
            'monthly-deposit': depositAmount,
            'interest-rate': interestRate,
        }

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyContent),
        }

        let getData = await fetch(URL + '/interest-data/', requestOptions)
        let jsonResponse = await getData.json()

        localStorage.setItem(key, JSON.stringify(jsonResponse['compound_data_yearly']))
        setSavingsData(jsonResponse['compound_data_yearly'])
    }

    const [savingsAmount, setSavingsAmount] = useState(5000)
    const [depositAmount, setDepositAmount] = useState(10)
    const [interestRate, setInterestRate] = useState(1)
    const [savingsData, setSavingsData] = useState([])

    useEffect(() => {
        let key = savingsAmount + ',' + depositAmount + ',' + interestRate
        if (key in localStorage) {
            // @ts-ignore
            setSavingsData(JSON.parse(localStorage[key]))
            return
        }

        const timeOutId = setTimeout(() => fetchData(), 150)
        return () => clearTimeout(timeOutId)
    }, [savingsAmount, depositAmount, interestRate])

    // fill up x-axis for graph
    let xAxis: number[] = []
    for (let i = 0; i <= 50; i++) {
        xAxis.push(i)
    }

    return (
        <DefaultLayout>
            <Container pt={6}>
                <VStack spacing={4}>
                    <Heading as="h1">Interest Rate Calculator</Heading>
                    <Input
                        label="Initial Savings amount"
                        name="Initial Savings"
                        placeholder="5000"
                        value={savingsAmount.toString()}
                        min={0}
                        onChange={(e) => setSavingsAmount(Number(e.target.value))}
                    />
                    <Input
                        label="Monthly Deposit"
                        name="Monthly Deposit"
                        placeholder="10"
                        value={depositAmount.toString()}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                    />
                    <Slider
                        label="Interest Rate"
                        name="Interest Rate"
                        defaultValue={1}
                        value={interestRate == 1 ? 1 : interestRate}
                        min={1}
                        max={15}
                        step={0.1}
                        onChange={(val) => {
                            setInterestRate(val)
                        }}
                    />
                    <LineChart
                        title="Savings Over time"
                        xAxisData={xAxis}
                        yAxisData={savingsData}
                        xLabel="Years"
                        yLabel="Amount $"
                    />
                </VStack>
            </Container>
        </DefaultLayout>
    )
}

export default Savings