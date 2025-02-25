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
import { CheckIcon } from 'lucide-react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { useRouter } from 'next/navigation';

import PopupImg from '../app/Popupimg.jpg';

const ContactVisaSeekerButton = ({ investor, user }) => {
    const router = useRouter();

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

    const handleClick = () => {
        if (!isLoggedIn || (user && user.subscriptionStatus !== "Active")) {
            sessionStorage.setItem("seekerId", investor._id);
            return setIsOpen(true);
        } else if (user && user.subscriptionStatus === "Active") {
            return router.push(`/search/inner/${investor._id}`);
        } else {
            return setIsOpen(true);
        }
    }

    return (

        <div>
            <button onClick={() => handleClick()} className="bg-blue-500 text-white p-2 rounded-md">
                Message Investor
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
                    {
                        contactFormVisible ? (
                            <div className="flex flex-col md:flex-row gap-6">
                                Too lazy to remove this properly
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