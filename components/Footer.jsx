"use client";

import { Link2, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";
import Instagram from "@/assets/instagram.svg"
import Facebook from "@/assets/facebook.svg"
import Linkedin from "@/assets/linkedin.svg"

import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="container mx-auto mt-[200px] w-full  text-center">
            <div className='bg-blue-400  p-6  flex flex-col  md:flex-row gap-4 items-start justify-between'>
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-white font-bold'>Quick Links</h1>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/howItWorks"}>How it Works</Link>
                    <Link href={"/pricing"}>Pricing</Link>
                    <Link href={"/PrivacyPolicy"}>Privacy Policy</Link>
                    <Link href={"/search"}>Find investors
                    </Link>
                </div>
                
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-white font-bold'>Address</h1>
                    <div>
                        <p className='text-start'>23 NE 17th Ter Miami, <br /> Florida, 33132</p>
                    </div>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-white font-bold'>Contact</h1>
                    <div className='flex items-center gap-2'>
                        <Send className='text-sm' size={14} />
                        <p className='text-start'>info@lookvisa.com</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Phone className='text-sm' size={14} />
                        <p className='text-start'>786-505-6821</p>
                    </div>
                    
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-white font-bold'>Socials</h1>
                
                    <div className='flex flex-wrap gap-2'>
                       <Image src={Instagram} alt='Instagram' className='h-10 w-10 cursor-pointer'/>
                       <Image src={Facebook} alt='Instagram' className='h-10 w-10 cursor-pointer'/>
                       <Image src={Linkedin} alt='Instagram' className='h-10 w-10 cursor-pointer'/>
                 </div>
                    
                </div>
            </div>
           <div className='flex items-center justify-center h-[50px] bg-gray-200'>
           <p className='text-center mt-2'> Copyright © 2025 Lookvisa All rights reserved.</p>
           </div>
        </footer>
    );
};

export default Footer;
