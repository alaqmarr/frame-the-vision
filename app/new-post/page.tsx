'use client'

import { useState } from "react";
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
import { CheckCheckIcon, HomeIcon, Link2, TicketIcon, WholeWordIcon } from "lucide-react";
import { Progress } from "@nextui-org/progress";
import { getDatabase, push, ref, set } from "firebase/database";
import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import toast from "react-hot-toast";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    image: z.string().url({
        message: "Please provide a valid URL.",
    }),
    postedOn: z.string(),
    title: z.string(),
    Description: z.string(),
    email: z.string().email({
        message: "Please provide a valid email.",
    }),
    mobile: z.string().min(10, {
        message: "Please provide a valid mobile number.",
    }).max(10, {
        message: "Please provide a valid mobile number.",
    }),

});

const NewPost = () => {
    const [imageURL, setImageURL] = useState("");
    const [imageReady, setImageReady] = useState(false);
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [shareableUrl, setSharebaleUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            image: '',
            postedOn: new Date().toISOString(),
            title: '',
            Description: '',
            email: '',
            mobile: '',
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);
        const author = values.username;
        const imageUrl = values.image;
        const postedOn = values.postedOn;
        const title = values.title;
        const Description = values.Description;
        const email = values.email;
        const mobile = values.mobile;
        const user = values.username;

        const database = getDatabase(app);

        const data = {
            author: author,
            imageUrl: imageUrl,
            postedOn: postedOn,
            name: title,
            Description: Description,
            email: email,
            mobile: mobile,
            user: user,
        }

        //generate 16 digit alphanumeric id
        const id = Math.random().toString(36).slice(2);
        const postsRef = ref(database, `frame-the-vision/posts/${id}`);
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

    return (
        <>
        <Link href="/" className="flex items-center gap-2 text-primary">
        <Button color="default" variant="flat" className="w-full mb-3 max-w-[400px]" href="/"><HomeIcon/>return to Homepage</Button>
        </Link>
            <Card className="max-w-[400px]">
                <CardHeader>
                    <h4 className="font-bold text-large uppercase">POST MY VISION</h4>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Please enter your name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="HSB Secunderabad" {...field} isRequired />
                                        </FormControl>
                                        <FormDescription>
                                            This will be visible on your post.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primary Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                isRequired
                                                placeholder="hsbsecunderabad@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WhatsApp Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                inputMode="numeric"
                                                isRequired
                                                placeholder="7207004752"
                                                {...field}
                                                minLength={10}
                                                maxLength={10}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                <Link2 className="mr-1"/> View Post
                                </Link>
                            </Code>
                        </CardFooter>
                    )
                }

            </Card>
        </>
    );
};

export default NewPost;
