    import Manageservices from "@/components/manageservices/Manageservices";
import Panel from "@/components/panel/Panel";
    
    
    export default function Services (){
        return(
            <>
            <Panel/>

            <div className="pl-[12rem]">
                <Manageservices/>
            </div>
            </>
        );
    }