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
import { ArrowBigLeftDash, InstagramIcon, ShieldCheck, ShieldClose, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'


const Users = () => {
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [posts, setPosts] = useState<ReactElement<any>[]>([])
    const [usersCount, setUsersCount] = useState(0)
    const db = getDatabase(app)
    const user = useUser()
    const [superAdmin, setSuperAdmin] = useState(false)

    async function getPosts() {
        setPosts([])
        const usersNode = ref(db, `frame-the-vision/posts`)
        await get(usersNode).then((snapshot) => {
            let count = 0
            let allPosts: any = []
            const data = snapshot.val()
            for (const eachUser in data) {
                count++
                const name = data[eachUser].name
                const author = data[eachUser].author
                const photography = data[eachUser].photographyScore || 0
                const content = data[eachUser].contentScore || 0
                const total = photography + content

                allPosts.push(
                    <TableRow key={eachUser}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{author}</TableCell>
                        <TableCell className='text-red-500 font-bold text-medium'>
                            {photography}
                        </TableCell>
                        <TableCell className='text-secondary-500 font-bold text-medium'>
                            {content}
                        </TableCell>
                        <TableCell className='text-primary-500 font-bold text-large'>
                            {total}
                        </TableCell>
                    </TableRow>
                )
                setUsersCount(count)

            }
            setPosts(allPosts)
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
            const superAdminCheckNode = ref(db, `frame-the-vision/users/${userId}/isSuperUser`)
            get(adminCheckNode).then((flick) => {
                if (flick.exists()) {
                    setIsAdmin(true)
                    get(superAdminCheckNode).then((snap) => {
                        if (snap.exists()) {
                            setSuperAdmin(true)
                        }
                    }
                    )
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
        getPosts()
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

    if (loggedIn && !isAdmin && !superAdmin) {
        return <Unauthorized />
    }

    if (loggedIn && isAdmin && superAdmin) {
        return (
            <div className='flex flex-col'>
                <Link href="/organisers-dashboard" className='mb-3'>
                    <Button
                        color="primary"
                        variant="flat"
                    >
                        <ArrowBigLeftDash/> Back to Dashboard
                    </Button>
                </Link>
                <Table aria-label="Posts Table">
                    <TableHeader>
                        <TableColumn>
                            Name
                        </TableColumn>
                        <TableColumn>
                            Author
                        </TableColumn>
                        <TableColumn>
                            Photography Score
                        </TableColumn>
                        <TableColumn>
                            Content Score
                        </TableColumn>
                        <TableColumn>
                            Total Score
                        </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No Posts to display"}>
                        {posts}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default Users