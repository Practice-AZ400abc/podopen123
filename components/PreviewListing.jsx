import Image from "next/image";

const PreviewListing = ({ formData }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4">
            <div className="w-full">
                <h1 className="text-2xl font-semibold mb-4">Preview Your Listing Before Publishing</h1>
                <p className="mb-6">Ensure everything is correct before publishing.</p>
                <div className="flex flex-col gap-4 bg-white border rounded-md p-4">
                    {/* SponsorShip Description */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Sponsorship Description</h2>
                        <p className="text-md text-gray-600">{formData.sponsorShipDescription}</p>
                    </div>

                    {/* Images or PDFs */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Attachments</h2>
                        <div className="flex flex-wrap gap-4">
                            {formData.attachments && formData.attachments.length > 0 ? (
                                formData.attachments.map((attachment, index) =>
                                    attachment.endsWith(".pdf") ? (
                                        <a
                                            key={index}
                                            href={attachment}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border rounded-md p-2 bg-gray-100 w-32 h-32 flex items-center justify-center"
                                        >
                                            <p className="text-gray-500">PDF {index + 1}</p>
                                        </a>
                                    ) : (
                                        <Image
                                            key={index}
                                            src={attachment}
                                            alt={`Attachment ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="object-cover rounded-md w-32 h-32"
                                        />
                                    )
                                )
                            ) : (
                                <p className="text-gray-600">No attachments to display.</p>
                            )}
                        </div>
                    </div>

                    {/* Country for Investment and Industry */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <p className="text-sm bg-blue-100 p-2 rounded-md border font-bold">
                            <span className="text-black">Country for Investment:</span> {formData.countryForInvestment}
                        </p>
                        <p className="text-sm bg-blue-100 p-2 rounded-md border font-bold">
                            <span className="text-black">Industry:</span> {formData.investmentIndustry}
                        </p>
                    </div>

                    {/* Project Description */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Project Description</h2>
                        <p className="text-md text-gray-600">{formData.projectDescription}</p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Contact Information</h2>
                        <p className="text-md text-gray-600">
                            <strong>WhatsApp:</strong> {formData.whatsapp || "Not provided"}
                        </p>
                        <p className="text-md text-gray-600">
                            <strong>Telegram:</strong> {formData.telegram || "Not provided"}
                        </p>
                        <p className="text-md text-gray-600">
                            <strong>Phone:</strong> {formData.phone || "Not provided"}
                        </p>
                        <p className="text-md text-gray-600">
                            <strong>Email:</strong> {formData.contactEmail}
                        </p>
                    </div>

                    {/* Minimum Investment */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Minimum Investment</h2>
                        <p className="text-md text-gray-600">{formData.minimumInvestment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewListing;
