
import Link from 'next/link'
import React from 'react'
import Listings from './Listings'

const Wrapper = () => {
    // getting Listings from backend
    return (
        <div className='w-full flex items-start justify-start gap-10'>
            <div className='w-[10%] border rounded-md  bg-white  p-5'>
                <ul className='w-full flex items-start justify-center flex-col gap-5'>
                    <Link href='/' className='text-md underline'>Profile</Link>
                    <Link href='/' className='text-md underline'>Analytics</Link>
                    <Link href='/' className='text-md underline'>Your Listings</Link>
                </ul>
             </div>
             {/* wrappeing Lisings */}
             <div className='w-[90%] border rounded-md  bg-white  p-5'>
                    <h1 className='text-4xl font-bold'>Your Listings</h1>
                    <div className='mt-5'>
                        <Listings />
                    </div>
             </div>
        </div>
    )
}

export default Wrapper