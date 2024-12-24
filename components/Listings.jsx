"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { RiEyeFill } from 'react-icons/ri';

const Listings = ({ listing }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className='w-full  rounded-md flex flex-col items-start border p-2 justify-start gap-2'>
      <div className='flex gap-2 justify-between w-full'>
        <h1 className=' text-blue-500 uppercase p-2 m-2 rounded-sm text-sm font-bold'>{listing.projectDescription}</h1>
        <div className='flex items-center gap-2'>
          <span>Status:</span>
          <Button className="bg-green-400 text-white">{listing.status === "pending" ? "Draft" : ""}</Button>
          <div className="flex items-start justify-between">

            <div className="w-[200px]">
              <Select>
                <SelectTrigger className="h-12">
                  <div className="flex items-center gap-2">
                    <RiEyeFill className='text-blue-500' />
                    <SelectValue
                      className="text-lg font-bold"
                      value={null} // Ensure no value is selected initially
                      placeholder="Change Visibility"
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active"> ✔️ Activate Listing</SelectItem>
                  <SelectItem value="inactive">  ✔️ Save Draft</SelectItem>
                  <SelectItem value="pending"> ✔️ Unpublish Listing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <img className='h-[100px] object-cover rounded-md w-[100px]' src={listing.images[0]} alt="" />
          <img className='h-[100px] object-cover rounded-md w-[100px]' src={listing.images[1]} alt="" />
        </div>
        <h1 className=' text-blue-500 uppercase  rounded-sm text-sm font-bold'>
          <span className='font-bold text-black'>Description: </span>
          {listing.sponsorShipDescription}
        </h1>
        <h1 className='font-light text-gray-800 '>
          <span className='font-bold'>Countries for Investors : </span>
          {listing.countriesForInvestors.map((country) => (
            <span className='bg-blue-200 p-2 m-2 rounded-sm text-sm font-bold'>{country}</span>
          ))}
        </h1>

      </div>
      <button onClick={() => setShowDetails(!showDetails)} className="underline text-black p-2 rounded-md mt-4">
        {showDetails ? 'See Less' : 'See More'}
      </button>

      {showDetails && (
        <>
          <div className='mt-4 flex gap-2 flex-col'>
            <h1 className='mt-2 font-bold'>Country for Investment: <span className='text-blue-500 uppercase p-2 m-2 rounded-sm text-sm font-bold'>{listing.investmentIndustry}</span></h1>
            <h1 className='mt-2 font-bold'>Industry of Investment: <span className='text-blue-500 uppercase p-2 m-2 rounded-sm text-sm font-bold'>{listing.countryForInvestment}</span></h1>
            <h1 className='mt-2 font-bold'>Minimum Investment: <span className='text-blue-500 uppercase p-2 m-2 rounded-sm text-sm font-bold'>{listing.minimumInvestment}</span></h1>
          </div>
          <div className='mt-4 flex gap-2 flex-col'>
            <h1 className='font-bold'>Contact Information</h1>
            <div className='flex gap-4'>
              <div className='flex gap-2'>
                <span className='font-bold text-blue-700'>telegram:</span>
                <span>{listing.telegram}</span>
              </div>
              <div className='flex gap-2'>
                <span className='font-bold text-blue-400'>Contact Phone Number:</span>
                <span>{listing.telegram}</span>
              </div>
              <div className='flex gap-2'>
                <span className='font-bold text-green-400'>Whatsapp:</span>
                <span>{listing.whatsapp}</span>
              </div>
            </div>
          </div>
          <div className='mt-4 flex gap-2 flex-col'>
            <div className='flex gap-2'>
              <h1 className='font-bold  text-blue-700'>Email</h1>
              <span>{listing.contactEmail}</span>
            </div>
          </div>
        </>
      )}

      <div className='flex items-end justify-end gap-2 w-full'>
        <Button className='bg-red-500 text-white'>Delete</Button>
        <Button className='bg-blue-500 text-white'>Publish Listing</Button>
      </div>
    </div>
  )
}

export default Listings