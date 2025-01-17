"use client";
import { DownloadIcon, Loader, LoaderCircle, Locate, LocateIcon, SplineIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLocationArrow } from "react-icons/fa";
import profile from "@/assets/profile.png";
import Link from "next/link";


const ProjectPage = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/projects/${id}`);
                const data = await response.json();
                setProject(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
                toast.error("Failed to fetch project");
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center">
            <LoaderCircle size="2rem" className="animate-spin"/>
        </div>;
    }

    if (!project) {
        return <p>Project not found</p>;
    }

    return (
        <div className="w-full container mx-auto p-4">
            <div className="mt-2 border p-3 rounded-md">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                   <Image
                        src={project.author.avatarURL || profile}
                        alt="Author Profile Image"
                        className="w-20 h-20 object-cover rounded-full"
                        width={200}
                        height={200}
                    />
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <h1 className="text-4xl font-bold text-gray-700">
                                {project.author.firstName}
                            </h1>
                            <h1 className="text-4xl font-bold text-gray-700">
                                {project.author.lastName}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaLocationArrow className="text-blue-400" />
                            <p className="text-gray-500">{project.countryForInvestment}</p>
                        </div>
                    </div>
                   </div>
                <Link href={`/Projects-search?country=${project.countryForInvestment}`} className="underline pr-4">Back</Link>
                </div>

                {/* Flex box */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="p-2 border mt-2 w-full md:w-[35%] h-full rounded-md">
                        <h1 className="text-gray-600 uppercase font-bold">
                            About Investor
                        </h1>
                        <div className="mt-5 flex items-center gap-4">
                            <p className="text-bold">Investment Role: </p>
                            <span className="text-sm text-gray-500">
                                {project.author.investmentRole}
                            </span>
                        </div>
                        <div className="mt-5 flex items-center gap-4">
                            <p className="text-bold">Company Name: </p>
                            <span className="text-sm text-gray-500">
                                {project.author.companyName}
                            </span>
                        </div>
                        <div className="mt-5 flex items-center gap-4">
                            <p className="text-bold">Contact email: </p>
                            <span className="text-sm text-gray-500">
                                {project.contactEmail}
                            </span>
                        </div>
                    </div>

                    <div className="p-2 border mt-2 w-full md:w-[65%] h-full rounded-md">
                        <h1 className="text-2xl uppercase font-bold">
                            {project.sponsorShipDescription}
                        </h1>

                        <div className="mt-5 flex items-center gap-4">
                            <p className="text-bold ext-gray-600">
                                {project.projectDescription}
                            </p>
                        </div>
                        <div className="border p-2 rounded-md mt-5">
                            <div className="flex flex-col flex-wrap md:flex-row text-left justify-start gap-4 items-center">
                                <div className="flex items-center gap-4">
                                    <p className="text-bold">Minimum Investment: </p>
                                    <span className="text-sm text-gray-500">
                                        {project.minimumInvestment.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-bold">Industry of Investment: </p>
                                    <span className="text-sm text-gray-500">
                                        {project.investmentIndustry}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-bold">Timetable of Investment: </p>
                                    <span className="text-sm text-gray-500">
                                        {new Date(project.investmentTimeTable).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="mt-5 flex items-center gap-4">
                                    <p className="text-bold">Counties for investors: </p>
                                    <span className="text-sm flex gap-4 border p-2 rounded-md text-gray-500">
                                        {project.countriesForInvestors.map((investor) => (
                                            <p className="text-bold   text-gray-600" key={investor}>
                                                {investor}
                                            </p>
                                        ))}
                                    </span>
                                </div>
                                <div className="mt-5 flex items-center gap-4">
                                    <p className="text-bold">Country where investment needed: </p>
                                    <span className="text-sm text-gray-500">
                                        {project.countryForInvestment}
                                    </span>
                                </div>
                            </div>
                        </div>


            
                        <div className="border p-2 rounded-md mt-5">
                        <h1 className="text-xl  font-bold">Contact Informatiion</h1>
                            <div className="flex flex-col mt-5 flex-wrap md:flex-row text-left justify-start gap-4 items-center">
                                <div className="flex items-center gap-4">
                                    <p className="text-bold">Telegram: </p>
                                    <span className="text-sm text-gray-500">
                                        {project.telegram}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-bold">Phone Number: </p>
                                    <span className="text-sm text-gray-500">
                                        {project.phone}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-bold">Whatsapp: </p>
                                    <span className="text-sm text-gray-500">
                                        {project.whatsapp}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-5 p-4">
                            <h1 className="text-xl  font-bold">Attachments</h1>
                            <div className="p-2 rounded-md">
                                {project.attachments.map((attachment) => (
                                    <div key={attachment.url} className="flex items-center gap-2 border p-2 w-fit rounded-sm">
                                        <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            {attachment.fileName}
                                        </a>
                                        <button
                                            onClick={() => window.open(attachment.url, '_blank')}
                                            className="text-sm text-blue-500 underline flex items-center gap-4"
                                        >
                                           <DownloadIcon size={14}/> Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                      <div className="flex gap-4 md:gap-10 flex-wrap items-center justify-end">
                      <p className="text-sm text-black border p-2 rounded-sm text-end">Published At: {new Date(project.createdAt).toLocaleDateString()} </p>
                      <p className="text-sm text-black border p-2 rounded-sm text-end">Listing Number: {project._id.slice(0, 5)}</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
