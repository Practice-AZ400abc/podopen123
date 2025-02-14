import { Loader2, MessageCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from 'react';
import toast from "react-hot-toast";

const Contactform = ({ investor, user }) => {
    const [Loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        sponsorEmail: user.email,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        additionalNotes: "",
    });

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const sendEmailResponse = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: investor.email,
                    action: "contactedByVisaSponsor",
                    visaSponsorData: formData,
                }),
            });

            if (!sendEmailResponse.ok) {
                throw new Error("Failed to send email");
            }

            // Reset form fields after successful submission
            setFormData({
                email: user.email,
                firstName: "",
                lastName: "",
                phoneNumber: "",
                additionalNotes: "",
            });
            toast.success("Message sent successfully");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Failed to send email:", error);
        }
    };

    return (
        <div className="bg-white w-full p-2 rounded-md">
            <h1 className="text-lg">Message Investor</h1>
            <p className="text-slate-500">Please fill these fields to contact the investor</p>
            <form onSubmit={(e) => handleFormSubmission(e)} className="mt-4">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col ">
                        <label htmlFor="">First Name</label>
                        <input
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                            }
                            type="text"
                            maxLength={50}
                            className="border p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="">Last Name</label>
                        <input
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                            }
                            type="text"
                            maxLength={50}
                            className="border p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="">Phone Number</label>
                        <PhoneInput
                            value={formData.phoneNumber}
                            onChange={(value) =>
                                setFormData((prev) => ({ ...prev, phoneNumber: value }))
                            }
                            defaultCountry={'us'}
                            inputExtraProps={{ name: 'phone', required: true, autoFocus: true }}
                            style={{ width: '100%', height: '40px', borderRadius: '5px' }}
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="">Notes Field</label>
                        <textarea
                            value={formData.additionalNotes}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))
                            }
                            className="border p-2 rounded-md"
                            maxLength={200}
                        />
                    </div>
                </div>
                <button
                    disabled={Loading}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 hover:bg-blue-300 bg-blue-400 text-white p-2 rounded-md mt-4"
                >
                    {Loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <MessageCircle />
                            <span>Send Message to Investor</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default Contactform;
