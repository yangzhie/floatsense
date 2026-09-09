// @ts-nocheck
import SkinCard from "../components/SkinCard";
import FilterPanel from "../components/FilterPanel";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import BackButton from "../components/BackButton";

function SkinScreen() {
    // Obtain the parameter from main route mapping in App.tsx
    const { defIndex } = useParams();
    
    // Call CSFloat API, set all listings
    const [listings, setListings] = useState(null); 
    useEffect(() => {
        window.api.fetchOnce(Number(defIndex), null, 44, 5, null, 0).then(setListings);
    }, [defIndex])

    return (
        <>
            <div className="">
                <div>
                    <BackButton />
                </div>

                <div className="flex">
                    <div className="flex justify-start flex-wrap w-2/3">
                        {
                            listings?.map((item) => (
                                <SkinCard skin={ item } />
                            ))
                        }
                    </div>

                    <div className="w-1/3">
                        <FilterPanel />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkinScreen