"use client";

import { Button } from '@/components/ui/button'
import { CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pricing = () => {
  const router = useRouter();

  const handleRedirect = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/checkout')
    } else {
      sessionStorage.setItem("redirect", "/checkout");
      router.push('/sign-in')
    }
  }

  return (
    <div className='mx-auto container p-3 flex flex-col gap-5 min-h-[80vh] items-center w-full h-full justify-center'>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <h1 className='text-2xl md:text-4xl text-black font-semibold'>Friendly Pricing</h1>
        <p className='text-slate-700  text-center max-w-[850px] mt-4'>To contact and connect with investors and see their profile please
          get started with a fast, secure, payment. You’ll also get full access to create a listing to
          obtain funding from a visa investor for your projects.</p>
      </div>
      <div className=' text-start md:w-[400px] p-4 rounded-md flex flex-col  items-start justify-start border'>
        <h3 className='text-black font-bold text-start'> 30 Days Pass</h3>
        <h1 className='text-[34px] font-bold text-blue-400 text-left'>30 $</h1>
        <div className='flex flex-row items-center justify-center gap-4 mt-6'>
          <CheckCheck size={24} className='text-blue-400 text-4xl' />
          <span className='text-slate-700 text-sm'>Allows you to contact investors for 30 days to get funding for your projects</span>
        </div>
        <div className='flex flex-row items-center justify-center gap-4 mt-4'>
          <CheckCheck size={24} className='text-blue-400 text-4xl' />
          <span className='text-slate-700 text-sm'>Allows you to create a lisVng to get funding for your project
          </span>
        </div>
        <Button onClick={handleRedirect} className="bg-green-500 hover:bg-green-400 text-center w-full mt-6">
          Get Started
        </Button>
      </div>
    </div>
  )
}

export default Pricing