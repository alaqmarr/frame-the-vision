'use client'
import Unauthorized from '@/components/Unauthorized'
import { useUser } from '@/lib/auth'
import { app } from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Spinner } from '@nextui-org/spinner'
import { get, getDatabase, ref, set } from 'firebase/database'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Dashboard = () => {
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const db = getDatabase(app)
    const user = useUser()

    useEffect(() => {
        if (user) {
            setUserId(user.uid)
            setLoggedIn(true)
        }
    }, [user])

    useEffect(() => {
        if (loggedIn) {
            const adminCheckNode = ref(db, `frame-the-vision/admins/${userId}`)
            get(adminCheckNode).then((flick) => {
                if (flick.exists()) {
                    setIsAdmin(true)
                }
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            })
        }
    })


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh]">
                <Card className="flex flex-col items-center justify-center">
                    <CardBody className="flex gap-y-4 w-full text-center">
                        <Spinner label="authenticating..." color="primary" labelColor="primary" className="mt-3 mb-3" />
                    </CardBody>
                    <Divider />
                    <CardFooter className="max-w-[150px] flex flex-col items-center justify-center text-center">
                        may take few seconds based on your network speed
                    </CardFooter>
                </Card>
            </div>
        )
    }

    if (!loggedIn) {
        return <h1>You are not logged in</h1>
    }

    if (loggedIn && !isAdmin) {
        return <Unauthorized />
    }

    return (
        <div className='flex flex-row flex-wrap gap-y-6 justify-evenly items-center'>
            <Card className='w-[300px] flex flex-col items-center justify-center text-center'>
                <CardBody className='w-full text-center items-center justify-center'>
                    <h1>Tabular list of all registered users.</h1>
                </CardBody>
                <CardFooter className='flex flex-col items-center justify-center'>
                    <Link href='/organisers-dashboard/users'>
                        <Button color='primary' variant='flat'>
                            View All Users
                        </Button>
                    </Link>
                </CardFooter>
            </Card>

            <Card className='w-[300px] flex flex-col items-center justify-center text-center'>
                <CardBody className='w-full text-center items-center justify-center'>
                    <h1>Tabular list of all admins.</h1>
                </CardBody>
                <CardFooter className='flex flex-col items-center justify-center'>
                    <Link href='/organisers-dashboard/users/admins'>
                        <Button color='primary' variant='flat'>
                            View All Admins
                        </Button>
                    </Link>
                </CardFooter>
            </Card>


            <Card className='w-[300px] flex flex-col items-center justify-center text-center'>
                <CardBody className='w-full text-center items-center justify-center'>
                    <h1>Review posts</h1>
                </CardBody>
                <CardFooter className='flex flex-col items-center justify-center'>
                    <Link href='/organisers-dashboard/posts'>
                        <Button color='primary' variant='flat'>
                            Review a post to remove/archive
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Dashboard