import React from "react";
import { FaCogs, FaCalendarAlt, FaBell, FaCalendarCheck  } from 'react-icons/fa';

const Panel: React.FC = () => {
  return (
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
            <a href="/confirmedAppointment" className="flex items-center px-3 py-3 hover:bg-blue-400">
              <FaCalendarCheck className="mr-3 text-xl" />
              confirmed Appointments
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
  );
};

export default Panel;
