"use client"

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
import { signIn } from "@/lib/auth"
import toast, { LoaderIcon } from "react-hot-toast"
import { useState } from "react"
import { getDatabase, ref, set } from "firebase/database"
import { app } from "@/lib/firebase"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(3),
    mobile: z.string(),
    its: z.string().min(8).max(8)

})

const CompleteAccount = ({ userId }: { userId: string }) => {
    const router = useRouter()
    const [formDisabled, setFormDisabled] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            mobile: "",
            its: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setFormDisabled(true)
        const db = getDatabase(app)
        const data = {
            name: values.name,
            mobile: values.mobile,
            its: values.its,
            active: false,
            credits: 0
        }

        const userDataNode = ref(db, `frame-the-vision/users/${userId}`)
        set(userDataNode, data).then(() => {
            toast.success("Profile Updated!")
        }).finally(() => {
            window.location.reload()
        }).catch((error: any) => {
            toast.error(error.message)
        })

    }
    return (
        <section className="flex flex-col items-center justify-center w-full">
            <Card className="max-w-[450px] min-w-[350px] shadow-lg">
                <CardHeader>
                    <Label className="text-2xl font-bold">Complete your profile</Label>
                </CardHeader>
                <CardBody className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="HSB Secunderabad" {...field} />
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
                                        <FormLabel>WhatsApp Number [Including Country Code]</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+919618443558" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="its"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ITS Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="01010101" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {
                                formDisabled ? <Button variant={'default'} className="w-full" disabled={true}><LoaderIcon className="mr-3" />processing</Button>
                                    :
                                    <Button type="submit" variant={'default'} className="w-full">Update Account Details</Button>
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

export default CompleteAccount