import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Code } from '@nextui-org/code'
import { Divider } from '@nextui-org/divider'
import React from 'react'

const Guide = () => {
    return (
        <section className='flex flex-col items-center gap-y-6 justify-center'>
            <Card className='flex flex-col items-center justify-center w-fit'>
                <CardHeader className='flex flex-col items-start justify-center gap-y-1 w-full'>
                    <h1 className='text-md uppercase font-bold w-full text-center'>
                        Welcome to <Code color='primary' className='text-lg font-bold'>FRAME THE VISION</Code>
                    </h1>
                </CardHeader>
            </Card>
            <Divider />

            <div className='flex flex-col items-start justify-center w-full gap-y-6'>
                <div className='flex flex-col items-start justify-center w-full'>
                    <h1 className='font-bold uppercase text-xl'>
                        About Frame the Vision
                    </h1>
                    <p>
                        Frame the vision is brought to you by the team at HSB Secunderabad.
                        More content to come.
                    </p>
                </div>

                <div className='flex flex-col items-start justify-center w-full'>
                    <h1 className='font-bold uppercase text-xl'>
                        Rules of this competition
                    </h1>
                    <ol type='1'>
                        <li>Rule 1</li>
                        <li>Rule 2</li>
                        <li>Rule 3</li>
                        <li>Rule 4</li>
                        <li>Rule 5</li>
                    </ol>
                </div>

                <div className='flex flex-col items-start justify-center w-full'>
                    <h1 className='font-bold uppercase text-xl'>
                        How to post a vision?
                    </h1>
                    <p>
                        Frame the vision is brought to you by the team at HSB Secunderabad.
                        More content to come.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Guide