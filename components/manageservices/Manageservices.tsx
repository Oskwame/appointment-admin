"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/utils/supabaseClient";
import { FaTrashCan } from "react-icons/fa6";


//stating Variables
const Service : React.FC=()=>{
const [formData, setFormData] = useState({
    name:"",
    description:"",
});

const [loading, setLoading] =useState(false);
const [feedbackMessage, setFeedbackMessage] = useState<string>("");
const [services, setServices] =useState<any[]>([]);


//Fetching Service From database and display on table
const fetchServices = async () => {
  try {
    const { data, error } = await supabase.from("services").select("*");

    if (error) {
      console.error("Error fetching services:", error);
    } else {
      setServices(data || []);
    }
  } catch (err) {
    console.error("Unexpected error while fetching services:", err);
    alert("Failed to load services");
  }
};
 
const deleteService = async (id:number)=>{
    const confirmed =confirm ("are you sure  you want to delete this service? ")
    if (!confirmed)return;
    try{
        const {error} = await supabase.from("services").delete().eq("id", id);
    
    if (error){
        console.error("Error deleting service", error)
        alert("Failed to delete service");
    } else{
        setServices((prev) => prev.filter((service)=>service.id !== id))
        setFeedbackMessage("service deleted successfully!");
    }
}
catch(err){
        console.error("unexpected error while deleting service", err)
        alert("An error occurred while deleting the service");
   

    }
};

//Fetch service on mount of component

useEffect(()=>{
  fetchServices();
},[]);

    return(
      <div className="max-w-full w-full">
    
        <header className=" z-10 flex justify-center items-center text-white fixed top-0 left-0 w-full p-4  bg-blue-400">
          <h1 className=" text-3xl font-bold"> Manage Services</h1>
        </header>
        <div>
             <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-10 py-2 text-center"> <FaTrashCan/> </th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service: any) => (
                  <tr key={service.id}>
                    <td className="border border-gray-300 px-4 py-2">{service.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{service.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{service.description}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(service.created_at).toLocaleString()}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                  <button
                    onClick={() => deleteService(service.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
    );
};
export default Service;