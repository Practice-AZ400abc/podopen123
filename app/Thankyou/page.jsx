import { Check } from 'lucide-react';
import React from 'react';
const Thankyou = () => {
    return (
        <div className='h-[50vh] flex flex-col gap-2 justify-center items-center'>
           <div className='bg-green-200 p-4 rounded-full'>
           <Check  size={64} className='text-green-400 text-4xl' />
           </div>
            <h1>Thank you for your order!</h1>
        </div>
    );
}
export default Thankyou;