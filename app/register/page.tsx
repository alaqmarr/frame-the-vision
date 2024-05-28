"use client"
import React, { useEffect } from 'react'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { signIn, useUser } from "@/lib/auth"
import toast, { LoaderIcon } from "react-hot-toast"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '@/lib/firebase'
import { Spinner } from '@nextui-org/spinner'
import { Divider } from '@nextui-org/divider'
import { get, getDatabase, ref, set } from 'firebase/database'
import { updateAnalytics } from '@/lib/analytics'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const Register = () => {
    const [loading, setLoading] = useState(true)
    const [signUpEligible, setSignUpEligible] = useState(false)
    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        updateAnalytics();
    }, []);
    useEffect(() => {
        if (user) {
            router.push('/')
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 4000)
            setSignUpEligible(true)
        }
    }, [user])


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
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
            const user = userCredential.user
            toast.success(`Welcome ${user?.email}`)
            router.push('/')
        }
        ).catch((error) => {
            toast.error(error.message)
            setFormDisabled(false)
        })

    }
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh]">
                <Card>
                    <CardBody className="flex gap-y-4 w-full text-center">
                        <Spinner color="primary" />
                    </CardBody>
                </Card>
            </div>
        )
    }

    if (signUpEligible) {
        return (
            <section className="flex flex-col items-center justify-center w-full">
                <Card className="max-w-[380px] min-w-[300px]">
                    <CardHeader>
                        <Label className="text-2xl font-bold">Create Account</Label>
                    </CardHeader>
                    <Divider />
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
                                    formDisabled ? <Button variant={'default'} className="w-full" disabled={true}><LoaderIcon className="mr-3" />processing</Button>
                                        :
                                        <Button type="submit" variant={'default'} className="w-full">Create Account</Button>
                                }
                            </form>
                        </Form>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </section>
        )
    }
}

export default Register