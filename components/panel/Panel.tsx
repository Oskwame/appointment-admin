import React from "react";
import { FaCogs, FaCalendarAlt, FaBell, FaCalendarCheck,FaCalendarPlus,FaHome   } from 'react-icons/fa';
import { TbCalendarCog } from "react-icons/tb";

const Panel: React.FC = () => {
  return (
    <aside className="w-48 bg-gray-100 h-full fixed border-2 border-blue-400">
      <nav className="py-6 mt-11">
        <ul>
          <li>
            <a href="/" className="flex items-center px-3 py-2 font-serif">
            <FaHome className="text-xl mr-3 "/>
            Dashboard
            </a>
          </li>
          <hr />
          <li>
            <a href="/bookedAppointment" className="flex items-center px-3 py-3 hover:bg-blue-400 font-serif">
              <FaCalendarAlt className="mr-3 text-xl font-serif" />
              Booked Appointments
            </a>
          </li>
   <hr className="" />
          <li>
            <a href="/confirmedAppointment" className="flex items-center px-3 py-3 hover:bg-blue-400 font-serif">
              <FaCalendarCheck className="mr-3 text-xl font-serif" />
              confirmed Appointments
            </a>
          </li>
          <hr className="" />
          <li>
            <a href="/manageServices" className="flex items-center px-3 py-3 hover:bg-blue-400 font-serif">
              <FaCogs className="mr-3 text-xl font-serif" />
              Manage Services
            </a>
          </li>
          <hr className="" />
          <li>
            <a href="/manageDate" className="flex items-center px-3 py-3 hover:bg-blue-400 font-serif">
              <FaCalendarPlus className="mr-3 text-xl font-serif" />
              Manage Appointment date
            </a>
          </li>
          <hr className="" />
          <li>
            <a href="/alerts" className="flex items-center px-3 py-3 hover:bg-blue-400 font-serif text-l">
              <FaBell className="mr-3 text-xl" />
              Alerts
            </a>
          </li>
          <hr />
        </ul>
      </nav>
    </aside>
  );
};

export default Panel;
