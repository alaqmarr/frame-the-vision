'use client'
import { app } from "@/lib/firebase";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { get, getDatabase, ref, orderByChild, query, set, onValue, DatabaseReference } from "firebase/database";
import { ReactElement, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@nextui-org/spinner";
import { Divider } from "@nextui-org/divider";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useUser } from "@/lib/auth";
import { Code } from "@nextui-org/code";

export default function ExamplePosts() {
    const router = useRouter()
    const [postsArea, setPostsArea] = useState<ReactElement<any>[]>()
    const [loading, setLoading] = useState(true)
    const [totalPosts, setTotalPosts] = useState(0)
    const [error, setError] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const end = new Date("2024-06-06T23:59:59").getTime();
    const start = new Date("2024-06-15T23:59:59").getTime();
    const [pageReady, setPageReady] = useState(false)
    const [started, setStarted] = useState(false)
    const [userId, setUserId] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const user = useUser();
    useEffect(() => {
        if (user) {
            setUserId(user.uid)
            setLoggedIn(true)
        }
    }, [user])
    useEffect(() => {
        let timerId = setTimeout(() => {
            setError(true);
            setLoading(false);
            toast.error("Timeout: Data fetching took too long.");
        }, 5000);

        const database = getDatabase(app);
        const postsNode = ref(database, 'frame-the-vision/examplePosts')

        const handlePostsFetch = async () => {
            try {
                const snap = await get(postsNode);
                clearTimeout(timerId);
                const allPosts = snap.val();
                if (!allPosts) {
                    setLoading(false);
                    setPageReady(true);
                    return;
                }

                var posts = [];
                var total = 0;

                for (const postId in allPosts) {
                    total++;
                    const post = allPosts[postId];
                    const { name: title, Description: description, imageUrl: image, postedOn: date, author } = post;
                    const likedCounterNode = ref(database, `frame-the-vision/examplePosts/${postId}/likedCounter`);

                    posts.push(
                        <Card className="py-4 w-[400px]" isHoverable key={postId} id={postId}>
                            <Link href={`example-vision/${postId}`}>
                                <CardHeader className="overflow-visible py-2 flex flex-col items-center justify-center">
                                    <Image
                                        alt={postId}
                                        className="object-cover rounded-xl h-auto"
                                        src={image}
                                        width={1080}
                                        height={540}
                                    />
                                </CardHeader>
                                <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
                                    <h4 className="font-bold text-large uppercase mb-3">{title}
                                        <br /> <small className="text-default-400 text-xs">
                                            By <strong>{author}</strong>
                                        </small></h4>
                                    <Code color="danger" className="font-bold mb-3" radius="lg">
                                        {
                                            <RealTimeLikeCounter likedCounterNode={likedCounterNode} />
                                        }
                                    </Code>
                                    <p className="text-tiny font-bold ">{description.length > 60 ? (description.substring(0, 60) + '... READ MORE') : (description)}</p>
                                    <Divider className="mt-3 mb-3" />
                                    <div className="flex flex-row items-center justify-between text-left w-full">
                                        <small className="text-default-500">
                                            {new Date(date).toLocaleString()}
                                        </small>
                                    </div>
                                </CardBody>
                            </Link>
                        </Card>
                    );
                }

                posts.reverse();
                setPostsArea(posts);
                setLoading(false);
                setTotalPosts(total);
                setPageReady(true);
            } catch (error: any) {
                clearTimeout(timerId);
                setError(true);
                setLoading(false);
                console.error(error);
                toast.error(error.message);
            }
        };

        handlePostsFetch();

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    const RealTimeLikeCounter = ({ likedCounterNode }: { likedCounterNode: DatabaseReference }) => {
        const [likeCounter, setLikeCounter] = useState(0);

        useEffect(() => {
            const unsubscribe = onValue(likedCounterNode, (snap) => {
                const data = snap.val();
                if (data) {
                    setLikeCounter(data);
                }
            });

            return () => {
                unsubscribe();
            };
        }, [likedCounterNode]);

        return (
            <>
                {
                    likeCounter > 0 ? (
                        `❤ ${likeCounter}`
                    ) : (
                        `No likes yet!`
                    )
                }
            </>
        );
    };

    // Function to format time
    function formatTime(time: any) {
        return time.toString().padStart(2, '0');
    }

    // Function to calculate time remaining
    function calculateTimeRemaining() {
        const now = new Date().getTime();
        const timeDifference = end - now;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setTimeRemaining({ hours, minutes, seconds });
    }

    function calculateStartTiming() {
        const now = new Date().getTime();
        const timeDifference = start - now;
        if (timeDifference <= 0) {
            setStarted(true)
        }
        if (started) {
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            setTimeRemaining({ hours, minutes, seconds });
        }
    }

    useEffect(() => {
        const calculate = () => {
            if (started) {
                calculateTimeRemaining();
            } else {
                calculateStartTiming();
            }
        };

        calculate();

        const interval = setInterval(calculate, 1000);

        return () => clearInterval(interval);
    }, [started]);

    if (loading) {
        return (
            <Card className="w-full">
                <CardBody className="flex gap-y-4 w-full">
                    <Spinner label="loading example posts" color="primary" labelColor="primary" className="mt-3 mb-3" />
                </CardBody>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="w-full flex flex-col items-center justify-center text-center">
                <CardBody className="flex gap-y-4 w-full flex flex-col items-center justify-center text-center">
                    <h2 className="text-center text-xl font-bold text-red-500">An error occurred while fetching the posts</h2>
                    <Divider />
                    <p>Please reload the page and try again.</p>
                </CardBody>
            </Card>
        )
    }

    return (
        <>
            <section className="flex items-center justify-around flex-wrap gap-y-3 mb-3">
                {postsArea}
            </section>
            <Divider className="mt-1 mb-5" />
            {
                totalPosts === 0 ? (
                    <Card className="w-full">
                        <CardBody className="flex gap-y-4 w-full text-center">
                            <h2 className="text-center text-xl font-bold text-red-500">No example posts available!</h2>
                        </CardBody>
                    </Card>
                )
                    :
                    (
                        <Card className="w-full">
                            <CardBody className="flex gap-y-4 w-full text-center">
                                <h2 className="text-center text-xl font-bold text-primary-500">Total posts: {totalPosts}</h2>
                                <Divider />
                                <p>You&apos;ve seen all example posts.</p>
                            </CardBody>
                        </Card>
                    )
            }
        </>
    );
}