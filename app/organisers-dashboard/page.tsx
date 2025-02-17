'use client'
import UserLogin from '@/components/LoginComponent'
import Unauthorized from '@/components/Unauthorized'
import { useUser } from '@/lib/auth'
import { app } from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Spinner } from '@nextui-org/spinner'
import { get, getDatabase, ref, set } from 'firebase/database'
import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'


const Dashboard = () => {
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const db = getDatabase(app)
    const user = useUser()
    const [analyticsCard, setAnalyticsCard] = useState<ReactElement<any>[]>([])
    const [isSuperUser, setIsSuperUser] = useState(false)
    const [userJudge, setUserJudge] = useState(false)

    useEffect(() => {
        if (user) {
            setUserId(user.uid)
            setLoggedIn(true)
        }
    }, [user])


    useEffect(() => {
        const node = ref(db, 'frame-the-vision/analytics');
        get(node).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setAnalyticsCard(processData(data));
            }
        });
    }, []);

    const processData = (data: any, parentKey = '') => {
        let cards: any = [];

        Object.keys(data).forEach((key) => {
            const fullKey = parentKey ? `${parentKey}/${key}` : key;
            const value = data[key];

            if (typeof value === 'object' && !Array.isArray(value)) {
                cards = cards.concat(processData(value, fullKey));
            } else {
                cards.push(
                    <Card key={fullKey} className='w-[150px] flex flex-col items-center justify-center text-center'>
                        <CardHeader className='w-full text-center items-center justify-center'>
                            <Link href={fullKey === 'home' ? `/` : `/${fullKey}`}>
                                <h1 className='uppercase text-blue-500 font-bold text-sm'>{fullKey}</h1>
                            </Link>
                        </CardHeader>
                        <CardBody className='w-full text-center items-center justify-center'>
                            <h1 className='text-lg font-bold'>{value} visits</h1>
                        </CardBody>
                    </Card>
                );
            }
        });

        return cards;
    };

    useEffect(() => {
        if (loggedIn) {
            const adminCheckNode = ref(db, `frame-the-vision/admins/${userId}`)
            const superUserCheckNode = ref(db, `frame-the-vision/users/${userId}/isSuperUser`)
            const checkJudegNode = ref(db, `frame-the-vision/users/${userId}/isJudge`)
            get(adminCheckNode).then((flick) => {
                if (flick.exists()) {
                    setIsAdmin(true)
                    get(superUserCheckNode).then((snap) => {
                        if (snap.exists()) {
                            setIsSuperUser(true)
                        }
                    }).finally(() => {
                        get(checkJudegNode).then((snap) => {
                            if (snap.exists()) {
                                setUserJudge(true)
                            }
                        }
                        )
                    })
                }
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            })
        }
        else {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }, [loggedIn, userId])
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
        return <UserLogin />
    }

    if (loggedIn && !isAdmin) {
        return <Unauthorized />
    }

    return (
        <>
            <div className='flex flex-row flex-wrap gap-y-3 items-center mb-6 justify-evenly'>
                {analyticsCard}
            </div>
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

                {
                    userJudge && (
                        <Card className='w-[300px] flex flex-col items-center justify-center text-center'>
                            <CardBody className='w-full text-center items-center justify-center'>
                                <h1>JUDGE POSTS</h1>
                            </CardBody>
                            <CardFooter className='flex flex-col items-center justify-center'>
                                <Link href='/judge-post' target='_blank'>
                                    <Button color='secondary' variant='flat'>
                                        Judge Posts
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    )
                }

                {
                    isSuperUser && (
                        <>
                            <Card className='w-[300px] flex flex-col items-center justify-center text-center'>
                                <CardBody className='w-full text-center items-center justify-center'>
                                    <h1>View points</h1>
                                </CardBody>
                                <CardFooter className='flex flex-col items-center justify-center'>
                                    <Link href='/organisers-dashboard/judged-posts'>
                                        <Button color='warning' variant='flat'>
                                            View Points alloted to posts
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
                                        <Button color='warning' variant='flat'>
                                            View All Admins
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Dashboard