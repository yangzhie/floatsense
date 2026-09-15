// @ts-nocheck
import toast from "react-hot-toast";

import SkinCard from "../components/SkinCard";
import FilterPanel from "../components/FilterPanel";
import { getSeeds } from "../utils/helpers";

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

    // Case: no listings listed
    useEffect(() => {
        if (listings?.length === 0) {
            toast.error("No listings of that tier exist!");
        }
    }, [listings]);

    // Browse call once to get specific skin info
    const handleBrowse = ({ filterTier, buyType, category, limit }) => {
        // Get seeds of that tier
        const seeds = getSeeds(Number(defIndex), filterTier);

        // Check if the tier even exists for the weapon
        if (seeds === null) {
            toast.error("No listings of that tier exist!");
            return;
        }

        window.api.fetchOnce(Number(defIndex), seeds, 44, limit, buyType, category).then(setListings);
    }; 

    // Null check
    if (listings === null) {
        return (
            <div>Couldn't reach CSFloat.</div>
        )
    }

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
                        <FilterPanel onBrowse={ handleBrowse }/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkinScreen