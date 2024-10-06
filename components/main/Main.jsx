"use client"

import Topbar from "./topbar/Topbar"
import LeftSection from "./leftsection/LeftSection"
import RightSection from "./rightsection/RightSection"
import Context from "./Context"
import { useState, useEffect } from "react"
import largestKeyframe from "./exports/largestkeyframe"

const Main = () => {
    const [storyMode, setStoryMode] = useState(false)
    const [addedItems, setAddedItems] = useState([])
    const [trackValue, setTrackValue] = useState(15)
    const [timelineValue, setTimelineValue] = useState(0)
    const [scaleLength, setScaleLength] = useState(20)
    const [barWidth, setBarWidth] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [linear, setLinear] = useState(true)

    useEffect(() => {
        setTimelineValue(((trackValue / 15) - 1) * 200)
    }, [trackValue])

    useEffect(() => {
        setBarWidth((scaleLength * 15 * 5) + 30)
        setTrackValue(15)
    }, [scaleLength])

    useEffect(() => {
        setTrackValue(15)
        setAddedItems(e => e.map(e => ({ ...e, selected: false, keyframes: e.keyframes.map(e => ({ ...e, selected: false })) })))
    }, [storyMode])

    useEffect(() => {
        setTrackValue(15)
    }, [playing])

    useEffect(() => {
        const firstNum = Math.trunc(largestKeyframe(addedItems) / 10000)
        if (firstNum >= (scaleLength / 10)) {
            if (largestKeyframe(addedItems) === (firstNum * 10000)) {
                setScaleLength(firstNum * 10)
            } else {
                setScaleLength((firstNum + 1) * 10)
            }
        }
    }, [/*or addedItems*/]) //set the scale length based on the largest keyframe in addedItems array on page load

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
            barWidth,
            playing,
            setPlaying,
            linear,
            setLinear
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