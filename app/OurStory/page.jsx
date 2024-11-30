"use client"
import React from 'react'
import Illustration from "../../assets/Illustration.jpg"
import Growth from "../../assets/Growth.jpg"
import Airoplane from "../../assets/Airoplane.jpg"
import Image from 'next/image'
import { AlertCircle, Globe, ReceiptIcon, Settings } from 'lucide-react'

const OurStory = () => {
  
  return (
    <div className="mx-auto container"   >
      <div className='flex h-[70vh] flex-col md:flex-row items-center justify-between rounded-md w-full mt-10'>
        <div className=' rounded-md p-4  max-w-[700px] text-black '>
          <h1 className='text-green-400 font-bold '>
            Our Story
          </h1>
          <h1 className='text-2xl text-black font-bold md:text-[45px] leading-[50px]'>
            Why did we create LookVisa?
          </h1>

          <ul className='mt-4 list-disc text-gray-500 p-4'>
            <h1 className='mt-2 text-black  uppercase font-bold'>A Bridge Across Borders</h1>
            <li className='mt-2'>For years, talented individuals with dreams of a new life and promising investment opportunities have been separated by geographical and bureaucratic barriers. The process of obtaining an investor visa has often been a complex and daunting task, riddled with uncertainty and inefficiency.</li>
            <li className='mt-2'>We saw a need for a more streamlined, transparent, and accessible solution. A platform that would connect immigrant investors with projects seeking capital, cutting through the red tape and simplifying the process.</li>
            <li className='mt-2'>
              That’s why we created LookVisa.Com We're more than just a website; we’re a bridge across borders. We've overcome the challenges of navigating complex immigration laws, verifying project authenticity, and facilitating secure transactions.
            </li>
            <li className='mt-2'>
              By connecting investors with projects in countries around the world, we're empowering individuals to achieve their global ambitions and contribute to economic growth. Our platform offers a seamless experience, from initial search to final investment, making the journey to a new life a reality.
            </li>
          </ul>
        </div>
        <div>
          <Image width={700} height={800} src={Illustration} alt="" />
        </div>
      </div>
      <div className='flex md:h-[70vh] flex-col md:flex-row items-center justify-between rounded-md w-full mt-10'>
        <div>
          <Image width={700} height={800} src={Growth} alt="" />
        </div>
        <div className=' rounded-md p-4  max-w-[700px] text-black '>
          <h1 className='text-green-400 font-bold '>
            What do we do for you at LookVisa?
          </h1>
          <h1 className='text-2xl text-black font-bold md:text-[45px] leading-[50px]'>
            A New Era of Global Opportunity

          </h1>

          <ul className='mt-4  text-gray-500 p-4'>
            <h1 className='mt-2 text-black  uppercase font-bold'>The Challenge:
            </h1>
            <li className='mt-2'>Securing an investor visa has traditionally been a complex and time-consuming process. With minimum investment amounts ranging from $500,000 to $1,050,000 per project (amounts vary by country), finding suitable investment opportunities and navigating intricate immigration laws can be daunting. The average processing time for an EB-5 visa, for instance, can exceed two years.
            </li>
          </ul>
        </div>

      </div>



      {/* Ouw Mission */}
      <div className='w-full flex items-center justify-center flex-col gap-10 mt-8 mb-8 bg-blue-900 p-4 rounded-2xl md:h-full'>
        <div className='flex items-center flex-col justify-center w-full gap-4'>
          <h1 className='text-2xl  font-bold md:text-[45px] leading-[50px] text-white uppercase mt-4'>Our Solution</h1>
          <p className='text-center text-white max-w-[600px]'>LookVisa.com is revolutionizing the way immigrant investors connect with suitable investment projects worldwide. We've streamlined the process, making it easier than ever to find and invest in projects that align with your goals. By leveraging our platform, you can:</p>
        </div>

        <div className='flex w-full items-center justify-center flex-wrap mb-4'>
          <div className='flex flex-col items-center justify-center gap-2 max-w-[340px]' >
            <Globe size={30} className='text-white' />
            <h1 className='text-white font-bold'>Access a Global Network</h1>
            <p className='text-gray-50 text-center'>Explore a diverse range of investment opportunities across multiple countries.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2  max-w-[340px]' >
            <Settings size={30} className='text-white' />
            <h1 className='text-white font-bold'>Simplify the Process</h1>
            <p className='text-gray-50  text-center'>Cut through the red tape and expedite the visa application process.

            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2  max-w-[340px] ' >
            <AlertCircle size={30} className='text-white' />
            <h1 className='text-white font-bold'>Minimize Risk</h1>
            <p className='text-gray-50  text-center'>Invest in thoroughly vetted projects with experienced developers and proven track records.

            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2  max-w-[340px]' >
            <ReceiptIcon size={30} className='text-white' />
            <h1 className='text-white font-bold'>	Maximize Returns</h1>
            <p className='text-gray-50  text-center'>Benefit from potential capital appreciation and immigration perks.
            </p>
          </div>

        </div>
      </div>


{/* makig Difference  */}
<div className='flex h-[70vh] flex-col md:flex-row items-center justify-between rounded-md w-full mt-10'>
        <div className=' rounded-md p-4  max-w-[700px] text-black '>
          <h1 className='text-green-400 font-bold '>
    
          </h1>
          <h1 className='text-2xl text-black font-bold md:text-[45px] leading-[50px]'>
          How We're Making a Difference

          </h1>

          <ul className='mt-4 list-disc text-gray-500 p-4'>

            <li className='mt-2'>Transparent Process: We provide clear information on investment requirements, visa eligibility, and project timelines.
            </li>
            <li className='mt-2'>	Expert Guidance: Our team of immigration experts is available to answer your questions and guide you through the process</li>
            <li className='mt-2'>
        Secure Transactions: We prioritize the security of your investment through robust financial safeguards
            </li>
            <li className='mt-2'>
            ⦁Global Reach: Our platform connects you with investors and projects worldwide, expanding your horizons.
            </li>
          </ul>
        </div>
        <div>
          <Image width={700} height={800} src={Airoplane} alt="" />
        </div>
      </div>
    </div>
  )
}

export default OurStory