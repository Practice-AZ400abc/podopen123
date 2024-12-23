import { Plus } from 'lucide-react';
import React from 'react'

const UploadMedia = () => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
        }
    };

    return (
        <div className='bg-gray-200 w-fit p-6 rounded-md'>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="upload-button"
            />
            <label htmlFor="upload-button">
                <Plus size={20} />
            </label>
        </div>
    )
}

export default UploadMedia