"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const Confirmed: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchConfirmedAppointments() {
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
          `)
          .eq('status', 'confirmed');

        if (error) throw error;

        setAppointments(data || []);
      } catch (error) {
        console.error("Error fetching confirmed appointments:", error);
      }
    }

    fetchConfirmedAppointments();
  }, []);

  return (
    <div className="ml-10 max-w-full w-full">
        <header className=' z-10 top-0 left-0 justify-center p-4 fixed flex w-full bg-blue-400 text-white '>
            <h1 className=" font-bold text-2xl"> Confirmed Appointment</h1>
        </header>

        <main className=" mt-20">
      <table className="bg-white border border-gray-400">
        <thead>
          <tr>
            <th className="border-2 border-gray-400 py-2 px-16 text-center"> Name</th>
            <th className="border-2 border-gray-400 py-2 px-2 w-[10rem] text-center">Email</th>
            <th className="border-2 border-gray-400 py-2 px-4 text-center">Phone</th>
            <th className="border-2 border-gray-400 py-2 px-7 text-center">Service</th>
            <th className="border-2 border-gray-400 py-2 px-4 text-center w-[20rem]">Description</th>
            <th className="border-2 border-gray-400 py-2 px-4 text-center">Appointment Date</th>
            <th className="border-2 border-gray-400 py-2 px-4 text-center">Created At</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No confirmed appointments found.
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="border-2 border-gray-300 py-2 px-4">{appointment.name}</td>
                <td className="border-2 border-gray-300 py-2 px-4">{appointment.email}</td>
                <td className="border-2 border-gray-300 py-2 px-4">{appointment.phone}</td>
                <td className="border-2 border-gray-300 py-2 px-4">{appointment.service?.name || "N/A"}</td>
                <td className="border-2 border-gray-300 py-2 px-4">{appointment.description}</td>
                <td className="border-2 border-gray-300 py-2 px-4">{appointment.appointment_date}</td>
                <td className="border-2 border-gray-300 py-2 px-4">{appointment.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </main>
    </div>
  );
};

export default Confirmed;
