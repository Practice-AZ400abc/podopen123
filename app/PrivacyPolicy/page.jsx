"use client"
import Link from 'next/link'
import React from 'react'

const PrivacyPolicy = () => {
 
    return (
        <div className='mx-auto container'  >
            {/* Heading */}
            <div className='w-full flex items-center justify-center gap-2 flex-col h-[20vh] mb-100'>
                <h1 className='text-[44px] uppercase font-semibold'>Privacy Policy</h1>
                <p>Update at <span className='font-bold'>December 2024</span></p>
            </div>
            {/* Container */}
            <div className='flex w-full flex-col-reverse md:flex-row justify-evenly'>
                <div className=' md:w-[60%]'>
                    <h1 className='text-4xl font-light'>This Privacy Policy will help you better understand how we collect, use, and share your personal information</h1>
                    <div className='mt-3 mb-3'>
                        <h1 className='text-2xl font-semibold'>Privacy Policy</h1>
                        <p className='mt-2'>At LookVisa.com  (“we,” “us,” “our”), we are committed to protecting your privacy. This Privacy Notice explains how we collect, use, share, and safeguard your information when you visit our website [insert URL] (the “Site”) and use our services (collectively, the “Services”). Please read this Privacy Notice carefully</p>

                        <div className='flex flex-col gap-3'>
                            <h1 className='mt-4 font-bold'>Information We Collect</h1>
                            <p>We collect various types of information, including:
                            </p>
                            <h1 className='text-2xl underline'> Personal Information
                            </h1>
                            <h3>When you create an account or interact with our Services, you may provide us with personal information, such as:</h3>
                            <ul className='flex flex-col list-disc'>
                                <li>Name</li>
                                <li>Email</li>
                                <li>Phone number</li>
                                <li>Profile information from third-party services if you choose to sign in using Google Sign-In, Apple Sign-In, or Facebook Sign-In.
                                </li>
                            </ul>
                            <h1 className='text-2xl underline'> Data Usage
                            </h1>
                            <h3>We may collect information about how you access and use our Services, which may include:
                            </h3>
                            <ul className='flex flex-col list-disc'>
                                <li>Your IP address</li>
                                <li>Browser type and version</li>
                                <li>Pages visited on our Site</li>
                                <li>Time and date of your visit
                                </li>
                                <li>Time spent on each page</li>
                            </ul>

                            <h1 className='text-2xl underline'> How We Use Your Information
                            </h1>
                            <h3>We may use the information we collect for various purposes, including:

                            </h3>
                            <ul className='flex flex-col list-disc'>
                                <li>Providing and maintaining our Services</li>
                                <li>Facilitating account creation and authentication via OAuth.</li>
                                <li>Notifying you about changes to our Services</li>
                                <li>Allowing you to participate in interactive features when you choose to do so.
                                </li>
                                <li>Providing customer support and responding to your inquiries.
                                </li>
                                <li>Analyzing and improving our Services.</li>
                                <li>Sending you newsletters, marketing communications, and promotional materials (with your consent).
                                </li>

                            </ul>


                            <h1 className='text-2xl underline'>  Cookies and Tracking Technologies

                            </h1>
                            <h3>Our Site uses cookies and similar tracking technologies to enhance your experience. Cookies are small data files that are stored on your device when you visit our Site. We use cookies for purposes including:
                            </h3>
                            <ul className='flex flex-col list-disc'>
                                <li>Analyzing traffic and usage patterns through Google Analytics</li>
                                <li>Remembering your preferences and settings.</li>

                            </ul>
                            <p>You can adjust your cookie settings through your browser. However, if you do not accept cookies, you may not be able to use some parts of our Services. For more details, please refer to Google’s privacy policy here and their Analytics information here.</p>

                            <h1 className='text-2xl underline'> OAuth Authentication</h1>
                            <ul className='flex flex-col list-disc'>
                                <li>We offer the option to sign in using third-party authentication services, such as Google, Apple, and Facebook. If you choose to sign in using one of these services, we will collect information from your profile as permitted by the service’s privacy policy. You can review each service's privacy policy for more details on how they handle your information</li>
                            </ul>




                            <h1 className='text-2xl underline'> Data Retention  </h1>

                            <ul className='flex flex-col list-disc'>
                                <li>We will retain your personal information only for as long as necessary to fulfill the purposes set out in this Privacy Notice. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies, in accordance with applicable laws in the state of Florida.
                                </li>
                            </ul>



                            <h1 className='text-2xl underline'> Disclosure of Information

                            </h1>
                            <h3>We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:

                            </h3>
                            <ul className='flex flex-col list-disc'>
                                <li>With service providers that help us operate our Site and provide our Services.
                                </li>
                                <li>When required by law or in response to a legal request.</li>
                                <li>To protect against or investigate possible fraudulent or illegal activities.</li>
                                <li>In the event of a merger, acquisition, or asset sale, your personal information may be transferred as part of that transaction.

                                </li>
                            </ul>


                            <h1 className='text-2xl underline'> Your Rights

                            </h1>
                            <h3>Under applicable laws, you may have certain rights regarding your personal information, including:


                            </h3>
                            <ul className='flex flex-col list-disc'>
                                <li>The right to access your personal information.

                                </li>
                                <li>The right to correct or update your personal information</li>
                                <li>The right to delete your personal information.
                                </li>
                                <li>The right to object to or restrict processing of your personal information
                                </li>
                            </ul>
                            <p>To exercise these rights, please contact us using the contact information provided below.</p>


                            <h1 className='text-2xl underline'>Security of Your Information</h1>
                            <ul className='flex flex-col list-disc'>
                                <li>We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                                </li>
                            </ul>

                            
                            <h1 className='text-2xl underline'>Changes to This Privacy Notice</h1>
                            <ul className='flex flex-col list-disc'>
                                <li>We may update our Privacy Notice from time to time. We will notify you of any changes by posting the new Privacy Notice on this page with a new effective date. You are advised to review this Privacy Notice periodically for any changes.
                                </li>
                            </ul>

                            <h1 className='text-2xl underline'>Contact Us</h1>
                            <ul className='flex flex-col list-disc'>
                                <li>If you have any questions about this Privacy Notice or our privacy practices, please contact us at 
                                    <Link href={""} className='underline text-blue-400'>  Info@lookvisa.com </Link>
                                    or by phone at 786-505-6821

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='p-4 '>
                    <h1 className='text-2xl'>Table of Content</h1>
                    <ul className='mt-4 list-decimal'>
                        <li className='underline'>Personal Information</li>
                        <li className='underline'>Data Usage</li>
                        <li className='underline'>How We Use Your Information</li>
                        <li className='underline'>Cookies and Tracking Technologies</li>
                        <li className='underline'>OAuth Authentication</li>
                        <li className='underline'>Data Retention</li>
                        <li className='underline'>Disclosure of Information</li>
                        <li className='underline'>Your Rights</li>
                        <li className='underline'>Security of Your Information</li>
                        <li className='underline'>Changes to This Privacy Notice</li>
                        <li className='underline'>Contact Us</li>
                   </ul>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy