import React from 'react'

import { COUNTRIES, INDUSTRIES } from "@/lib/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import SearchListing from '@/components/SearchListing';
const ProjectsSearch = () => {
    return (
        <div className='flex justify-center flex-col items-center gap-2 w-full'>
            <div className='mx-auto rounded-lg w-[90%] bg-gray-50 mt-10 h-screen p-2  gap-4 flex items-start'>
               <div className='w-full mt-4 flex justify-between gap-4 flex-wrap'>
                 {/* Filters */}
                 <div className='bg-white p-4 rounded-lg w-[20%]'>
                    <div className='w-full flex justify-between'>
                        <h1 className=' font-bold text-blue-400'>Apply Filters</h1>
                        <Filter />
                    </div>
                    {/* Dropdown */}

                    <div className='mt-4'>
                    <Select>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select country  where you need investment" />
                        </SelectTrigger>
                        <SelectContent>
                            {COUNTRIES.map((country) => (
                                <SelectItem key={country} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </div>
                    <div className='mt-4'>
                    <Select>
                        <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {INDUSTRIES.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                    {industry}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                <div className='bg-white p-4 rounded-lg w-[70%] mx-auto'>
                    <div>
                    <h1 className='text-2xl font-bold text-blue-400'>Projects Listings</h1>
                    </div>
                  <div className='mt-4'>
                    <SearchListing />
                  </div>
                </div>
               </div>
            </div>
        </div>
    )
}

export default ProjectsSearch