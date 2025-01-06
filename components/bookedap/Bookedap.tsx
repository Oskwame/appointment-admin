"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Panel from "@/components/panel/Panel";

const Booked: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("/api/send-sms.ts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: appointment.phone,
          message: `Hello ${appointment.name}, your appointment for ${appointment.service?.name || "this service"} on ${appointment.appointment_date} has been confirmed.`,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to send SMS. Please try again later.");
      }

      alert("SMS sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(`An error occurred: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  // display loading

  // useEffect(() => {
  //     const timeout = setTimeout(() => setLoading(false), 5000);
  //     return () => clearTimeout(timeout); // Cleanup
  // }, []);

  // if (loading) {
  //     return <div>please wait Loading...</div>; // Optional loading state
  // }

  return (
    <div className="max-w-full w-full">
      <header className="bg-blue-400 text-white p-4 flex justify-center items-center fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-bold">Booked Appointments</h1>
      </header>

      <main className="mt-20">
        <table className="min-w-full bg-white border border-gray-400">
          <thead>
            <tr>
              <th className="border-2 border-gray-400 py-2 px-16 text-center">Name</th>
              <th className="border-2 border-gray-400 py-2 px-7 text-center">Email</th>
              <th className="border-2 border-gray-400 py-2 px-7 text-center">Phone</th>
              <th className="border-2 border-gray-400 py-2 px-7 text-center">Service</th>
              <th className="border-2 border-gray-400 py-2 px-20 text-center">Description</th>
              <th className="border-2 border-gray-400 py-2 px-4 text-center">Appointment Date</th>
              <th className="border-2 border-gray-400 py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">Loading...</td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">No appointments found.</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="border-2 border-gray-300 py-2 px-1">{appointment.name}</td>
                  <td className="border-2 border-gray-300 py-2 px-4">{appointment.email}</td>
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
                      {loading ? "Sending..." : "Confirm"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Booked;
