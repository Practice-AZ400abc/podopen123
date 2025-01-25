import { MessageCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
const Contactform = () => {
    return(
        <div className="w-50 bg-white border p-2 rounded-md">
           <h1 className="text-lg">Message Investor</h1>
           <p className="text-slate-500">Please fill these Fields to contact investor</p>
           <form action="" className="mt-4">
           <div className="flex flex-col space-y-4">
           <div className="flex flex-col ">
                <label htmlFor="">First Name</label>
                <input type="text" maxLength={50} className="border p-2 rounded-md"/>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="">Last Name</label>
                <input type="text" maxLength={50} className="border p-2 rounded-md"/>
            </div>
            <div className="flex flex-col ">
                <label htmlFor="">Phone Number</label>
                <PhoneInput defaultCountry={'us'} inputExtraProps={{name: 'phone', required: true, autoFocus: true}} 
                style={{width: '100%', height: '40px', borderRadius: '5px', }}
                />
            </div>
            <div className="flex flex-col ">
                <label htmlFor="">Notes Field</label>
                <textarea name="" id=""
                className="border p-2 min-w-[500px] rounded-md"
                maxLength={200}></textarea>
            </div>
           </div>
           <button className="flex  gap-2 hover:bg-blue-300 bg-blue-400 text-white p-2 rounded-md mt-4">
            <MessageCircle />
            Messsage
            </button>
           </form>
        </div>
    )
}

export default Contactform;