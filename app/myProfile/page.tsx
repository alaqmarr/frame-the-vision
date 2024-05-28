'use client'
import CompleteAccount from '@/components/CompleteAccount'
import { useUser } from '@/lib/auth'
import { app } from '@/lib/firebase'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const [userId, setUserId] = useState('')
    const user = useUser()

    useEffect(() => {
        if (user) {
            setUserId(user.uid)
        }
    }, [user])
    return (
        <CompleteAccount userId={userId} />
    )
}

export default MyProfile