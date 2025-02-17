import React from 'react';
import Card from '@/components/Card';
import { ArrowRight, ListCheck, SearchCheckIcon, Star } from 'lucide-react';
import { RiProfileLine } from 'react-icons/ri';
import Link from 'next/link';

const HowtoStart = () => {
  const steps = [
    {
      icon: <RiProfileLine size={40} className='text-white' />, // Replace with an actual icon component, e.g., <IconComponent />
      title: ' Immigrant Investor Profile',
      description: 'List your profile for FREE in our platform for the countries and projects that you want to immigrate to with an investor visa.',
    },
    {
      icon: <ListCheck size={40} className='text-white' />,
      title: 'Investor Seekers Listings',
      description: 'List the projects (i.e. construction, hospitality) that require funding from immigrant investors.',
    },
    {
      icon: <SearchCheckIcon size={40} className='text-white' />,
      title: ' Investor Seekers Find Investors',
      description: 'Search for and identify immigrant investors in our platform willing to fund your project in your chosen country. LookVisa brings you immigrant investors from all over the world.',
    },
  ];

  return (
    <div className="mx-auto container min-h-screen">
      <div className="flex flex-col items-left md:items-center justify-center w-full  px-8 py-4">
        <h1 className="font-semibold text-blue-500 text-2xl">How to Start</h1>
        <p style={{ lineHeight: "50px" }} className="text-lg md:text-[44px] font-bold max-w-[800px] md:leading-10 md:text-center md:mt-5 md:mb-5">
          We’re making finding and funding projects with Investor Visas Simple
        </p>
        <span>
          Get an immigrant investor visa and fund your investment projects in three simple steps.
        </span>
        <div className="flex flex-wrap items-center justify-evenly gap-6 mt-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        <Link href={"/"} className='flex mt-10 gap-2 hover:gap-4 transition-all text-lg items-center p-2 bg-blue-400  text-white rounded-md hover:bg-blue-500'>Become Invester
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default HowtoStart;
