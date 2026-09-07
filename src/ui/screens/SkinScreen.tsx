// @ts-nocheck
import SkinCard from "../components/SkinCard";
import FilterPanel from "../components/FilterPanel";

import { FaExternalLinkAlt } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaEye } from "react-icons/fa";

function SkinScreen() {
    return (
        <>
            <div className="flex">
                <div className="flex justify-start flex-wrap w-2/3">
                    <SkinCard />
                    <SkinCard />
                    <SkinCard />
                    <SkinCard />
                    <SkinCard />
                    <SkinCard />
                </div>

                <div className="w-1/3">
                    <FilterPanel />
                </div>
            </div>
        </>
    )
}

export default SkinScreen