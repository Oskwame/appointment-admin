"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { FaTrashCan } from "react-icons/fa6";

const Service: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [services, setServices] = useState<any[]>([]); // Services list
  const router = useRouter();

  // Fetch services from the database
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

  // Delete a service
  const deleteService = async (id: any) => {
    const confirmed = confirm("Are you sure you want to delete this service?");
    if (!confirmed) return;
  
    try {
      const { error } = await supabase.from("services").delete().eq("id", id.toString());
      if (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service");
      } else {
        setServices((prev) => prev.filter((service) => service.id !== id)); // Update the state
        setFeedbackMessage("Service deleted successfully!");
      }
    } catch (err) {
      console.error("Unexpected error while deleting service:", err);
      alert("An error occurred while deleting the service.");
    }
  };
  


  // Call fetchServices on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage("");

    try {
      const { error } = await supabase.from("services").insert([formData]);

      if (error) {
        console.error("Error adding service:", error);
        setFeedbackMessage("Error adding service: " + error.message);
      } else {
        setFeedbackMessage("New service added successfully!");
        setFormData({ name: "", description: "" }); // Clear form
        await fetchServices(); // Refresh the list
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setFeedbackMessage("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full w-full">
      {/* Header */}
      <header className="bg-blue-400 text-white p-4 flex justify-center items-center fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-bold">Manage Services</h1>
      </header>

      {/* Main Content */}
      <div className=" lg:ml-28 mt-20 p-6 bg-gray-200 rounded-lg shadow-lg">
        {/* Feedback Message */}
        {feedbackMessage && (
          <div
            className={`p-4 rounded ${
              feedbackMessage.includes("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {feedbackMessage}
          </div>  
        )}

        {/* Add Service Form */}
        <h1 className="text-2xl font-bold text-blue-500">Add New Service</h1>
        <form onSubmit={handleSubmit} className="flex items-start gap-4 mb-6">
          {/* Service Name */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
              Service Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-[15rem]"
              placeholder="Enter service name"
            />
          </div>

          {/* Service Description */}
          <div className="flex-1">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="description"
            >
              Service Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 w-[20rem]"
              placeholder="Enter service description"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 rounded w-20 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-medium`}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>

       {/* Services Table */}
       <div className="lg:ml-28 mt-7">
       <h1 className="text-2xl font-bold text-blue-500 flex justify-center">Available Services</h1>
        <div className="overflow-x-auto mt-4">
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
    </div>
  );
};

export default Service;
