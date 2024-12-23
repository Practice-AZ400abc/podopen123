import { Button } from '@/components/ui/button'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'

const manageListing = () => {
    const Firstname = "faizan"
    return (
        <div className='mx-auto px-3 container mt-10 flex items-center justify-between'>
            <h1 className='text-4xl font-bold'>Welcome! <span className='text-blue-400'>{Firstname}</span></h1>

            <Sheet>
                <SheetTrigger className="btn p-3 rounded-sm bg-black font-bold text-white" variant="ghost">
                    Create a Listing
                </SheetTrigger>
                <SheetContent className="h-[90vh] bg-white" side={"bottom"}>
                    <div className='h-full flex flex-col md:flex-row items-center justify-center gap-20 max-w-[900px] mx-auto'>
                        <div className='flex flex-col md:flex-row'>
                            <h1 className='text-4xl'>It's easy to get started<br /> with <span className='text-blue-400 font-bold'>Lookvisa</span> </h1>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-lg'><span className='bg-blue-400 p-2 text-white rounded-full'>1</span> - Tell us about your listing</h1>
                                <hr />

                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-lg'><span className='bg-blue-400 p-2 text-white rounded-full'>2</span> - Make it stand out </h1>
                                <hr />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-lg'><span className='bg-blue-400 p-2 text-white rounded-full'>3</span> - Finish up preview, pay
                                    and publish</h1>
                                <hr />

                            </div>
                            <div className='flex items-end justify-end w-full'>
                                <Link href={"/create-listing"} className='bg-black p-2 text-white rounded-md hover:bg-gray-900'>Get Started</Link>
                            </div>
                        </div>
                    </div>

                </SheetContent>
            </Sheet>

        </div>
    )
}

export default manageListing
