'use client'
import { app } from "@/lib/firebase";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { get, getDatabase, ref } from "firebase/database";
import { ReactElement, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@nextui-org/spinner";
import { Divider } from "@nextui-org/divider";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function Home() {
    const router = useRouter()
    const [postsArea, setPostsArea] = useState<ReactElement<any>[]>()
    const [loading, setLoading] = useState(true)
    const [totalPosts, setTotalPosts] = useState(0)
    const [error, setError] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState({hours: 0, minutes: 0, seconds: 0});
    const end = new Date("2024-05-12T23:59:59").getTime();
	const [pageReady, setPageReady] = useState(false)

    useEffect(() => {
        let timerId = setTimeout(() => {
            setError(true);
            setLoading(false);
            toast.error("Timeout: Data fetching took too long.");
        }, 5000);
    
        const database = getDatabase(app);
        const postsNode = ref(database, 'frame-the-vision/posts');
    
        get(postsNode)
            .then((snap) => {
                clearTimeout(timerId)
                var posts = [];
                const allPosts = snap.val();
                var total = 0;
                for (const postId in allPosts) {
                    total++;
                    const title = allPosts[postId].name;
                    const description = allPosts[postId].Description;
                    const image = allPosts[postId].imageUrl;
                    const date = allPosts[postId].postedOn;
                    const author = allPosts[postId].author;
    
                    posts.push(
                        <Card className="py-4 w-[400px]" isHoverable key={postId} id={postId}>
                            <Link href={`/vision/${postId}`}>
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
                                    <h4 className="font-bold text-large uppercase mb-3">{title}
                                        <br/> <small className="text-default-400 text-xs">
                                            By <strong>{author}</strong>
                                        </small></h4>
                                    <p className="text-tiny font-bold ">{description.length > 60 ? (description.substring(0, 60)+'... READ MORE') : (description)}</p>
                                    <Divider className="mt-3 mb-3"/>
                                    <div className="flex flex-col items-left justify-center text-left w-full">
                                        <small className="text-default-500">
                                            {new Date(date).toLocaleString()}
                                        </small>
                                    </div>
                                </CardBody>
                            </Link>
                        </Card>
                    );
                }
                setPostsArea(posts);
                setLoading(false);
                setTotalPosts(total);
                setPageReady(true);
            })
            .catch((error) => {
                clearTimeout(timerId)
                setError(true);
                setLoading(false);
                console.error(error);
                console.error(error.message);
                toast.error(error.message);
            });
    
        return () => {
            clearTimeout(timerId);
        };
    }, []);
    
    
    // Function to format time
    function formatTime(time:any) {
        return time.toString().padStart(2, '0');
    }
    
    // Function to calculate time remaining
    function calculateTimeRemaining() {
        const now = new Date().getTime();
        const timeDifference = end - now;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setTimeRemaining({hours, minutes, seconds});
    }

    useEffect(() => {
        calculateTimeRemaining();
        const interval = setInterval(() => {
            calculateTimeRemaining();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

	if(loading){
		return(
			<Card className="w-full">
				<CardBody className="flex gap-y-4 w-full">
				<Spinner label="Please wait while the posts are being loaded" color="primary" labelColor="primary" className="mt-3 mb-3"/>
				</CardBody>
			</Card>
		)
	}

    if(error){
        return(
            <Card className="w-full flex flex-col items-center justify-center text-center">
                <CardBody className="flex gap-y-4 w-full flex flex-col items-center justify-center text-center">
                    <h2 className="text-center text-xl font-bold text-red-500">An error occurred while fetching the posts</h2>
                    <Divider/>
                    <p>Please reload the page and try again.</p>
                </CardBody>
            </Card>
        )
    }
    
    return (
        <>
            {
				pageReady && (
					<div className="mb-3">
                {(new Date().getTime() < end) ? (
                    <Card className="w-full">
						<CardHeader className="flex flex-col items-center justify-center">
							<h3 className="flex items-center text-red-600 font-bold">
								<AlertCircle className="mr-3"/>Testing functional till 12th May 2024!
							</h3>
						</CardHeader>
						<Divider/>
                        <CardBody className="flex gap-y-3 w-full text-center">
                            <Separator className="w-full"/>
                            <h4 className="text-center text-xl font-bold text-primary-500">{formatTime(timeRemaining.hours)} Hours {formatTime(timeRemaining.minutes)} Minutes {formatTime(timeRemaining.seconds)} Seconds</h4>
							{totalPosts} people have already participated! 🎉
                            <Separator className="w-full"/>
                        </CardBody>
                    </Card>
                ) : (
                    <Card className="w-full">
                        <CardBody className="flex gap-y-4 w-full text-center">
                            <Separator className="w-full"/>
                            <h3 className="text-center text-xl font-bold text-primary-500">🎉 The competition has ended! 🎉</h3>
							{totalPosts} people have already participated! 🎉
                            <Separator className="w-full"/>
                        </CardBody>
                    </Card>
                )}
            </div>
				)
			}
            <section className="flex items-center justify-around flex-wrap gap-y-3 mb-3">
                {postsArea}
            </section>
            <Divider className="mt-1 mb-5"/>
            {
                totalPosts === 0 ? (
                    <Card className="w-full">
                        <CardBody className="flex gap-y-4 w-full text-center">
                            <h2 className="text-center text-xl font-bold text-red-500">No posts available at the moment</h2>
                            <Divider/>
                            <p>Be the First one to post!</p>
                        </CardBody>
                    </Card>
                )
                :
                (
                    <Card className="w-full">
                        <CardBody className="flex gap-y-4 w-full text-center">
                            <h2 className="text-center text-xl font-bold text-primary-500">Total posts: {totalPosts}</h2>
                            <Divider/>
                            <p>You&apos;ve reached the end, No more posts available.</p>
                        </CardBody>
                    </Card>
                )
            }
        </>
    );
}
