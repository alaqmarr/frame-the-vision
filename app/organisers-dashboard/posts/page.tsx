'use client'
import { app } from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { get, getDatabase, ref, remove, set } from 'firebase/database'
import { ArchiveIcon, ArrowBigLeftDash, DeleteIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Posts = () => {
  const [posts, setPosts] = useState<ReactElement<any>[]>()
  const db = getDatabase(app)
  const deletePost = (postId: any) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const postRef = ref(db, `frame-the-vision/posts/${postId}`)
      remove(postRef).then(() => {
        getPosts()
      }).finally(() => {
        toast.success('Post deleted successfully')
      })
    }
  }

  const archivePost = (postId: any) => {
    if (confirm('Are you sure you want to archive this post?')) {
      const postRef = ref(db, `frame-the-vision/posts/${postId}`)
      get(postRef).then((snap) => {
        const post = snap.val()
        const archiveRef = ref(db, `frame-the-vision/archived/${postId}`)
        set(archiveRef, post).then(() => {
          const postRef = ref(db, `frame-the-vision/posts/${postId}`)
          remove(postRef).then(() => {
            getPosts()
          }).finally(() => {
            toast.success('Post archived successfully')
          }
          )
        })
      })
    }
  }

  const getPosts = async () => {
    setPosts([])
    const postsRef = ref(db, 'frame-the-vision/posts')
    let postsBlock = []

    get(postsRef).then((snap) => {
      const allPosts = snap.val()

      for (const post in allPosts) {
        const desc = allPosts[post].Description
        postsBlock.push(
          <Card className='w-[350px] flex flex-col items-center justify-center mb-3'>
            <CardHeader>
              <Image src={allPosts[post].imageUrl} alt={allPosts[post].author} />
            </CardHeader>
            <CardBody>
              <h3>
                {allPosts[post].name}
              </h3>
              <p className='text-sm' dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br>') }} />
            </CardBody>
            <CardFooter className='w-full flex items-center justify-evenly flex-wrap'>
              <Button
                color="danger"
                onClick={() => deletePost(post)}
              >
                <Trash2Icon />
                Delete
              </Button>

              <Button
                color="warning"
                onClick={() => archivePost(post)}
              >
                <ArchiveIcon />
                Archive
              </Button>
            </CardFooter>
          </Card>
        )
      }

      setPosts(postsBlock)

    })
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div>
      <div className='flex flex-col'>
        <Link href="/organisers-dashboard" className='mb-3'>
          <Button
            color="primary"
            variant="flat"
          >
            <ArrowBigLeftDash /> Back to Dashboard
          </Button>
        </Link>
      </div>
      <div className='flex flex-row justify-evenly flex-wrap items-center'>
        {posts}
      </div>
    </div>
  )
}

export default Posts