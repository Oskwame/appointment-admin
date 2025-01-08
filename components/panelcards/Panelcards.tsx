"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const ServiceCards: React.FC = () => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalAppointment:0,
    bookedAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        //fetching services
        const { data: services } = await supabase
        .from("services")
        .select("id");

        //fetching total appointment
        const { data: totalappointment } = await supabase
        .from("appointment")
        .select ("id");
    
        //fetching booked
        const { data: booked } = await supabase
          .from("appointment")
          .select("id")
          .eq("status", "booked");

          //fetching confirmed 
        const { data: confirmed } = await supabase
          .from("appointment")
          .select("id")
          .eq("status", "confirmed");

        setStats({
          totalAppointment: totalappointment?.length || 0,
          totalServices: services?.length || 0,
          bookedAppointments: booked?.length || 0,
          pendingAppointments: (totalappointment?.length || 0) - (confirmed?.length || 0),
          confirmedAppointments: confirmed?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();

    const appointmentSubscription = supabase
      .channel("appointments")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointment" }, (payload) => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(appointmentSubscription);
    };
  }, []);

  return (
    <div className=" absolute min-h-screen py-0 left-48">
      <h1 className="text-center font-serif text-4xl font-bold mb-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
  WELCOME, ADMIN!
</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2">Total Services</h2>
          <p className="text-5xl font-extrabold">{stats.totalServices}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2">Total Appointments</h2>
          <p className="text-5xl font-extrabold">{stats.totalAppointment}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2">Pending Appointments</h2>
          <p className="text-5xl font-extrabold">{stats.pendingAppointments}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2">Confirmed Appointments</h2>
          <p className="text-5xl font-extrabold">{stats.confirmedAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;