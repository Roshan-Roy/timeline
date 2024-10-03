"use client"

import Topbar from "./topbar/Topbar"
import LeftSection from "./leftsection/LeftSection"
import RightSection from "./rightsection/RightSection"
import Context from "./Context"
import { useState, useEffect } from "react"

const Main = () => {
    const [storyMode, setStoryMode] = useState(false)
    const [addedItems, setAddedItems] = useState([])
    const [trackValue, setTrackValue] = useState(15)
    const [timelineValue, setTimelineValue] = useState(0)
    const [scaleLength, setScaleLength] = useState(20)
    const [barWidth, setBarWidth] = useState(0)

    useEffect(() => {
        setTimelineValue(((trackValue / 15) - 1) * 200)
    }, [trackValue])

    useEffect(() => {
        setBarWidth((scaleLength * 15 * 5) + 30)
        setTrackValue(15)
    }, [scaleLength])

    useEffect(() => {
        console.log(addedItems)
    }, [addedItems])

    return (
        <Context.Provider value={{
            storyMode,
            setStoryMode,
            addedItems,
            setAddedItems,
            timelineValue,
            setTimelineValue,
            scaleLength,
            setScaleLength,
            trackValue,
            setTrackValue,
            barWidth
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