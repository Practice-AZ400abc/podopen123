import React from "react";

const PreviewListing = ({ formData }) => {
    return (
        <div className="min-w-[500px] flex flex-col gap-2 items-start bg-gray-200 rounded-md p-2">
            {/* Images */}
            <div className="flex w-full items-center justify-center gap-2">
                {formData.images.length > 0 ? (
                    formData.images.map((image, index) => (
                        <img
                            key={index}
                            className="object-cover rounded-md w-32 h-32"
                            src={image}
                            alt={`Preview ${index + 1}`}
                        />
                    ))
                ) : (
                    <p>No images to display</p>
                )}
            </div>

            {/* Title and Description */}
            <div className="flex flex-col gap-2 p-2">
                <h1 className="text-bold text-2xl">{formData.sponsorShipDescription}</h1>
                <p>{formData.projectDescription}</p>
            </div>
        </div>
    );
};

export default PreviewListing;
