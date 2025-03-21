import { CalendarCheck, Loader2, MessageCircle, X } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from 'react';
import toast from "react-hot-toast";

const Contactform = ({ investor, user, onClose, setShowContactForm }) => {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: investor.email,
                    action: "contactedByVisaSponsor",
                    visaSponsorData: formData,
                }),
            });

            if (!sendEmailResponse.ok) throw new Error("Failed to send email");

            setFormData({
                sponsorEmail: user.email,
                firstName: "",
                lastName: "",
                phoneNumber: "",
                additionalNotes: "",
            });

            toast.success("Message sent successfully");

            // Close dialog only if `onClose` is provided
            if (onClose) onClose();
        } catch (error) {
            console.error("Failed to send email:", error);
            toast.error("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelForm = () => {
         setShowContactForm(false);
    };
    return (
        <div className="bg-white absolute top-1/2 left-1/2 shadow-md max-w-[500px] w-full p-2 rounded-md transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-lg bg-black p-2 text-blue-400 text-center rounded-sm">Contact Form: Message Investor</h1>
                </div>
                <X onClick={handleCancelForm} className="bg-blue-400 rounded-md cursor-pointer hover:bg-blue-300"/>
            </div>
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
