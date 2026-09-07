// @ts-nocheck
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaEye } from "react-icons/fa";

function SkinCard() {
    return (
        <>
            <div className="flex justify-center px-2 gap-2">
                <div className="border-1 border-slate-700 bg-slate-700/20 p-2 rounded-sm">
                    <div className="flex justify-between">
                        <div>
                            <div className="text-md">$1033.2 [B]</div>
                            <div className="text-[10px]">0.128388833 [MW]</div>
                        </div>
                        <div className="text-[10px] flex items-end">Listing created 2 days ago</div>
                    </div>

                    <div className="flex gap-1">
                        <div className="flex gap-2 border-1 border-black">
                            <img src="https://placehold.co/160" alt="" />
                        </div>
                        {/* Logo/link over image = relative*/}
                        <div className="relative border-1 border-black">
                            <img src="https://placehold.co/160" alt="" />
                            <span className="absolute top-1 right-1 text-black text-sm">
                                <FaExternalLinkAlt size={18} />
                            </span>
                            <span className="absolute top-8 right-1 text-black text-sm">
                                <IoLogoGameControllerB size={20} />
                            </span>
                            <span className="absolute bottom-1 right-1 text-black text-sm">
                                <span className="text-[10px]">12</span>
                                <FaEye size={16} />
                            </span>
                        </div>
                    </div>

                    <div className="flex mt-2">
                        <div className="w-1/2 flex justify-evenly text-sm">
                            <div>
                                <div className="text-md">Backside</div>
                                <div className="text-blue-400">33.1%</div>
                                <div className="text-purple-400">37.2%</div>
                                <div className="text-yellow-400">93.3%</div>
                            </div>
                                
                            <div>
                                <div className="text-md">Playside</div>
                                <div className="text-blue-400">35.8%</div>
                                <div className="text-purple-400">43.6%</div>
                                <div className="text-yellow-400">13.8%</div>
                            </div>
                        </div>

                        <div className="w-1/2 flex p-2">
                            <div className="w-1/2">
                                <img src="https://placehold.co/50" alt="" />
                            </div>

                            <div className="w-5/6">
                                <div className="text-sm text-start ml-1">underlover5</div>
                                <div className="text-green-600 text-sm text-start ml-1">Online</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkinCard