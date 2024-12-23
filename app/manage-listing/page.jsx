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

const manageListing = () => {
    const Firstname = "faizan"
    return (
        <div className='mx-auto px-3 container mt-10 flex items-center justify-between'>
            <h1 className='text-4xl font-bold'>Welcome! <span className='text-blue-400'>{Firstname}</span></h1>

            <Sheet>
                <SheetTrigger>
                    <Button className="bg-black font-bold text-white" variant="ghost">Create a Listing</Button>
                </SheetTrigger>
                <SheetContent className="h-[90vh] bg-white" side={"bottom"}>
                    <div className='h-full flex flex-col md:flex-row items-center justify-center gap-20 max-w-[900px] mx-auto'>
                        <div className='flex flex-col md:flex-row'>
                            <h1 className='text-4xl'>It's easy to get started<br /> with <span className='text-blue-400 font-bold'>Lookvisa</span> </h1>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-lg'>1 - Tell us about your listing</h1>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-lg'>2 - Make it stand out </h1>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-lg'>3 - Finish up preview, pay
                                    and publish</h1>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default manageListing
