'use client'
import CompleteAccount from '@/components/CompleteAccount'
import UserLogin from '@/components/LoginComponent'
import { useUser } from '@/lib/auth'
import { app } from '@/lib/firebase'
import { Spinner } from '@nextui-org/spinner'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const [userId, setUserId] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const user = useUser()

    useEffect(() => {
        if (user) {
            setUserId(user.uid)
            setIsLoggedIn(true)
            setLoading(false)
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }, [user])

    if (loading) {
        return <Spinner />
    }
    if (!isLoggedIn) {
        return <UserLogin />
    }

    return (
        <CompleteAccount userId={userId} />
    )
}

export default MyProfile