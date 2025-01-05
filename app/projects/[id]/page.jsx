"use client";
import { Loader, Locate, LocateIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaLocationArrow } from 'react-icons/fa';

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
                console.log(data)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
                toast.error('Failed to fetch project');
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return <Loader size="2rem" />;
    }

    if (!project) {
        return <p>Project not found</p>;
    }

    return (
        <div className=" w-full  container mx-auto p-4">
            <div className='mt-2 border p-3 rounded-md'>
                <div className='flex items-start gap-4'>
                    <Image src={project.author.avatarURL} alt='Author Profile Image'
                        className='w-20 h-20 object-cover rounded-full'
                        width={200} height={200} />
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <h1 className='text-4xl font-bold text-gray-700'>{project.author.firstName}</h1>
                            <h1 className='text-4xl font-bold text-gray-700'>{project.author.lastName}</h1>
                        </div>
                        <div className='flex items-center gap-2'>
                            <FaLocationArrow className='text-blue-400' />
                            <p className='text-gray-500'>Pakistan</p>
                        </div>
                    </div>
                </div>
                {/* Flx box */}
                <div className='flex gap-4 mt-4'>
                    <div className='p-2 border mt-2 w-[35%] h-full rounded-md'>
                        <h1 className='text-gray-600 uppercase font-bold'>About Investor</h1>
                        <div className='mt-5 flex items-center gap-4'>
                            <p className='text-bold'>Investment Role: </p>
                            <span className='text-sm text-gray-500'>{project.author.investmentRole}</span>
                        </div>
                        <div className='mt-5 flex items-center gap-4'>
                            <p className='text-bold'>Company Name: </p>
                            <span className='text-sm text-gray-500'>{project.author.companyName}</span>
                        </div>
                        <div className='mt-5 flex items-center gap-4'>
                            <p className='text-bold'>Email: </p>
                            <span className='text-sm text-gray-500'>{project.author.email}</span>
                        </div>
                    </div>



                    <div className='p-2 border mt-2 w-[65%] h-full rounded-md'>
                        <h1 className='text-2xl uppercase font-bold'>{project.sponsorShipDescription}</h1>

                        <div className='mt-5 flex items-center gap-4'>
                            <p className='text-bold ext-gray-600'>{project.projectDescription}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mt-5 flex items-center gap-4'>
                                <p className='text-bold'>Minimum Investment: </p>
                                <span className='text-sm text-gray-500'>{project.minimumInvestment.toLocaleString()}</span>
                            </div>
                            <div className='mt-5 flex items-center gap-4'>
                                <p className='text-bold'>Industry of Investment: </p>
                                <span className='text-sm text-gray-500'>{project.investmentIndustry}</span>
                            </div>
                            <div className='mt-5 flex items-center gap-4'>
                            <p className='text-bold'>Timetable of Investment: </p>
                            <span className='text-sm text-gray-500'>{new Date(project.investmentTimeTable).toLocaleDateString()}</span>
                            </div>
                           </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProjectPage;