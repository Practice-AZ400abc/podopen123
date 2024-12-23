import React from 'react'

const PreviewListing = () => {
    return (
        <div className='min-w-[500px] flex flex-col gap-2 items-start  bg-gray-200 rounded-md p-2'>
            <div className="flex w-full flex items-center justify-center gap-2">
                <img className='object-cover rounded-md' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm5lOGSysGKN0mcDWpuYeGwayqHtZ-vP9ncw&s" alt="" />
                <img className='object-cover rounded-md' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHBynS37DTH6W0jGKs2WDVggRgN1CbmxAKtX8jy0C7td7prnTxU-FCskWB_iqcvaxyFrU&usqp=CAU" alt="" />
            </div>
            <div className='flex flex-col gap-2 p-2'>
                <h1 className='text-bold text-2xl'>Your Listing Title</h1>
                <p>Listing description...</p>
            </div>
        </div>
    )
}

export default PreviewListing
