import React from 'react'
const InputField = ({ label, value, onChange, id, type = "text", placeholder = "", errors }) => {
    return (
        <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-gray-50 p-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:black focus:border-blue-500"
            />
             {errors && <span style={{ color: 'red' }}>{errors}</span>}
        </div>
    );
};

export default InputField