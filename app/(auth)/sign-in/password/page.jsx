"use client";

import Link from "next/link";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

const ForgetPassword = () => {


    return (
        <div className=" h-screen  flex flex-col items-center justify-center">
            <div className="p-5 bg-slate-900 rounded-lg w-[90%]  sm:w-[90%]  md:max-w-[400px] lg:max-w-[500px] mx-auto">


                <div className="mt-2">
                    <form className="">
                        <div className="flex flex-col">
                            <label className="font-semibold text-white text-sm">
                                Password
                            </label>
                            <input
                                className="bg-slate-800 text-white rounded-md p-1 mt-2 outline-blue-200"
                                type="password"
                                placeholder="Enter password"
                            />
                        </div>
                        <button className="flex items-center justify-center text-center w-full p-2 bg-blue-500 text-white font-bold  rounded-md mt-5">
                            Login
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default ForgetPassword;
