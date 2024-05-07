'use client'
import { app } from "@/lib/firebase";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { get, getDatabase, ref } from "firebase/database";
import { ReactElement, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@nextui-org/spinner";
import { Divider } from "@nextui-org/divider";
import toast from "react-hot-toast";

export default function Home() {
	const [postsArea, setPostsArea] = useState<ReactElement<any>[]>()
	const [loading, setLoading] = useState(true)
	const database = getDatabase(app)
	const postsNode = ref(database, 'frame-the-vision/posts')
	get(postsNode).then((snap) => {
		var posts = [];
		const allPosts = snap.val()

		for (const postId in allPosts) {
			const title = allPosts[postId].name;
			const description = allPosts[postId].Description;
			const image = allPosts[postId].imageUrl;
			const date = allPosts[postId].postedOn;
			const author = allPosts[postId].author;

			posts.push(
				<Card className="py-4 w-[400px]" key={postId}>
				<CardHeader className="overflow-visible py-2 flex flex-col items-center justify-center">
				<Image
						alt={postId}
						className="object-cover rounded-xl"
						src={image}
						width={1080}
						height={180}
					/>
				</CardHeader>
				<CardBody className="pb-0 pt-2 px-4 flex-col items-start">
					
					<h4 className="font-bold text-large uppercase mb-3">{title}</h4>
					<p className="text-tiny font-bold">{description}</p>
				<Divider className="mt-3 mb-3"/>
				<div className="flex items-center justify-between w-full">
					<small className="text-default-500">
						By: {author}
					</small>
					<span>
						|
					</span>
					<small className="text-default-500">
						{new Date(date).toLocaleString()}
					</small>
				</div>
				</CardBody>
			</Card>
			)
		}
		setPostsArea(posts)
		setLoading(false)
	}).catch((error) => {
		console.error(error)
		toast.error(error.message)
	}
	)
	if(loading){
		return(
			<Card className="w-full">
				<CardBody className="flex gap-y-4 w-full">
				<Spinner label="Please wait while the posts are being loaded" color="primary" labelColor="primary" className="mt-3 mb-3"/>
				</CardBody>
			</Card>
		)
	}
		return (
			<section className="flex items-center justify-around flex-wrap gap-y-3">
				{postsArea}
			</section>
		);
}
