'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@nextui-org/input";
import { Input } from "@nextui-org/input";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase";
import { AlertCircle, CheckCheckIcon, HomeIcon, Link2, LogOutIcon, TicketIcon, TicketXIcon, UserXIcon, WholeWordIcon } from "lucide-react";
import { Progress } from "@nextui-org/progress";
import { getDatabase, push, ref, set, get } from "firebase/database";
import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import toast from "react-hot-toast";
import { signOut, useUser } from "@/lib/auth";
import UserLogin from "@/components/LoginComponent";
import { Spinner } from "@nextui-org/spinner";
import CompleteAccount from "@/components/CompleteAccount";
import { Separator } from "@/components/ui/separator";
const formSchema = z.object({
    image: z.string().url({
        message: "Please provide a valid URL.",
    }),
    postedOn: z.string(),
    title: z.string(),
    Description: z.string(),
});

const NewPost = () => {
    const end = new Date("2024-05-18T23:59:59").getTime();
    const start = new Date("2024-05-17T09:00:00").getTime();
    const user = useUser();
    const [imageURL, setImageURL] = useState("");
    const [imageReady, setImageReady] = useState(false);
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [shareableUrl, setSharebaleUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [userID, setUserID] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeStatus, setActiveStatus] = useState(false);
    const [hasCredits, setHasCredits] = useState(false);
    const [accountIncomplete, setAccountIncomplete] = useState(false);
    const [userName, setUserName] = useState('');
    const [started, setStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [pageReady, setPageReady] = useState(false);

    async function signUserOut() {
        await signOut().then(() => {
            setLoggedIn(false);
            setHasCredits(false);
            setActiveStatus(false);
            setAccountIncomplete(false);
            setUserName('');
            setUserID('');

        })

    }


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
        setPageReady(true);
    }

    function calculateStartTiming() {
        const now = new Date().getTime();
        const timeDifference = start - now;
        if (timeDifference <= 0) {
            setStarted(true)
        }
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setTimeRemaining({ hours, minutes, seconds });
        setPageReady(true);
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

    useEffect(() => {
        setUserID('');
        setLoggedIn(false);
        setAccountIncomplete(false);
        setActiveStatus(false);
        setHasCredits(false);
        setUserName('');
        let isMounted = false;
        async function checkUser() {
            if (user) {
                setUserID(user.uid);
                setLoggedIn(true);
                const database = getDatabase(app);
                const user_data_node = ref(database, `frame-the-vision/users/${user.uid}`);
                await get(user_data_node).then((snap) => {
                    if (!snap.exists()) {
                        setAccountIncomplete(true);
                        isMounted = true;
                        return;
                    } else {
                        const data = snap.val();
                        const active = data.active;
                        const name = data.name;
                        setUserName(name);
                        if (active) {
                            setActiveStatus(true);
                            const credits = data.credits;
                            if (credits > 0) {
                                setHasCredits(true);
                            }
                            isMounted = true;
                        }
                    }
                }).catch((error) => {
                    console.error(error)
                    toast.error(error.message)
                })
            }
        }

        checkUser().then(() => {
            setTimeout(() => {
                setLoading(false);
            }, 6000)
        })


    }, [user])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: '',
            postedOn: new Date().toISOString(),
            title: '',
            Description: '',
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);
        const imageUrl = values.image;
        const postedOn = values.postedOn;
        const title = values.title;
        const Description = values.Description;

        const database = getDatabase(app);

        const data = {
            author: userID,
            imageUrl: imageUrl,
            postedOn: postedOn,
            name: title,
            Description: Description,
            user: userID,
        }
        const id = Math.random().toString(36).slice(2);
        const postsRef = ref(database, `frame-the-vision/posts/${id}`);
        const userPostRef = ref(database, `frame-the-vision/users/${userID}/posts/${id}`);
        await set(userPostRef, true).then(() => {
            set(postsRef, data).then(() => {
                const shareableURL = `https://ftv.hsbsecunderabad.com/vision/${id}`;
                setSharebaleUrl(shareableURL);
            }).finally(() => {
                setPosted(true);
                setSubmitting(false);
            }).catch((error) => {
                setError(true);
                toast.error(error.message)
            }
            );
        }).finally(() => {
            const userCreditsRef = ref(database, `frame-the-vision/users/${userID}/credits`);
            get(userCreditsRef).then((snap) => {
                const credits = snap.val();
                const newCredits = credits - 1;
                set(userCreditsRef, newCredits);
            }
            )
        })
    }

    const handleImageUpload = async (e: any) => {
        setUploading(true);
        const file = e.target.files[0];
        const storage = getStorage(app);
        const storageRef = sRef(storage, "frame-the-vision");
        const fileRef = sRef(storageRef, file.name);
        const metadata = { contentType: file.type };

        try {
            const snapshot = await uploadBytes(fileRef, file, metadata);
            const url = await getDownloadURL(fileRef);
            setImageURL(url);
            setImageReady(true);
            setUploading(false);
            form.setValue('image', url);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh]">
                <Card className="flex flex-col items-center justify-center">
                    <CardBody className="flex gap-y-4 w-full text-center">
                        <Spinner label="configuring..." color="primary" labelColor="primary" className="mt-3 mb-3" />
                    </CardBody>
                    <Divider />
                    <CardFooter className="max-w-[150px] flex flex-col items-center justify-center text-center">
                        may take few seconds based on your network speed
                    </CardFooter>
                </Card>
            </div>
        )
    }

    if (loggedIn) {
        if (accountIncomplete) {
            return (
                <CompleteAccount userId={userID} />
            )
        }

        if (!accountIncomplete && !activeStatus) {
            return (
                <div className="flex flex-col items-center justify-center w-full h-[60vh]">
                    <Card className="flex flex-col items-center justify-center">
                        <CardHeader className="flex items-center justify-center w-full">
                            <UserXIcon className="text-4xl font-bold" />
                        </CardHeader>
                        <CardBody className="flex flex-col items-center justify-center gap-y-3">
                            <Divider />
                            <Code color="danger" className="flex items-center justify-center">
                                <h1 className="text-lg font-bold">[ERROR_0020]</h1>
                            </Code>
                            <h1 className="text-lg font-bold">Account not active.</h1>
                            <Divider />
                            <Link href={`https://wa.me/7207004751?text=*[ERROR_0020]*%0A%0AI%20want%20to%20get%20my%20*FRAME%20THE%20VISION*%20account%20activated.%20%0A%0A*VISIONARY_ID*%20:%20_${userID}_`}>
                                <Button variant="flat" color="success" className="w-full uppercase font-bold">
                                    Raise Activation Request
                                </Button>
                            </Link>
                            <Button onClick={() => signUserOut()} variant="flat" color="danger" className="w-full uppercase font-bold">
                                LOGOUT <LogOutIcon />
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            )
        }


        if (!accountIncomplete && activeStatus && !hasCredits) {
            return (
                <div className="flex flex-col items-center justify-center w-full h-[60vh]">
                    <Card className="flex flex-col items-center justify-center">
                        <CardHeader className="flex items-center justify-center w-full">
                            <Code color="success" className="flex items-center justify-center">
                                <h1 className="text-lg font-bold">CONGRATULATIONS! 🎉</h1>
                            </Code>
                        </CardHeader>
                        <CardBody className="flex flex-col items-center justify-center gap-y-6 text-center">
                            <Divider />
                            <h1 className="text-lg font-bold">You have already posted your Vision for this competition!</h1>
                            <h1 className="text-red-500 text-lg font-bold">You can only post once.</h1>
                            <Divider />
                            <div className="flex flex-col items-center justify-center gap-y-3 w-full">
                                <Link className="w-full" href={`https://wa.me/7207004751?text=*Need%20help%20regarding*0A%0A*VISIONARY_ID*%20:%20_${userID}_`}>
                                    <Button variant="flat" color="warning" className="w-full uppercase font-bold">
                                        Need Help?
                                    </Button>
                                </Link>
                                <Button onClick={() => signUserOut()} variant="flat" color="danger" className="w-full uppercase font-bold">
                                    LOGOUT <LogOutIcon />
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )
        }

        if (!accountIncomplete && activeStatus && hasCredits) {
            return (
                <section className="flex flex-col items-center justify-center w-full">
                    <Link href="/" className="flex items-center gap-2 text-primary">
                        <Button color="default" variant="flat" className="w-full mb-3 max-w-[400px]" href="/"><HomeIcon />return to Homepage</Button>
                    </Link>
                    {
                        started ? (
                            <Card className="max-w-[450px]">
                                <CardHeader>
                                    <h4 className="font-bold text-large uppercase">POST MY VISION</h4>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="postedOn"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Posted On</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={new Date().toISOString()} {...field} disabled={true} readOnly={true} isRequired />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Post Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder='Initiative by HSB Secunderabad' {...field} isRequired />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="Description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Post Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                isRequired
                                                                labelPlacement="outside"
                                                                placeholder="Enter your description"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="image-upload-form flex flex-col">
                                                <label htmlFor="image-upload">Select image (Upload will begin immediately )</label>
                                                <br />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="image-upload"
                                                    id="image-upload"
                                                    onInput={handleImageUpload}
                                                    required
                                                    disabled={uploading}
                                                />
                                            </div>

                                            {
                                                uploading ? (
                                                    <Progress
                                                        size="sm"
                                                        isIndeterminate
                                                        aria-label="uploading..."
                                                    />
                                                )
                                                    :
                                                    imageReady ? (
                                                        <p>Image Uploaded</p>
                                                    )
                                                        :
                                                        (
                                                            ''
                                                        )
                                            }

                                            <FormField
                                                control={form.control}
                                                name="image"
                                                defaultValue={imageURL}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Image URL</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={imageURL} {...field} disabled isRequired isReadOnly />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {
                                                imageReady ? (
                                                    submitting ? (
                                                        <Button variant="flat" color="success" className="w-full" isDisabled isLoading>posting...</Button>
                                                    )
                                                        :
                                                        posted ? (
                                                            <Button color="success" variant="flat" className="w-full" isDisabled><CheckCheckIcon className="mr-1" />Posted</Button>
                                                        )
                                                            :
                                                            <Button type="submit" className="w-full">Submit</Button>
                                                )
                                                    :
                                                    (
                                                        <Button variant="flat" color="danger" className="w-full" isDisabled>Please upload an image</Button>
                                                    )
                                            }
                                        </form>
                                    </Form>
                                </CardBody>
                                {
                                    posted && (
                                        <CardFooter className="flex flex-col items-center justify-center w-full">
                                            <Code color="success" className="flex flex-col items-center justify-center">
                                                <Link href={shareableUrl} isExternal>
                                                    <Link2 className="mr-1" /> View Post
                                                </Link>
                                            </Code>
                                        </CardFooter>
                                    )
                                }

                            </Card>
                        )
                            :
                            pageReady && (
                                <div className="mb-3">
                                    {(new Date().getTime() < end) ? (
                                        <Card className="w-full">
                                            <CardHeader className="flex flex-col items-center justify-center">
                                                <h3 className="flex items-center text-red-600 font-bold">
                                                    <AlertCircle className="mr-3" /> {
                                                        started ? `
                                            Test Competition is live! 🎉
                                            `
                                                            :
                                                            `
                                            TEST COMPETITION WILL START SOON! 🕰️
                                            `
                                                    }
                                                </h3>
                                            </CardHeader>
                                            <Divider />
                                            <CardBody className="flex gap-y-3 w-full text-center">
                                                <Separator className="w-full" />
                                                <h4 className="text-center text-xl font-bold text-primary-500">{formatTime(timeRemaining.hours)} Hours {formatTime(timeRemaining.minutes)} Minutes {formatTime(timeRemaining.seconds)} Seconds</h4>
                                                <Separator className="w-full" />
                                            </CardBody>
                                        </Card>
                                    ) : (
                                        <Card className="w-full">
                                            <CardBody className="flex gap-y-4 w-full text-center">
                                                <Separator className="w-full" />
                                                <h3 className="text-center text-xl font-bold text-primary-500">🎉 The competition has ended! 🎉</h3>
                                                <Separator className="w-full" />
                                            </CardBody>
                                        </Card>
                                    )}
                                </div>
                            )

                    }
                </section>
            )
        }



    }

    if (!loggedIn) {
        return (
            <section className="flex flex-col items-center justify-center h-[75vh]">
                <UserLogin />
            </section>
        )
    };
}

export default NewPost;
