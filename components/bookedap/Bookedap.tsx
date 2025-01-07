"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Panel from "@/components/panel/Panel";
import { FaSpinner } from "react-icons/fa";

const Booked: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('appointment')
          .select(`
            id,
            name,
            email,
            phone,
            service:service_id (name),
            description,
            appointment_date,
            created_at
          `);

        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        alert("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);
  const confirmAppointment = async (appointment: any) => {
    setLoading(true);
  
    try {
      const { error } = await supabase
        .from('appointment')
        .update({ status: 'confirmed' })
        .eq('id', appointment.id);
  
      if (error) throw error;
  
      alert("Appointment confirmed!");
      setAppointments((prev) => prev.filter((a) => a.id !== appointment.id)); // Remove from booked list
    } catch (error) {
      console.error("Error confirming appointment:", error);
      alert("Failed to confirm the appointment.");
    } finally {
      setLoading(false);
    }
  };
  

  // Filter appointments based on the search term
  const filteredAppointments = appointments.filter(appointment =>
    appointment.name.toLowerCase().includes(search.toLowerCase()) ||
    appointment.email.toLowerCase().includes(search.toLowerCase()) ||
    appointment.phone.toLowerCase().includes(search.toLowerCase()) ||
    appointment.service?.name.toLowerCase().includes(search.toLowerCase()) ||
    appointment.appointment_date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-full w-full">
      <header className="bg-blue-400 text-white p-4 flex justify-center items-center fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-bold">Booked Appointments</h1>
         {/* Search Bar */}
         <div className="px-4 flex justify-end">
          <input
            type="text"
            placeholder="Search appointments..."
            className="px-2 py-2 border border-gray-400 rounded w-full text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="mt-20">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full lg:ml-52">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
            <span className="ml-3 text-lg">Loading appointments...</span>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-4 lg:ml-[25rem]">No appointments found.</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-400">
            <thead>
              <tr>
                <th className="border-2 border-gray-400 py-2 px-16 text-center">Name</th>
                <th className="border-2 border-gray-400 py-2 px-7 text-center">Email</th>
                <th className="border-2 border-gray-400 py-2 px-7 text-center">Phone</th>
                <th className="border-2 border-gray-400 py-2 px-7 text-center">Service</th>
                <th className="border-2 border-gray-400 py-2 px-16 text-center">Description</th>
                <th className="border-2 border-gray-400 py-2 px-4 text-center">Appointment Date</th>
                <th className="border-2 border-gray-400 py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="border-2 border-gray-300 py-2 px-1">{appointment.name}</td>
                  <td className="border-2 border-gray-300 py-2 px-1">{appointment.email}</td>
                  <td className="border-2 border-gray-300 py-2 px-4">{appointment.phone}</td>
                  <td className="border-2 border-gray-300 py-2 px-4">{appointment.service?.name || "N/A"}</td>
                  <td className="border-2 border-gray-300 py-2 px-4">{appointment.description}</td>
                  <td className="border-2 border-gray-300 py-2 px-4">{appointment.appointment_date}</td>
                  <td className="border-2 border-gray-300 py-2 px-4">
                    <button
                      onClick={() => confirmAppointment(appointment)}
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded disabled:bg-gray-400"
                      disabled={loading}
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        "Confirm"
                      )}
                      {loading && "Sending..."}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Booked;
