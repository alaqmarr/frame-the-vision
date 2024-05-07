'use client'
import { app } from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Spinner } from '@nextui-org/spinner'
import { getDatabase, ref, get } from 'firebase/database'
import { ShareIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Vision = () => {
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [author, setAuthor] = useState('')
    const urlPrams = useParams()
    const id = urlPrams.id

    useEffect(() =>{
        const database = getDatabase(app)
        const postNode = ref(database, `frame-the-vision/posts/${id}`)
        get(postNode).then((snap) => {
            const data = snap.val()
            const title = data.name
            const description = data.Description
            const image = data.imageUrl
            const date = data.postedOn
            const author = data.author
            setTitle(title)
            setDescription(description)
            setImage(image)
            setDate(date)
            setAuthor(author)
            setLoading(false)
        }
    )
    }, [id])

    if(loading){
        return (
            <Card className="w-full">
            <CardBody className="flex gap-y-4 w-full text-center">
            <Spinner label="Please wait while the post is being loaded" color="primary" labelColor="primary" className="mt-3 mb-3"/>
            </CardBody>
        </Card>
        )
    }

    return(
        <div className='flex flex-col items-center justify-center'>
            <Image src={image} alt={title} width={1080} height={180} className="object-cover rounded-xl"/>
            <Divider className='mt-6 mb-3'/>

            <div className='w-full flex items-center justify-between'>
                <div className='w-[70%]'>
                <h1 className='text-2xl font-bold uppercase'>{title}</h1>
                </div>

                <div>
                    <Link href={`https://wa.me/?text=${encodeURI("View this post on Frame the Vision portal by HSB Secunderabad.%0A%0Ahttps://ftv.hsbsecunderabad.com/vision/${id}")}`}>
                    <Button color='success' className='uppercase'><ShareIcon/>Share</Button>
                    </Link>
                </div>

            </div>
            <Divider className='mt-3 mb-3'/>
            <div className='text-center'>
                This vision has been posted by <strong className='uppercase'>{author}</strong> dated {new Date(date).toLocaleString()}
            </div>

            <div className='mt-6 flex flex-col items-start text-left w-full'>
                <h3 className='text-lg font-bold uppercase'>Description</h3>
                <p className='text-lg mt-2'>{description}</p>
            </div>
        </div>
    )
}

export default Vision