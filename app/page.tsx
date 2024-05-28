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
import { usePathname, useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useUser } from "@/lib/auth";
import { Code } from "@nextui-org/code";

export default function Home() {
    const router = useRouter();
    const updateAnalytics = async () => {
        const database = getDatabase(app);
        const path = window.location.pathname
        const analyticsRef = ref(database, `frame-the-vision/analytics/home`);
        const snapshot = await get(analyticsRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            set(analyticsRef, data + 1);
        } else {
            set(analyticsRef, 1);
        }

    }

    useEffect(() => {
        updateAnalytics();
    }, []);
    const [loading, setLoading] = useState(true);
    const [totalPosts, setTotalPosts] = useState(0);
    const [error, setError] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const end = new Date("2024-06-15T23:59:59").getTime();
    const start = new Date("2024-06-06T23:59:59").getTime();
    const [pageReady, setPageReady] = useState(false);
    const [started, setStarted] = useState(false);
    const [userId, setUserId] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const user = useUser();
    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            setLoggedIn(true);
        }
    }, [user]);

    function formatTime(time: any) {
        return time.toString().padStart(2, '0');
    }

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
            setStarted(true);
            calculateTimeRemaining();
        } else {
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            setTimeRemaining({ hours, minutes, seconds });
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (started) {
                calculateTimeRemaining();
            } else {
                calculateStartTiming();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [started]);

    useEffect(() => {
        calculateStartTiming();
        setLoading(false);
        setPageReady(true);
    }, []);

    if (loading) {
        return (
            <Card className="w-full">
                <CardBody className="flex gap-y-4 w-full">
                    <Spinner color="primary" labelColor="primary" className="mt-3 mb-3" />
                </CardBody>
            </Card>
        );
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
        );
    }

    return (
        <>
            {pageReady && (
                <div className="mb-3 flex flex-col h-[500px] items-center justify-center">
                    <Card className="w-full">
                        <CardHeader className="flex flex-col items-center justify-center">
                            <h3 className="flex items-center text-red-600 font-bold">
                                <AlertCircle className="mr-3" />
                                {started ? `Frame the Vision Competition is live! 🎉` : `FRAME THE VISION COMPETITION WILL BEGIN ON 7th JULY, 2024.! 🕰️`}
                            </h3>
                        </CardHeader>
                        <Divider />
                        <CardBody className="flex gap-y-3 w-full text-center">
                            <Separator className="w-full" />
                            <h4 className="text-center text-xl font-bold text-primary-500">
                                {formatTime(timeRemaining.hours)} Hours {formatTime(timeRemaining.minutes)} Minutes {formatTime(timeRemaining.seconds)} Seconds
                            </h4>
                            <Separator className="w-full" />
                            <h1 className="font-bold uppercase text-blue-800">
                                In Frame the Vision, the stage is set for photographers and wordsmiths to collide, crafting tales that linger in the mind long after the image fades.
                                We all together join pens & lense to pay tribute to the profound legacy of Imam Hussain A.S.

                                Will your entry unveil the untold, leaving audiences on the edge of their seats?
                            </h1>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    );
}
