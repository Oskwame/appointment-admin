"use client";
import Bookedap from "@/components/bookedap/Bookedap";
import Panel from "@/components/panel/Panel";

const Booked: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar Panel */}
      <Panel />

      {/* Main Content */}
      <div className="pl-[13rem] flex-1">
        <Bookedap />
      </div>
    </div>
  );
};

export default Booked;
