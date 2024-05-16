import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Code } from '@nextui-org/code'
import { Divider } from '@nextui-org/divider'
import { link } from 'fs'
import Link from 'next/link'
import React from 'react'

const Guide = () => {
    return (
        <section className='flex flex-col items-center gap-y-6 justify-center'>
            <Card className='flex flex-col items-center justify-center w-fit'>
                <CardHeader className='flex flex-col items-start justify-center gap-y-1 w-full'>
                    <h1 className='text-md uppercase font-bold w-full text-center'>
                        <Code color='primary' className='text-lg font-bold'>FRAME THE VISION</Code>
                    </h1>
                </CardHeader>
            </Card>
            <Divider />

            <div className='flex flex-col items-center justify-center w-full gap-y-6'>
                <div>
                    <h1 className='font-bold text-xl underline'>
                        <strong>RULES & REGULATIONS</strong>
                    </h1>
                    <br />
                    <p>
                        <h3 className='text-md uppercase underline'>
                            <strong>
                                ELIGIBILITY:
                            </strong>
                        </h3>
                        - The competition is open to individuals of all ages and region.
                        <br />
                        <br />
                        <h3 className='text-md uppercase underline'>
                            <strong>
                                sybmission guidelines:
                            </strong>
                        </h3>
                        - All entries must be submitted by a specified deadline. Late submissions may not be considered.
                        <br />
                        <br />
                        <h3 className='text-md uppercase underline'>
                            <strong>
                                content guidelines:
                            </strong>
                        </h3>
                        - Entries must contain a picture along with relevant content that aligns with the theme or topic of the competition.
                        <br />
                        - Any content deemed inappropriate or offensive will be disqualified.
                        <br />
                        - Per person, only one entry canbe submitted.
                        <br />
                        - <strong>Please refrain from using AQA Maula(t.u.s)&apos;s photographs.</strong>
                        <br />
                        <br />
                        <h3 className='text-md uppercase underline'>
                            <strong>
                                language:
                            </strong>
                        </h3>
                        - Content can be written in English or Lisan-ud-Dawat.
                        <br />
                        <br />
                        <h3 className='text-md uppercase underline'>
                            <strong>
                                Originality:
                            </strong>
                        </h3>
                        - Entries must be original and created by the contestant. Plagiarism will not be entertained.
                        <br />
                        - Taking photographs from the internet is a big NO.
                        <br />
                        <br />

                        <h3 className='text-md uppercase underline'>
                            <strong>
                                EVALUATION:
                            </strong>
                        </h3>
                        - Evaluation will be made on the basis of-
                        <br />
                        &nbsp;&nbsp;1.&nbsp;Photography
                        <br />
                        &nbsp;&nbsp;2.&nbsp;Content
                        <br />
                        &nbsp;&nbsp;3.&nbsp;Content&apos;s significance to Ashara Ohbat
                        <br />
                        &nbsp;&nbsp;4.&nbsp;Writing spirit inclined towards the photograph and chosen topic.
                        <br />

                    </p>

                    <h1 className='text-red-500 text-lg font-bold mt-3'>
                        NOTE: THE DECISION OF THE JUDGES SHALL BE FINAL AND BINDING ON ALL THE PARTICIPANTS
                    </h1>
                </div>
                <Divider />
                <div>
                    <Card className='w-[80vw]'>
                        <CardHeader>
                            <h1 className='text-xl font-bold'>
                                <strong>TOPICS</strong>
                            </h1>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <h3 className='text-md font-bold uppercase'>
                                1. Even the smallest actions can yield greater impacts.
                                <br />
                                2. There is often more to things than meets the eye.
                                <br />
                                3. Even when you&apos;re on your own, your beliefs can be your strongest support.
                                <br />
                                4. Be the water drop that dances on a leaf, finding joy in the simplest moments.
                                <br />
                                5. Go where you feel most alive.
                                <br />
                                6. In the saddle, we find freedom; in the horse, we find our wings.
                                <br />
                                7. Learning never exhausts the mind.
                                <br />
                                8. Craft a legacy that echoes through generations.
                                <br />
                                9. Bazaar&apos;s of my city.
                                <br />
                                10. Sometimes, the toughest-looking things can surprise you with their gentleness.
                                <br />
                            </h3>
                        </CardBody>
                        <Divider />
                        <CardFooter className='flex flex-col items-center justify-center'>
                            <Link href={'/'}>
                            <Button
                            color='primary'
                            variant='flat'
                            className='w-full'
                            >
                                Continue to Homepage
                            </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Guide