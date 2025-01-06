"use client"
import React, { useEffect, useState } from "react";
import { FaCogs, FaCalendarAlt, FaBell } from 'react-icons/fa';

const Panel: React.FC = () => {

  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timeout); // Cleanup
    }, []);

    if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-screen w-screen lg:ml-20 bg-gray-100">
              {/* Name or Title Above the Loading Bar */}
              <h3 className="text-3xl font-bold text-blue-500">kasa Family Hospital</h3>
              <h2 className="text-xl mb-4 text-black">
                  Loading Appointments...
              </h2>

              {/* Loading Bar */}
              <div className="relative w-1/2 h-2 bg-gray-300 rounded overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-blue-400 animate-slide"></div>
              </div>
          </div>
      );
  }
  return (
    <div className="max-w-full w-full">
    <header className="bg-blue-400 text-white p-4 flex justify-center items-center fixed top-0 left-0 w-full z-10">
      <h1 className="text-2xl font-bold">Appointment Booking Admin Panel</h1>
    </header>
   
    <aside className="w-48 bg-gray-100 h-full fixed border-2 border-blue-400">
      <nav className="py-6 mt-10">
        <ul>
          <li>
            <a href="/bookedAppointment" className="flex items-center px-3 py-3 hover:bg-blue-400">
              <FaCalendarAlt className="mr-3 text-xl" />
              Booked Appointments
            </a>
          </li>
          <li>
            <a href="/manageServices" className="flex items-center px-3 py-3 hover:bg-blue-400">
              <FaCogs className="mr-3 text-xl" />
              Manage Services
            </a>
          </li>
          <li>
            <a href="/alerts" className="flex items-center px-3 py-3 hover:bg-blue-400">
              <FaBell className="mr-3 text-xl" />
              Alerts
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    </div>
  );
};

export default Panel;
