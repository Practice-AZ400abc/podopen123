"use client"
import React from 'react'
import {
    COUNTRIES,
    INDUSTRIES,
    INVESTMENT_RANGES,
    RELOCATION_TIMEFRAMES,
} from "@/lib/constants";
import ReactSelect from "react-select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";


const countryOptions = COUNTRIES.map((country) => ({
    value: country,
    label: country,
}));



const ListingForm = () => {
    return (
        <form action="" className='w-full flex flex-col md:flex-row items-start justify-evenly gap-4 mt-10'>
            <div className='flex flex-col gap-2 w-[30%]'>
                <label htmlFor="" className="text-sm font-medium text-gray-700">Short description title of your sponsorship *</label>
                <input maxLength={30} type="text" placeholder='Title of Listing' className='p-2 bg-gray-50 rounded-md w-full border' />
                <textarea placeholder='Investment project Description' maxLength={400} className='h-[150px] bg-gray-50 p-2 rounded-md border'></textarea>
                <div className='w-full flex flex-col gap-2'>
                    <label className="text-sm font-medium text-gray-700">
                        Timetable to get visa investor investment
                    </label>
                    <input type="date" className='p-2 bg-gray-50 border rounded-md w-full' />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>

                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm font-medium text-gray-700">
                            Country where you need investment to sponsor visa *
                        </label>

                        <select
                            className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
                        >
                            {COUNTRIES.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                {/* industry */}
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm font-medium text-gray-700">
                                Seeking investors in these industries*
                            </label>
                            <select
                                className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
                            >
                                {INDUSTRIES.map((industry, index) => (
                                    <option key={index} value={industry}>
                                        {industry}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium mb-2 ">
                        Seeking investors from these countries
                    </label>
                    <ReactSelect
                        isMulti
                        options={countryOptions}
                        className="react-select-container "
                        classNamePrefix="react-select"
                        placeholder="Select countries"
                    />
                </div>

                {/* investmount */}
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm font-medium text-gray-700">
                                Minimum Investment needed (in USD dollars)*
                            </label>
                            <select
                                className="bg-gray-50 h-12 p-2 rounded-md border border-gray-300"
                            >
                                {INVESTMENT_RANGES.map((investment, index) => (
                                    <option key={index} value={investment}>
                                        {investment}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm font-medium text-gray-700"> WhatsApp</label>
                    <PhoneInput
                        defaultCountry="ua"
                        placeholder="Enter phone number"
                        maxLength={15}
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm font-medium text-gray-700"> Telegram</label>
                    <PhoneInput
                        defaultCountry="ua"
                        placeholder="Enter phone number"
                        maxLength={15}
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm font-medium text-gray-700">* Contact phone number</label>
                    <PhoneInput
                        defaultCountry="ua"
                        placeholder="Enter phone number"
                        maxLength={15}
                    />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <label className="text-sm font-medium text-gray-700">* Contact email</label>
                    <input type="email" placeholder='Enter email' className='p-2 bg-gray-50 rounded-md w-full border' />
                </div>
            </div>
        </form>
    )
}

export default ListingForm
