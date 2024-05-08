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

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const Register = () => {
    const [loading, setLoading] = useState(true)
    const user = useUser()
    const router = useRouter()
    useEffect(() => {
        if (user) {
            router.push('/')
        }else{
            setLoading(false)
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
    if(loading){
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
}

export default Register