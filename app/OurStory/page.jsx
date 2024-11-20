import React from 'react';

const OurStory = () => {
  return (
    <div className="container mx-auto bg-slate-800 p-5 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white uppercase mb-6 mt-[50px]">
          Our Story
        </h1>
        <div className='flex items-center justify-center w-full mb-[100px]'>
        <hr className='h-2 w-[200px] bg-white justify-center'/>
        </div>
        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            Why did we create LookVisa?
          </h2>
          <p className="text-gray-300 leading-7">
            <span className="font-bold text-white">A Bridge Across Borders</span>
            <br />
            For years, talented individuals with dreams of a new life and
            promising investment opportunities have been separated by geographical
            and bureaucratic barriers. The process of obtaining an investor visa
            has often been a complex and daunting task, riddled with uncertainty
            and inefficiency.
          </p>
          <p className="mt-4 text-gray-300 leading-7">
            We saw a need for a more streamlined, transparent, and accessible
            solution. A platform that would connect immigrant investors with
            projects seeking capital, cutting through the red tape and simplifying
            the process.
          </p>
          <p className="mt-4 text-gray-300 leading-7">
            That’s why we created <span className="font-bold">LookVisa.Com</span>.
            We're more than just a website; we’re a bridge across borders. We've
            overcome the challenges of navigating complex immigration laws,
            verifying project authenticity, and facilitating secure transactions.
          </p>
          <p className="mt-4 text-gray-300 leading-7">
            By connecting investors with projects in countries around the world,
            we're empowering individuals to achieve their global ambitions and
            contribute to economic growth. Our platform offers a seamless
            experience, from initial search to final investment, making the
            journey to a new life a reality.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            What do we do for you at LookVisa?
          </h2>
          <p className="text-gray-300 leading-7">
            <span className="font-bold text-white">A New Era of Global Opportunity</span>
          </p>
          <p className="mt-4 text-gray-300 leading-7">
            <span className="font-semibold">The Challenge:</span> Securing an
            investor visa has traditionally been a complex and time-consuming
            process. With minimum investment amounts ranging from $500,000 to
            $1,050,000 per project (amounts vary by country), finding suitable
            investment opportunities and navigating intricate immigration laws can
            be daunting. The average processing time for an EB-5 visa, for
            instance, can exceed two years.
          </p>
          <p className="mt-4 text-gray-300 leading-7">
            <span className="font-semibold">Our Solution:</span> LookVisa.com is
            revolutionizing the way immigrant investors connect with suitable
            investment projects worldwide. We've streamlined the process, making
            it easier than ever to find and invest in projects that align with
            your goals.
          </p>
          <ul className="mt-4 ml-6 list-disc text-gray-300 leading-7">
            <li>
              <span className="font-semibold text-white">Access a Global Network:</span>{" "}
              Explore a diverse range of investment opportunities across multiple
              countries.
            </li>
            <li>
              <span className="font-semibold text-white">Simplify the Process:</span>{" "}
              Cut through the red tape and expedite the visa application process.
            </li>
            <li>
              <span className="font-semibold text-white">Minimize Risk:</span> Invest in
              thoroughly vetted projects with experienced developers and proven
              track records.
            </li>
            <li>
              <span className="font-semibold text-white">Maximize Returns:</span> Benefit
              from potential capital appreciation and immigration perks.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            How We're Making a Difference:
          </h2>
          <ul className="ml-6 list-disc text-gray-300 leading-7">
            <li>
              <span className="font-semibold text-white">Transparent Process:</span>{" "}
              We provide clear information on investment requirements, visa
              eligibility, and project timelines.
            </li>
            <li>
              <span className="font-semibold text-white">Expert Guidance:</span>{" "}
              Our team of immigration experts is available to answer your questions
              and guide you through the process.
            </li>
            <li>
              <span className="font-semibold text-white">Secure Transactions:</span>{" "}
              We prioritize the security of your investment through robust
              financial safeguards.
            </li>
            <li>
              <span className="font-semibold text-white">Global Reach:</span> Our
              platform connects you with investors and projects worldwide,
              expanding your horizons.
            </li>
          </ul>
          <p className="mt-4 text-gray-300 leading-7">
            By choosing LookVisa.com, you're taking the first step towards a
            brighter future. Let us help you turn your dreams into reality.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OurStory;
