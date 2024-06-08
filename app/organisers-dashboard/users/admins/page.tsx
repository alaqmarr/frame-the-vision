'use client'
import UserLogin from '@/components/LoginComponent'
import Unauthorized from '@/components/Unauthorized'
import { useUser } from '@/lib/auth'
import { app } from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Spinner } from '@nextui-org/spinner'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { get, getDatabase, ref, remove, set } from 'firebase/database'
import { ArrowBigLeftDash, CheckCheckIcon, InstagramIcon, ShieldBan, ShieldCheck, ShieldClose, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'


const Admins = () => {
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [users, setUsers] = useState<ReactElement<any>[]>([])
    const [usersCount, setUsersCount] = useState(0)
    const db = getDatabase(app)
    const user = useUser()

    function promoteUser(userId: string) {
        const adminNode = ref(db, `frame-the-vision/admins/${userId}`)
        set(adminNode, true).then(() => {
            const userNode = ref(db, `frame-the-vision/users/${userId}/isAdmin`)
            set(userNode, true).then(() => {
                setUsers([])
            }).finally(() => {
                getUsers()
            })
        })
    }

    function demoteUser(userId: string) {
        const adminNode = ref(db, `frame-the-vision/admins/${userId}`)
        remove(adminNode).then(() => {
            const userNode = ref(db, `frame-the-vision/users/${userId}/isAdmin`)
            set(userNode, false).then(() => {
                setUsers([])
            }).finally(() => {
                getUsers()
            })
        })
    }

    function promotePhotographyJudge(userId: string) {
        const adminNode = ref(db, `frame-the-vision/users/${userId}/isJudge`)
        const userNode = ref(db, `frame-the-vision/users/${userId}/judgeType`)
        set(adminNode, true).then(() => {
            set(userNode, 'photography').then(() => {
                setUsers([])
            })
        }).finally(() => {
            getUsers()
        })
    }

    function promoteContentJudge(userId: string) {
        const adminNode = ref(db, `frame-the-vision/users/${userId}/isJudge`)
        const userNode = ref(db, `frame-the-vision/users/${userId}/judgeType`)
        set(adminNode, true).then(() => {
            set(userNode, 'content').then(() => {
                setUsers([])
            })
        }).finally(() => {
            getUsers()
        })
    }

    function promoteToSuperUser(userId: string) {
        const getPassword = prompt('Enter the super user password')
        if (getPassword === 'asdf_1234') {
            const adminNode = ref(db, `frame-the-vision/users/${userId}/isSuperUser`)
            set(adminNode, true).then(() => {
                setUsers([])
            }).finally(() => {
                getUsers()
            })
        } else {
            alert('Incorrect password, try again')
        }
    }

    async function getUsers() {
        setUsers([])
        const usersNode = ref(db, `frame-the-vision/users`)
        await get(usersNode).then((snapshot) => {
            let count = 0
            let allUsers: any = []
            const data = snapshot.val()
            for (const eachUser in data) {
                const name = data[eachUser].muminName
                const instagram = data[eachUser].muminInstagramUsername
                const phone = data[eachUser].muminMobile
                const age = data[eachUser].muminAge
                const city = data[eachUser].muminCity
                const userIsAdmin = data[eachUser].isAdmin || false
                const userIsJudge = data[eachUser].isJudge || false
                const userIsSuperUser = data[eachUser].isSuperUser || false

                if (userIsAdmin) {
                    count++
                    allUsers.push(
                        <TableRow key={eachUser}>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                                <div className='flex flex-col items-center justify-center'>


                                    {
                                        eachUser !== 'n2Aa3RbQawRBWc0U1DJPvKjJC893' && (


                                            userIsAdmin ?
                                                (<Button
                                                    className='mt-1 mb-1'
                                                    color='danger'
                                                    variant='flat'
                                                    onClick={() => demoteUser(eachUser)}
                                                >
                                                    <ShieldBan /> Demote from admin
                                                </Button>)
                                                :
                                                <Button
                                                    isIconOnly
                                                    color='secondary'
                                                    variant='flat'
                                                    onClick={() => promoteUser(eachUser)}
                                                >
                                                    <ShieldPlus />
                                                </Button>
                                        )
                                    }


                                    {
                                        eachUser !== 'n2Aa3RbQawRBWc0U1DJPvKjJC893' && (


                                            userIsJudge ?
                                                (<Button
                                                    className='mt-1 mb-1'
                                                    color='danger'
                                                    variant='flat'
                                                    isDisabled
                                                >
                                                    <ShieldBan /> Cannot be demoted (judge)
                                                </Button>)
                                                :
                                                (
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <Button
                                                            className='mt-1 mb-1'
                                                            color='secondary'
                                                            variant='flat'
                                                            onClick={() => promotePhotographyJudge(eachUser)}
                                                        >
                                                            Photography Judge
                                                        </Button>
                                                        <Button
                                                            className='mt-1 mb-1'
                                                            color='secondary'
                                                            variant='flat'
                                                            onClick={() => promoteContentJudge(eachUser)}
                                                        >
                                                            Content Judge
                                                        </Button>
                                                    </div>
                                                )
                                        )
                                    }

                                    {
                                        eachUser !== 'n2Aa3RbQawRBWc0U1DJPvKjJC893' && (



                                            userIsSuperUser ?
                                                (<Button
                                                    className='mt-1 mb-1'
                                                    color='danger'
                                                    variant='flat'
                                                    isDisabled
                                                >
                                                    <ShieldBan /> Demote from Super User
                                                </Button>)
                                                :
                                                (
                                                    <Button
                                                        color='secondary'
                                                        variant='flat'
                                                        onClick={() => promoteToSuperUser(eachUser)}
                                                    >
                                                        Promote to Super User
                                                    </Button>
                                                )

                                        )
                                    }
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                }
                setUsersCount(count)

            }
            setUsers(allUsers)
        })
    }

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
        else {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }, [loggedIn, userId])


    useEffect(() => {
        getUsers()
    }, [])


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

    if (loggedIn && isAdmin) {
        return (
            <div className='flex flex-col'>
                <Link href="/organisers-dashboard" className='mb-3'>
                    <Button
                        color="primary"
                        variant="flat"
                    >
                        <ArrowBigLeftDash /> Back to Dashboard
                    </Button>
                </Link>
                <Table aria-label="Users Table">
                    <TableHeader>
                        <TableColumn>
                            Name
                        </TableColumn>
                        <TableColumn>
                            Actions
                        </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No users to display"}>
                        {users}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default Admins