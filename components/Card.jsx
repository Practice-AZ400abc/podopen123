import React from 'react';

const Card = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-left text-left  h-full border rounded-r-lg shadow-lg max-w-sm md:h-[240px] bg-slate-800">
      <div className="mb-4 bg-blue-500 p-4 h-[100px] ">{icon}</div>
      <h2 className="font-semibold  text-xl mb-2 text-blue-500 pl-6">{title}</h2>
      <p className="text-white pl-6 pr-6">{description}</p>
    </div>
  );
};

export default Card;
