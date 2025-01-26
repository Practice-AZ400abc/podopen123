import { MessageCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from 'react';

const Contactform = ({ investor }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        additionalNotes: "",
    })

    const handleFormSubmission = async () => {
        try {
            const sendEmailResponse = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: investor.email,
                    action: "contactedByVisaSponsor",
                    visaSponsorData: formData
                }),
            });

            if (!sendEmailResponse.ok) {
                throw new Error("Failed to send email");
            }
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    }

    return (
        <div className="w-50 bg-white border p-2 rounded-md">
            <h1 className="text-lg">Message Investor</h1>
            <p className="text-slate-500">Please fill these Fields to contact investor</p>
            <form onSubmit={handleFormSubmission} className="mt-4">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col ">
                        <label htmlFor="">First Name</label>
                        <input onChange={(e) => (setFormData({ ...formData, firstName: e.target.value }))} type="text" maxLength={50} className="border p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="">Last Name</label>
                        <input onChange={(e) => (setFormData({ ...formData, lastName: e.target.value }))} type="text" maxLength={50} className="border p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="">Phone Number</label>
                        <PhoneInput onChange={(phone) => (setFormData({ ...formData, phoneNumber: phone.target.value }))} defaultCountry={'us'} inputExtraProps={{ name: 'phone', required: true, autoFocus: true }}
                            style={{ width: '100%', height: '40px', borderRadius: '5px', }}
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="">Notes Field</label>
                        <textarea name="" id=""
                            className="border p-2 min-w-[500px] rounded-md"
                            maxLength={200}
                            onChange={(e) => (setFormData({ ...formData, additionalNotes: e.target.value }))}></textarea>
                    </div>
                </div>
                <button type="submit" className="flex  gap-2 hover:bg-blue-300 bg-blue-400 text-white p-2 rounded-md mt-4">
                    <MessageCircle />
                    Messsage
                </button>
            </form>
        </div>
    )
}

export default Contactform;