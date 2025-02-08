"use client";

import { Link2, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="absolute bottom-0 w-full min-h-[20vh] text-center">
            <div className='bg-gray-100  p-6  flex items-start justify-between'>
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-blue-400 font-bold'>Quick Links</h1>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/howItWorks"}>How it Works</Link>
                    <Link href={"/pricing"}>Pricing</Link>
                    <Link href={"/PrivacyPolicy"}>Privacy Policy</Link>
                    <Link href={"/search"}>Find investors
                    </Link>
                </div>
                
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-blue-400 font-bold'>Address</h1>
                    <div>
                        <p className='text-start'>23 NE 17th Ter Miami, <br /> Florida, 33132</p>
                    </div>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <h1 className='text-2xl text-blue-400 font-bold'>Contact</h1>
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
                    <h1 className='text-2xl text-blue-400 font-bold'>Socials</h1>
                
                    <div className='flex flex-wrap gap-2'>
                        <FaInstagram className='hover:text-blue-300 cursor-pointer'/>
                        <FaFacebook className='hover:text-blue-300 cursor-pointer'/>
                        <FaLinkedin className='hover:text-blue-300 cursor-pointer'/> 
                 </div>
                    
                </div>
            </div>
            <p className='text-center mt-2'> Copyright © 2025 Lookvisa All rights reserved.</p>
        </footer>
    );
};

export default Footer;
