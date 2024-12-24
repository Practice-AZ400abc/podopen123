
import Link from 'next/link'
import React from 'react'
import Listings from './Listings'
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { Filter } from 'lucide-react';
const Wrapper = () => {
    // getting Listings from backend
    return (
        <div className='w-full flex items-start justify-start gap-10'>
            <div className='w-[10%] border rounded-md  bg-white  p-5'>
                <ul className='w-full flex items-start justify-center flex-col gap-5'>
                    <Link href='/profile' className='text-md underline'>Profile</Link>
                    <Link href='/' className='text-md underline'>Analytics</Link>
                    <Link href='/' className='text-md underline'>Your Listings</Link>
                </ul>
            </div>
            {/* wrappeing Lisings */}
            <div className='w-[90%] border rounded-md  bg-white  p-5'>
                <div className='flex items-start justify-between'>
                    <h1 className='text-4xl font-bold'>Your Listings</h1>
                    <div className='w-[200px]'>
                        <Select>
                            <SelectTrigger className="h-12">
                                <div className="flex items-center gap-2">
                                    <Filter />
                                    <SelectValue
                                        className="text-lg font-bold"
                                        value={null} // Ensure no value is selected initially
                                        placeholder="Status"
                                    />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">
                                    Active
                                </SelectItem>
                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>
                                <SelectItem value="pending">
                                    Pending
                                </SelectItem>
                                <SelectItem value="sold_expired">
                                    Sold / Expired
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* Listings */}
                <div className='mt-5'>
                    <Listings />
                </div>
            </div>
        </div>
    )
}

export default Wrapper