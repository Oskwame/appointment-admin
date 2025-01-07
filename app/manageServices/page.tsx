import dynamic from "next/dynamic";

// Dynamic import for better performance
const Panel = dynamic(() => import("@/components/panel/Panel"));
const Manageservices = dynamic(() => import("@/components/manageservices/Manageservices"));

const Services: React.FC = () => {
  return (
    <>
      {/* Sidebar Panel */}
      <Panel />

      {/* Main Content */}
      <div className="pl-[12rem] lg:pl-[12rem] ">
        <Manageservices />
      </div>
    </>
  );
};

export default Services;
