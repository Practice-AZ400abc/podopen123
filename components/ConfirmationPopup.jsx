import React from "react";
import { Button } from "@/components/ui/button";

const ConfirmationPopup = ({ title, description, onPay, onSaveDraft, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className="text-sm text-gray-600 mb-6">{description}</p>
                <div className="flex flex-col gap-4">
                    <Button className="bg-blue-500 text-white hover:bg-blue-400" onClick={onPay}>
                        Pay Now
                    </Button>
                    <Button
                        className="bg-green-500 text-white hover:bg-green-400"
                        onClick={onSaveDraft}
                    >
                        Save as Draft
                    </Button>
                    <Button
                        className="bg-red-500 text-white hover:bg-red-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
