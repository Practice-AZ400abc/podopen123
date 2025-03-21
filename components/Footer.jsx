"use client";

import { Link2, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";
import Instagram from "@/assets/instagram.svg"
import Facebook from "@/assets/facebook.svg"
import Linkedin from "@/assets/linkedin.svg"
import Logo from "../app/Lookvisa.png";

import Image from 'next/image';

const Footer = () => {
    return (
        <footer className=" w-full   text-center">
            <div className='bg-blue-800  p-6  flex flex-col md:flex-row flex-wrap gap-4 items-start justify-evenly'>


                <div className='flex flex-col gap-2 items-start  '>
                    <div className='bg-white p-3 rounded-md shadow-md'>
                        <Image src={Logo} alt="Lookvisa" width={120} />
                    </div>
                    <hr className=' w-full h-[2px] rounded-full bg-white' />
                    <p className='text-left md:max-w-[200px] text-gray-100'>LookVisa is a platform that helps visa sponsors find and identify
                        golden, and EB-5 visa investors to fund their projects.</p>

                </div>


                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-white font-bold'>Quick Links</h1>
                    <hr className=' w-full h-[2px] rounded-full bg-white' />

                    <Link href={"/"} className='text-gray-200 underline'>Home</Link>
                    <Link href={"/howItWorks"} className='text-gray-200 underline'>How it Works</Link>
                    <Link href={"/pricing"} className='text-gray-200 underline'>Pricing</Link>
                    <Link href={"/PrivacyPolicy"} className='text-gray-200 underline'>Privacy Policy</Link>
                    <Link href={"/search"} className='text-gray-200 underline'>Find investors
                    </Link>
                </div>

                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-white font-bold'>Address</h1>
                    <hr className=' w-full h-[2px] rounded-full bg-white' />

                    <div>
                        <p className='text-start text-gray-200'>23 NE 17th Ter Miami, <br /> Florida, 33132</p>
                    </div>
                </div>
                <div className='flex flex-col items-start gap-2 '>
                    <h1 className='text-2xl text-white font-bold'>Contact</h1>
                    <hr className=' w-full h-[2px] rounded-full bg-white' />

                    <div className='flex items-center gap-2 '>
                        <Send className='text-sm text-gray-200' size={14} />
                        <p className='text-start text-gray-200'>info@lookvisa.com</p>
                    </div>
                    <div className='flex items-center gap-2 text-gray-200'>
                        <Phone className='text-sm' size={14} />
                        <p className='text-start'>786-505-6821</p>
                    </div>
                    <hr className=' w-full h-[2px] rounded-full bg-white' />

                    <h1 className='text-sm text-white font-bold'>Follow us</h1>

                    <div className='flex gap-2'>
                        <Image src={Instagram} alt='Instagram' className='h-10 w-10 cursor-pointer' />
                        <Image src={Facebook} alt='Instagram' className='h-10 w-10 cursor-pointer' />
                        <Link href='https://www.linkedin.com/company/lookvisa/' target='_blank'><Image src={Linkedin} alt='Instagram' className='h-10 w-10 cursor-pointer' /></Link>
                    </div>
                </div>


            </div>
            <hr className=' w-full h-[6px] rounded-full bg-orange-400' />
            <div className='flex flex-col items-center justify-center h-[50px] bg-gray-200'>

                <p className='text-center mt-2'> Copyright © 2025 Lookvisa All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
