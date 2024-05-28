import { Button } from '@nextui-org/button'
import { ArrowBigLeftDash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Posts = () => {
  return (
    <div>
        <div className='flex flex-col'>
                <Link href="/organisers-dashboard" className='mb-3'>
                    <Button
                        color="primary"
                        variant="flat"
                    >
                        <ArrowBigLeftDash/> Back to Dashboard
                    </Button>
                </Link>
                </div>
    </div>
  )
}

export default Posts