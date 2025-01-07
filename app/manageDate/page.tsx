"use client";
import Confirmed from "@/components/confirmedap/Confirmedap";
import ManageDate from "@/components/managedate/Managedate";
import Panel from "@/components/panel/Panel";

const Booked: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar Panel */}
      <Panel />

      {/* Main Content */}
      <div className="pl-[13rem] flex-1">
        <ManageDate/>
      </div>
    </div>
  );
};

export default Booked;