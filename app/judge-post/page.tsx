'use client'
import UserLogin from '@/components/LoginComponent'
import Unauthorized from '@/components/Unauthorized'
import { useUser } from '@/lib/auth'
import { app } from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Code } from '@nextui-org/code'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Spinner } from '@nextui-org/spinner'
import { get, getDatabase, ref, set } from 'firebase/database'
import React, { ReactElement, useEffect, useState, useCallback, useMemo } from 'react'

const JudgePost = () => {
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [judgeType, setJudgeType] = useState('')  // Assuming default judge type
    const [posts, setPosts] = useState<ReactElement<any>[]>([])
    const db = useMemo(() => getDatabase(app), [])
    const user = useUser()

    useEffect(() => {
        const checkUserStatus = async () => {
            if (user) {
                setUserId(user.uid)
                setLoggedIn(true)
                const adminCheckNode = ref(db, `frame-the-vision/users/${user.uid}/isJudge`)
                const judgeTypeCheck = ref(db, `frame-the-vision/users/${user.uid}/judgeType`)
                const adminSnap = await get(adminCheckNode)
                if (adminSnap.exists()) {
                    const judgeTypeSnap = await get(judgeTypeCheck)
                    setJudgeType(judgeTypeSnap.val())
                    setIsAdmin(true)
                }
            }
            setTimeout(() => setLoading(false), 3000)
        }
        checkUserStatus()
    }, [user, db])

    const updateScore = useCallback(async (postId: string, scoreType: string) => {
        const form = document.getElementById(`${postId}_${scoreType}`) as HTMLFormElement
        const score = form.querySelector('input') as HTMLInputElement
        const scoreValue = parseInt(score.value)
        const scoreRef = ref(db, `frame-the-vision/posts/${postId}/${scoreType}Score`)
        const transactionRef = ref(db, `frame-the-vision/posts/${postId}/transaction/${userId}`)

        const snap = await get(scoreRef)
        const data = snap.val()
        const newScore = data ? data + scoreValue : scoreValue

        await set(scoreRef, newScore)
        score.value = ''
        await set(transactionRef, true)
    }, [db, userId])

    useEffect(() => {
        const fetchPosts = async () => {
            if (loggedIn && isAdmin) {
                setPosts([])
                const postsRef = ref(db, 'frame-the-vision/posts')
                const snap = await get(postsRef)
                const allPosts = snap.val()
                const postsBlock = []

                for (const post in allPosts) {
                    const transactionCheck = ref(db, `frame-the-vision/posts/${post}/transaction/${userId}`)
                    const transactionSnap = await get(transactionCheck)
                    const judged = transactionSnap.exists()
                    const desc = allPosts[post].Description

                    postsBlock.push(
                        <Card className='w-[350px] flex flex-col items-center justify-center mb-3' key={post}>
                            <CardHeader>
                                <Image src={allPosts[post].imageUrl} alt={allPosts[post].author} />
                            </CardHeader>
                            <CardBody>
                                <h1 className='text-lg font-bold'>{allPosts[post].name}</h1>
                                <p>{desc}</p>
                            </CardBody>
                            <CardFooter>
                                {judged ? (
                                    <Code>Already judged</Code>
                                ) : (
                                    <form onSubmit={(e) => { e.preventDefault(); updateScore(post, judgeType === 'photography' ? 'photography' : 'content') }} id={`${post}_${judgeType}`}>
                                        <input type="number" placeholder={`Enter ${judgeType === 'photography' ? 'Photography' : 'Content'} score`} className="w-full border border-gray-300 rounded-md p-2" />
                                        <Button color="success" className="w-full mt-2" type="submit">Submit</Button>
                                    </form>
                                )}
                            </CardFooter>
                        </Card>
                    )
                }
                setPosts(postsBlock)
            }
        }
        fetchPosts()
    }, [loggedIn, isAdmin, userId, db, updateScore, judgeType])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] mb-3">
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
        <div className='flex flex-row flex-wrap items-center justify-evenly'>
            {posts}
        </div>
    )
}

export default JudgePost
