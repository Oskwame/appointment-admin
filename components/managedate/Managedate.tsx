"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

const ManageDate: React.FC = () => {
  const [dates, setDates] = useState<any[]>([]);
  const [newDate, setNewDate] = useState<string>("");

  // Fetch available dates on component load
  useEffect(() => {
    async function fetchDates() {
      const { data, error } = await supabase
        .from("available_dates")
        .select("*")
        .order("appointment_date", { ascending: true });

      if (error) {
        console.error("Error fetching dates:", error);
      } else {
        setDates(data || []);
      }
    }
    fetchDates();
  }, []);

  // Add a new available date
  const handleAddDate = async () => {
    if (!newDate) {
      alert("Please select a date.");
      return;
    }
  
    const { data, error } = await supabase
      .from("available_dates")
      .insert([{ appointment_date: newDate }])
      .select("*"); // Ensure data is returned after insert
  
    if (error) {
      console.error("Error adding date:", error);
      alert("Error adding date.");
      return;
    }
  
    if (data && data.length > 0) {
      alert("Date added successfully!");
      setDates((prevDates) => [...prevDates, ...data]);
      setNewDate("");
    } else {
      alert("Unexpected error: No data returned.");
    }
  };
  

  // Toggle availability status
  const handleToggleAvailability = async (id: number, isAvailable: boolean) => {
    const { error } = await supabase
      .from("available_dates")
      .update({ is_available: !isAvailable })
      .eq("id", id);

    if (error) {
      console.error("Error toggling availability:", error);
    } else {
      setDates((prevDates) =>
        prevDates.map((date) =>
          date.id === id ? { ...date, is_available: !isAvailable } : date
        )
      );
    }
  };

  // Delete a date
  const handleDeleteDate = async (id: number) => {
    const { error } = await supabase.from("available_dates").delete().eq("id", id);

    if (error) {
      console.error("Error deleting date:", error);
    } else {
      setDates((prevDates) => prevDates.filter((date) => date.id !== id));
    }
  };

  return (
    <div className="ml-10 mt-8">
        <header className="z-10 top-0 left-0 flex fixed w-full justify-center p-4 bg-blue-400 text-white">
      <h1 className="text-2xl font-bold">Manage Appointment Dates</h1>
        </header>

      {/* Add New Date */}
      <div className="mb-6 mt-10">
        <label className="block font-medium mb-2">Add New Date</label>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="border rounded px-4 py-2 w-64"
        />
        <button
          onClick={handleAddDate}
          className="ml-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Date
        </button>
      </div>

      {/* Display Dates */}
      <table className="border-collapse border border-gray-400 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Date</th>
            <th className="border border-gray-400 px-4 py-2">Available</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dates.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">No dates found.</td>
            </tr>
          ) : (
            dates.map((date) => (
              <tr key={date.id}>
                <td className="border border-gray-300 px-4 py-2">{date.appointment_date}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {date.is_available ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleToggleAvailability(date.id, date.is_available)}
                    className={`px-4 py-2 mr-2 rounded ${
                      date.is_available
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {date.is_available ? "Mark Unavailable" : "Mark Available"}
                  </button>
                  <button
                    onClick={() => handleDeleteDate(date.id)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDate;
