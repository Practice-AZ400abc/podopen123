import React from 'react';

const Card = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-left text-left p-6 border rounded-lg shadow-lg max-w-sm md:h-[240px] bg-slate-800">
      <div className="mb-4">{icon}</div>
      <h2 className="font-semibold  text-xl mb-2 text-blue-500">{title}</h2>
      <p className="text-white">{description}</p>
    </div>
  );
};

export default Card;
