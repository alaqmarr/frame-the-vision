'use client'
import { HeartFilledIcon } from '@/components/icons'
import { updateAnalytics } from '@/lib/analytics'
import { useUser } from '@/lib/auth'
import { app } from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Code } from '@nextui-org/code'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Spinner } from '@nextui-org/spinner'
import { getDatabase, ref, get, set, remove } from 'firebase/database'
import { ArrowLeft, InstagramIcon, MessageCircleWarningIcon, ShareIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Vision = () => {
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [author, setAuthor] = useState('')
    const [instagramUsername, setInstagramUsername] = useState('')
    const [userId, setUserId] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [liked, setLiked] = useState(false)
    const [counter, setCounter] = useState(0)
    const urlPrams = useParams()
    const id = urlPrams.id
    const user = useUser()
    useEffect(() => {
        updateAnalytics();
    }, []);
    function likePost() {
        const database = getDatabase(app)
        const likedByNode = ref(database, `frame-the-vision/posts/${id}/likedBy/${userId}`)
        setLiked(true)
        set(likedByNode, true).then(() => {
            const likedCounterNode = ref(database, `frame-the-vision/posts/${id}/likedCounter`)
            get(likedCounterNode).then((snap) => {
                const data = snap.val()
                if (data) {
                    const counter = data + 1
                    set(likedCounterNode, counter)
                } else {
                    set(likedCounterNode, 1)
                }

                toast.success('Liked')
            })
        })
    }

    function dislike(){
        const database = getDatabase(app)
        const likedByNode = ref(database, `frame-the-vision/posts/${id}/likedBy/${userId}`)
        setLiked(false)
        set(likedByNode, false).then(() => {
            const likedCounterNode = ref(database, `frame-the-vision/posts/${id}/likedCounter`)
            get(likedCounterNode).then((snap) => {
                const data = snap.val()
                if (data) {
                    const counter = data - 1
                    set(likedCounterNode, counter)
                } else {
                    set(likedCounterNode, 0)
                }
            })
        }).finally(() => {
            remove(likedByNode)
        })
    
    }

    useEffect(() => {
        const database = getDatabase(app)
        const postNode = ref(database, `frame-the-vision/posts/${id}`)
        get(postNode).then((snap) => {
            const data = snap.val()
            const title = data.name
            const description = data.Description
            const image = data.imageUrl
            const date = data.postedOn
            const author = data.author
            const user = data.user
            const likedBy = data.likedCounter || 0
            setCounter(likedBy)
            const instagramNode = ref(database, `frame-the-vision/users/${user}/muminInstagramUsername`)
            get(instagramNode).then((snap) => {
                const data = snap.val()
                const instagram = data
                setInstagramUsername(instagram)
            })
            setTitle(title)
            setDescription(description)
            setImage(image)
            setDate(date)
            setAuthor(author)
            setLoading(false)
        })
    }, [id])

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
            setUserId(user.uid)
        }
    }, [user])

    useEffect(() => {
        if (userId) {
            const database = getDatabase(app)
            const likedByNode = ref(database, `frame-the-vision/posts/${id}/likedBy/${userId}`)
            get(likedByNode).then((snap) => {
                const data = snap.val()
                if (data) {
                    setLiked(true)
                }
            })
        }
    }, [userId, id])

    if (loading) {
        return (
            <Card className="w-full">
                <CardBody className="flex gap-y-4 w-full text-center">
                    <Spinner label="Please wait while the post is being loaded" color="primary" labelColor="primary" className="mt-3 mb-3" />
                </CardBody>
            </Card>
        )
    }

    return (
        <div className='flex flex-col items-center justify-center gap-y-3'>
            <Link className='w-full' href={`/#${id}`}>
                <Button color='default' variant={'flat'} className='font-bold uppercase'>
                    <ArrowLeft />Go back
                </Button>
            </Link>
            <Divider className='mt-3 mb-3' />
            <Image src={image} alt={title} width={1080} height={180} className="object-cover rounded-xl" />
            <Divider className='mt-6 mb-3' />

            <div className='w-full flex items-center justify-between'>
                <div className='w-[70%]'>
                    <h1 className='text-2xl font-bold uppercase'>{title}</h1>
                </div>

                <div>
                    <Link href={`https://wa.me/?text=View%20this%20post%20on%20Frame%20the%20Vision%20portal%20by%20HSB%20Secunderabad.%0A%0A*https://ftv.hsbsecunderabad.com/vision/${id}*`}>
                        <Button color='success' className='uppercase'><ShareIcon />Share</Button>
                    </Link>
                </div>

            </div>
            <Divider className='mt-3 mb-3' />
            <div className='text-center flex flex-col items-center justify-center gap-y-3'>
                <h4 className='text-sm font-bold'>
                    This vision has been posted by <Code color='primary' className='uppercase font-bold'>{author}</Code> dated <Code color='default'>
                        {new Date(date).toLocaleString()}
                    </Code>
                </h4>
                <Divider />
                <Link href={`https://instagram.com/${instagramUsername}`}>
                    <Button color='danger' variant={'flat'} className='font-bold uppercase'>
                        <InstagramIcon />Follow <strong className='text-blue-500'>{author}</strong>
                    </Button>
                </Link>
            </div>
            <Divider className='mt-3 mb-3' />
            <Card className='flex flex-col w-full'>
                <CardHeader className='flex flex-col items-start gap-y-3'>
                    <Code color='secondary' className='text-xl font-bold uppercase'>Description</Code>
                    {
                        userId !== '' ? (
                            liked ? (
                                <div className='flex flex-col w-full items-start gap-y-2'>
                                    <Chip size='md' color='success' variant='flat'>
                                    ❤️ Liked by you and {counter - 1} others
                                </Chip>

                                <Chip color='danger' variant='flat' onClick={() => dislike()}>
                                    Remove Like
                                </Chip>
                                </div>
                            )
                                :
                                <Button color='danger' onClick={() => likePost()}>
                                    <HeartFilledIcon /> Like
                                </Button>
                        )
                            :
                            (
                                <Chip size='md' color='danger' variant='flat'>
                                    ❤️ Liked by {counter} people
                                </Chip>
                            )
                    }
                </CardHeader>
                <Divider />
                <CardBody>
                    <h1 className='text-md font-semibold' dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }} />
                </CardBody>
            </Card>
            <Divider />
            <div className='flex flex-col items-center justify-center gap-y-6 w-full'>
                <Link href={`/team`}>
                    <Button color='warning' variant={'flat'} className='font-bold uppercase'>
                        Frame The Vision Team <Users />
                    </Button>
                </Link>
                <Link href={`https://wa.me/917207004751?text=I%20want%20to%20report%20this%20vision%20because%20%0A%0A*VISION_ID*%20${id}`}>
                    <Button color='danger' variant={'flat'} className='font-bold uppercase'>
                        Report this Vision <MessageCircleWarningIcon />
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default Vision
