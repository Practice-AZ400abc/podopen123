"use client"
import React from 'react';

import { useEffect, useState } from 'react';

const Template = () => {
    const [visaSponsorData, setVisaSponsorData] = useState(null);

    useEffect(() => {
        // Fetch or set the visaSponsorData here
        setVisaSponsorData({
            firstname: 'John',
            lastname: 'Doe',
            phoneNumber: '123-456-7890',
            comment: 'Looking forward to connecting with you.'
        });
    }, []);

    if (!visaSponsorData) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto', padding: '20px', maxWidth: '600px', backgroundColor: '#022150' }}>
            <table width="100%" border="0" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
                <tbody>
                    <tr>
                        <td style={{ padding: '20px', textAlign: 'center', color: '#ffffff' }}>
                
                            <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}> <span style={{ color: '#60a5fa' }}>LookVisa</span></h1>
                            <p>Your profile was viewed by a visa sponsor</p>
                            <hr />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '40px 30px', width: '100%' }}>
                            <p style={{ color: 'white', fontWeight: '600' }}>Hi, I am interested in your investor profile</p>
                            <p style={{ color: 'white', fontWeight: '600' }}>First Name: { visaSponsorData.firstname}</p>
                            <p style={{ color: 'white', fontWeight: '600' }}>Last Name: { visaSponsorData.lastname}</p>
                            <p style={{ color: 'white', fontWeight: '600' }}>Phone number: { visaSponsorData.phoneNumber}</p>
                            <p style={{ color: 'white', fontWeight: '600' }}>Comment: { visaSponsorData.comment}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '20px 30px', textAlign: 'center', color: '#ffffff' }}>
                            <p>If you have any questions, feel free to contact us at <a href="mailto:info@lookvisa.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>info@lookvisa.com</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: '#1e293b', padding: '10px 20px', textAlign: 'center', color: '#fff', fontSize: '12px' }}>
                            &copy; 2024 Lookvisa, All Rights Reserved
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Template;
