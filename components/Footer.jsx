"use client";

import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-yellow-400 p-6 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-lg font-bold mb-2">Follow us on social media</h2>
                <div className="flex justify-center gap-4 mb-4">
                    <Link href="https://www.linkedin.com/company/lookvisa/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white text-2xl">
                        <FaLinkedin />
                    </Link>
                    <Link href="#" className="text-yellow-400 hover:text-white text-2xl">
                        <FaInstagram />
                    </Link>
                    <Link href="#" className="text-yellow-400 hover:text-white text-2xl">
                        <FaFacebook />
                    </Link>
                </div>

                <div className="mb-4">
                    <p>23 NE 17<sup>th</sup> Ter</p>
                    <p>Miami, Florida, 33132, USA</p>
                    <p className="flex items-center justify-center gap-2"><FaPhone /> (786)-505-6821</p>
                    <p className="flex items-center justify-center gap-2">
                        <FaEnvelope />
                        <Link href="mailto:Info@lookvisa.com" className="hover:underline">Info@lookvisa.com</Link>
                    </p>
                </div>

                <div className="mb-4">
                    <Link href="/PrivacyPolicy" className="hover:underline">Terms of Service</Link> |
                    <Link href="/PrivacyPolicy" className="hover:underline"> Privacy Policy</Link>
                </div>

                <p>&copy; 2025 All rights reserved - LookVisa.com</p>
            </div>
        </footer>
    );
};

export default Footer;
