"use client"

import Topbar from "./topbar/Topbar"
import LeftSection from "./leftsection/LeftSection"
import RightSection from "./rightsection/RightSection"
import Context from "./Context"
import { useState } from "react"

const Main = () => {
    const [storyMode, setStoryMode] = useState(false)
    const [addedItems, setAddedItems] = useState([])
    return (
        <Context.Provider value={{
            storyMode,
            setStoryMode,
            addedItems,
            setAddedItems
        }}>
            <div className="my-10 mx-auto w-8/12">
                <Topbar />
                <div className="flex">
                    <LeftSection />
                    <RightSection />
                </div>
            </div>
        </Context.Provider>
    )
}

export default Main