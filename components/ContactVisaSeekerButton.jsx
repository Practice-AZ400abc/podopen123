import { React } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquare, CheckIcon } from 'lucide-react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Contactform from './contactform';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/components/AuthProvider";

import PopupImg from '../app/Popupimg.jpg';

const ContactVisaSeekerButton = ({ investor, user }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false)
    const [contactFormVisible, setContactFormVisible] = useState(false);

    const [roleErrorVisible, setRoleErrorVisible] = useState(false);

    if (!isLoggedIn) {
        sessionStorage.setItem("redirect", "/checkout");
    }

    useEffect(() => {
        if (user && user.role === "Visa Sponsor" && user.subscriptionStatus === "Active") {
            console.log("user has active subscription");
            setRoleErrorVisible(false);
            setContactFormVisible(true);
        }

        if (user && user.role !== "Visa Sponsor") {
            setContactFormVisible(false);
            setRoleErrorVisible(true);
        }
    }, [user]);

    return (

        <div>
            <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white p-2 rounded-md">
                Message Investor
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
                    {
                        contactFormVisible ? (
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Investor Profile Section */}
                                <div className="w-full md:w-1/2 p-6 border rounded-lg bg-gray-50">
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={investor.avatarURL}
                                            alt={`${investor.firstName} ${investor.lastName}`}
                                            width={120}
                                            height={120}
                                            className="rounded-full"
                                        />
                                        <h2 className="mt-4 text-xl font-semibold text-center">
                                            {`${investor.firstName} ${investor.lastName}`}
                                        </h2>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-10 text-sm text-gray-700">
                                        <p><strong>Email:</strong> {investor.email}</p>
                                        <p><strong>Phone:</strong> {investor.phone}</p>
                                        <p><strong>Company:</strong> {investor.companyName}</p>
                                        <p><strong>Website:</strong> {investor.websiteURL || "N/A"}</p>
                                        <p><strong>Country of Birth:</strong> {investor.countryOfBirth}</p>
                                        <p><strong>Nationality:</strong> {investor.nationality}</p>
                                        <p><strong>Dual Citizenship:</strong> {investor.dualCitizenship ? "Yes" : "No"}</p>
                                        <p><strong>Net Worth:</strong> {investor.netWorth}</p>
                                        <p><strong>Liquid Assets:</strong> {investor.liquidAssets}</p>
                                        <p><strong>Investment Amount:</strong> {investor.investmentAmount}</p>
                                        <p><strong>Industry:</strong> {investor.industryToInvest}</p>
                                        <p><strong>Relocation Country:</strong> {investor.relocationCountry}</p>                                    <p><strong>Liquidity Evidence:</strong> {investor.canProvideLiquidityEvidence ? "Yes" : "No"}</p>
                                        <p><strong>LinkedIn:</strong> {investor.linkedin || "N/A"}</p>
                                        <p><strong>Instagram:</strong> {investor.instagram || "N/A"}</p>
                                        <p className="col-span-2"><strong>Comments:</strong> {investor.comments || "N/A"}</p>
                                    </div>
                                </div>
                                {/* Contact Form Section */}
                                <div className="w-full md:w-2/3">
                                    <DialogHeader>
                                        <DialogTitle>Connect with investors</DialogTitle>
                                    </DialogHeader>
                                    <Contactform investor={investor} user={user}
                                        onClose={() => setIsOpen(false)}
                                    />
                                </div>
                            </div>
                        ) : (
                            roleErrorVisible ? (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Connect with investors</DialogTitle>
                                    </DialogHeader>
                                    <hr className="mt-2 mb-2 h-1 bg-gray-300" />
                                    <div className="flex items-center justify-center w-full">
                                        <Image
                                            src={PopupImg}
                                            alt="connect with Invetors"
                                            className="h-[200px] w-[200px] rounded-sm  object-cover"
                                        />
                                    </div>
                                    <DialogDescription className="text-center">
                                        To be able to contact other visa seekers, please <Link href={"/"} className='text-blue-400 underline'>Login</Link> with a visa sponsor account.
                                    </DialogDescription>
                                </>
                            ) : (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Connect with investors</DialogTitle>
                                    </DialogHeader>
                                    <hr className="mt-2 mb-2 h-1 bg-gray-300" />
                                    <div className="flex items-center justify-center w-full">
                                        <Image
                                            src={PopupImg}
                                            alt="connect with Invetors"
                                            className="h-[200px] w-[200px] rounded-sm  object-cover"
                                        />
                                    </div>
                                    <DialogDescription>
                                        To contact and connect with investors and see their
                                        profile please get started with a fast, secure,
                                        payment. You’ll also get full access to create a
                                        listing to obtain funding from a visa investor for
                                        your projects.
                                    </DialogDescription>

                                    <div className="w-full flex items-center justify-center gap-4 mt-4">
                                        <div className="p-3 border rounded-md w-[60%] flex flex-col gap-4 ">
                                            <div>
                                                <h1 className="text-sm font-semibold">
                                                    30 Days Pass
                                                </h1>
                                                <p className="text-4xl text-blue-400 font-bold">
                                                    {" "}
                                                    $30.00
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <CheckIcon size={20} />
                                                    </div>
                                                    <h1 className="text-sm text-gray-500 ">
                                                        Allows you to contact investors for 30 days
                                                        to get funding for your projects
                                                    </h1>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <CheckIcon size={20} />
                                                    </div>
                                                    <h1 className="text-sm text-gray-500 ">
                                                        Allows you to create a lisLng to get funding
                                                        for your project{" "}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="p-2 border flex gap-2 rounded-md bg-gray-100">
                                                <FaExclamationTriangle />
                                                <p className="text-sm uppercase">
                                                    Renew your pass as needed
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex items-center justify-end gap-4 ">
                                        <Link href={"/"} className="underline">
                                            Not Now
                                        </Link>
                                        <Link className="bg-green-600 p-3 text-white rounded-sm" href={isLoggedIn ? "/checkout" : "/sign-in"}>
                                            Get Started
                                        </Link>
                                    </div>
                                </>
                            )
                        )
                    }
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ContactVisaSeekerButton;