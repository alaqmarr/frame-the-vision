import React from 'react'
import { get, getDatabase, ref } from 'firebase/database'
import { app } from "@/lib/firebase";


const SSR = () => {
    let data:any = [];
    const database = getDatabase(app)
    const node = ref(database, 'frame-the-vision/posts')
    get(node).then((snapshot) => {
        const posts = snapshot.val()
        for (const post in posts) {
            const title = posts[post].name
            const description = posts[post].Description
            const image = posts[post].imageUrl
            const author = posts[post].author
            const date = posts[post].postedOn

            data.push(
                <div>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <img src={image} alt={title} />
                    <p>Author: {author}</p>
                    <p>Date: {date}</p>
                </div>
            )
        }
    })
  return (
    <div>
        {data}
    </div>
  )
}

export default SSR