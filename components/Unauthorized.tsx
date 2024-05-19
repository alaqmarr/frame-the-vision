import { Card, CardBody } from '@nextui-org/card'
import React from 'react'
import { Separator } from './ui/separator'

const Unauthorized = () => {
    return (
        <Card className="w-full">
            <CardBody className="flex gap-y-4 w-full text-center">
                <Separator className="w-full" />
                <h3 className="text-center text-xl font-bold text-red-500">You are not authorized to visit this page.</h3>
                <Separator className="w-full" />
            </CardBody>
        </Card>
    )
}

export default Unauthorized