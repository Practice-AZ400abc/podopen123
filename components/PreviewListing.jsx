import Image from "next/image";

const PreviewListing = ({ formData }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="">
                <h1 className="text-2xl font-semibold">Preview Your Listing Before Publiblishing</h1>
                <p>Ensure everything is correct before publishing</p>
            </div>
            <div className="min-w-[500px] flex flex-col gap-2 items-start bg-white border rounded-md p-2">
                {/* Images */}
                <div className="flex flex-col gap-2 p-2">
                    <h1 className="font-bold text-2xl">{formData.sponsorShipDescription}</h1>
                </div>
                <div className="flex w-full items-start justify-start gap-2">
                    {formData.images.length > 0 ? (
                        formData.images.map((image, index) => (
                            <Image
                                key={index}
                                className="object-cover rounded-md w-32 h-32"
                                src={image}
                                width={"100"}
                                height={"100"}
                                alt={`Preview ${index + 1}`}
                            />
                        ))
                    ) : (
                        <p>No images to display</p>
                    )}
                </div>

                {/* Title and Description */}

                <div className="flex flex-col md:flex-row gap-2 p-2">
                    <p className="text-sm text-blue-500 p-2  rounded-md border font-bold"><span className="text-black">Country for Investment:</span> {formData.countryForInvestment}</p>
                    <p className="text-sm text-blue-500 p-2  rounded-md border font-bold"><span className="text-black">Industry:</span> {formData.investmentIndustry}</p>
                </div>


                <div className="flex flex-col gap-2 p-2">
                    <p className="text-md text-black">{formData.projectDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default PreviewListing;
