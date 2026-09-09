//@ts-nocheck
import { useState } from "react";

import { IoIosNotifications } from "react-icons/io";
import { TIERS } from "../utils/paintseeds";

function FilterPanel() {
    const [filterTier, setFilterTier] = useState(false)
    const [buyType, setBuyType] = useState(false)
    const [category, setCategory] = useState(false)
    const [limit, setLimit] = useState(false)

    return (
        <>
            <div className="sticky top-5 border-1 border-slate-700 bg-slate-700/20 rounded-md p-6">
                <div className="text-2xl text-slate-300">Filter Panel</div>

                <div className="mt-4">
                    <div className="text-slate-300">Paint Seed</div>
                    <div className="flex gap-4 justify-center mt-2">
                        {
                            Object.entries(TIERS).map(([tier, info]) => (
                                <div key={ tier }>
                                    <button
                                        onClick={() => setFilterTier(tier)}
                                        style={{ color: info.color }}
                                        className={`text-[12px] px-1 py-1 rounded-[3px] border-2 border-transparent hover:border-neutral-400 transition-colors 
                                            ${ filterTier === tier ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                                        }
                                    >
                                        { info.label }
                                    </button>                                
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="mt-6">
                    <div className="text-slate-300">Buy Type</div>
                    <div className="mt-2 flex justify-center gap-3">
                        <button
                            onClick={() => setBuyType("buy_now")}
                            className={`text-sm p-1 rounded-sm w-24 border border-transparent hover:border-neutral-400 transition-colors ${
                                buyType === "buy_now" ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                            }
                        >
                            Buy Now [B]
                        </button>

                        <button
                            onClick={() => setBuyType("auction")}
                            className={`text-sm p-1 rounded-sm w-24 border border-transparent hover:border-neutral-400 transition-colors 
                                ${ buyType === "auction" ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                            }
                        >
                            Auction [A]
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="text-slate-300">Category</div>
                    <div className="flex gap-3 justify-center mt-2">
                        <button 
                            onClick={() => setCategory(0)}
                            className={`text-sm border-sm p-1 rounded-sm w-12 border border-transparent hover:border-neutral-400 transition-colors
                                ${ category === 0 ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                            }        
                        >
                            Any
                        </button>

                        <button 
                            onClick={() => setCategory(1)}
                            className={`text-sm border-sm p-1 rounded-sm w-18 border border-transparent hover:border-neutral-400 transition-colors
                                ${ category === 1 ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                            }        
                        >
                            Normal
                        </button>

                        <button 
                            onClick={() => setCategory(2)}
                            className={`text-sm border-sm p-1 rounded-sm w-19 border border-transparent hover:border-neutral-400 transition-colors
                                ${ category === 2 ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                            }        
                        >
                            Stattrack
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="text-slate-300">Limit</div>
                    <div className="flex gap-4 justify-center mt-2">
                        <button
                            onClick={() => setLimit(1)} 
                            className={`text-sm border-sm p-1 rounded-sm w-8 border border-transparent hover:border-neutral-400 transition-colors
                                ${ limit === 1 ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                            }
                        >
                            1
                        </button>
                        <button
                            onClick={() => setLimit(3)} 
                            className={`text-sm border-sm p-1 rounded-sm w-8 border border-transparent hover:border-neutral-400 transition-colors
                                ${ limit === 3 ? "bg-[#4a5454]" : "bg-[#373f3f]"}`    
                            }
                        >
                            3
                        </button>
                        <button
                            onClick={() => setLimit(5)} 
                            className={`text-sm border-sm p-1 rounded-sm w-8 border border-transparent hover:border-neutral-400 transition-colors
                                ${ limit === 5 ? "bg-[#4a5454]" : "bg-[#373f3f]"}`
                            }
                        >
                            5
                        </button>
                        <button
                            onClick={() => setLimit(10)} 
                            className={`text-sm border-sm p-1 rounded-sm w-8 border border-transparent hover:border-neutral-400 transition-colors
                                ${ limit === 10 ? "bg-[#4a5454]" : "bg-[#373f3f]"}`    
                            }
                        >
                            10
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                    <button>Notify</button>
                    <button>Browse</button>
                </div>
            </div>
        </>
    )
}

export default FilterPanel;