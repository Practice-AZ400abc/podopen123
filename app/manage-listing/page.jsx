"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Wrapper from "@/components/Wrapper";
import toast from "react-hot-toast";

const ManageListing = () => {
    const [token, setToken] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/");
        }
        setToken(storedToken);
    }, []);

    const getFirstNameFromToken = () => {
        if (token) {
            return jwtDecode(token).firstName;
        }
    };

    const getCompletedProfileFromToken = () => {
        if (token) {
            return jwtDecode(token).completedProfile;
        }
    }

    const completedProfile = getCompletedProfileFromToken();
    if (completedProfile === false) {
        toast.error("Please complete your profile before creating a listing");
        router.push("/profile");}
    const Firstname = getFirstNameFromToken();

    return (
        <div className="min-h-[100vh]">
            <div className="mx-auto px-3 mt-10 flex flex-col items-center justify-between">
            <div className=" px-3  container flex  items-center w-[90%] justify-between">
                <h1 className="text-4xl font-bold">
                    Welcome! <span className="text-blue-400">{Firstname}</span>
                </h1>

                <Sheet>
                    <SheetTrigger
                        className="btn p-3 flex items-center gap-2 rounded-sm bg-green-400 font-bold text-white"
                        variant="ghost"
                    >
                        <PlusCircleIcon /> Create a Listing
                    </SheetTrigger>
                    <SheetContent className="h-[90vh] bg-white" side={"bottom"}>
                        <div className="h-full flex flex-col md:flex-row items-center justify-center gap-20 max-w-[900px] mx-auto">
                            <div className="flex flex-col md:flex-row">
                                <h1 className="text-4xl">
                                    It's easy to get started
                                    <br /> with{" "}
                                    <span className="text-blue-400 font-bold">Lookvisa</span>{" "}
                                </h1>
                            </div>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-lg">
                                        <span className="bg-blue-400 p-2 text-white rounded-full">
                                            1
                                        </span>{" "}
                                        - Tell us about your listing
                                    </h1>
                                    <hr />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-lg">
                                        <span className="bg-blue-400 p-2 text-white rounded-full">
                                            2
                                        </span>{" "}
                                        - Make it stand out{" "}
                                    </h1>
                                    <hr />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-lg">
                                        <span className="bg-blue-400 p-2 text-white rounded-full">
                                            3
                                        </span>{" "}
                                        - Finish up preview, pay and publish
                                    </h1>
                                    <hr />
                                </div>
                                <div className="flex items-end justify-end w-full ">
                                    <Link
                                        href={completedProfile ? "/create-listing" : "/profile"}
                                        className="bg-black text-center p-2 w-full text-white rounded-md hover:bg-gray-900"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="w-full container flex mt-10 items-start justify-start gap-10">
                <Wrapper />
            </div>
        </div>
        </div>
    );
};

export default ManageListing;
