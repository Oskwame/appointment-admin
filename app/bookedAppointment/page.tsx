"use client";

import { useEffect, useState } from "react";
import Bookedap from "@/components/bookedap/Bookedap";
import Panel from "@/components/panel/Panel";

export default function Booked() {


    return (
        <>
            <Panel />

            <div className="pl-[12rem]">
                <Bookedap />
            </div>
        </>
    );
}
