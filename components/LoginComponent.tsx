"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@nextui-org/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth"
import toast, { LoaderIcon } from "react-hot-toast"
import { useState } from "react"
import Link from "next/link"
import { Divider } from "@nextui-org/divider"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
const UserLogin = () => {
    const [formDisabled, setFormDisabled] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setFormDisabled(true)
        try {
            signIn(values.email, values.password)
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    return (
        <section className="flex flex-col items-center justify-center w-full">
            <Card className="max-w-[380px] min-w-[300px]">
            <CardHeader>
                <Label className="text-2xl font-bold">Login</Label>
            </CardHeader>
            <Divider/>
            <CardBody className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="hsbsecunderabad@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be your default Email Address!
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            formDisabled ? <Button color='default' className="w-full" disabled={true}><LoaderIcon className="mr-3"/>authenticating</Button>
                            :
                            <Button type="submit" color='primary' className="w-full">Login</Button>
                        }
                    </form>
                </Form>
            </CardBody>
            <CardFooter>
                <Link href={'/register'} className="w-full">
                <Button color="primary" variant={'flat'} className="w-full">
                    Not Enrolled? Enroll Now!
                </Button>
                </Link>
            </CardFooter>
        </Card>
        </section>
    )
}

export default UserLogin