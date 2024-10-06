import { MdAdd } from "react-icons/md"
import { IoMdPlay } from "react-icons/io"
import { GoDotFill } from "react-icons/go"
import { useState, useRef, useEffect } from "react"
import { useContext } from "react"
import Context from "../Context"
import AllShapesCard from "./allshapescard/AllShapesCard"
import shapes from "../exports/shapes"
import { TbDiamondsFilled } from "react-icons/tb"
import { IoSaveSharp } from "react-icons/io5"
import Counter from "./counter/Counter"
import { FaSquare } from "react-icons/fa6"
import { MdLoop } from "react-icons/md"
import { MdOutlineArrowRightAlt } from "react-icons/md"

const Topbar = () => {
    const [show, setShow] = useState(false)
    const [markBtnDisabled, setMarkBtnDisabled] = useState(true)
    const [playBtnDisabled, setPlayBtnDisabled] = useState(true)

    const { timelineValue, setAddedItems, addedItems, storyMode, setStoryMode, playing, setPlaying, setTrackValue, scaleLength, linear, setLinear } = useContext(Context)
    const divRef = useRef(null)
    const intervalRef = useRef(null)
    const timeoutRef = useRef(null)

    const handleAddBtnClick = () => {
        if (!playing)
            setShow((e) => !e);
    };

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setShow(false)
        }
    };
    const toggleStoryMode = () => {
        setStoryMode(e => !e)
    }

    const handleAddMark = () => {
        if (!markBtnDisabled)
            setAddedItems(e => e.map(e => {
                if (e.selected) {
                    return { ...e, keyframes: [...e.keyframes, { val: timelineValue, selected: true }] }
                }
                return e
            }))
    }

    const handleDeleteMark = () => {
        if (markBtnDisabled && addedItems.some(e => e.selected)) {
            setAddedItems(e => e.map(e => {
                if (e.selected) {
                    return { ...e, keyframes: e.keyframes.filter(e => !e.selected) }
                }
                return e
            }))
        }
    }

    //move time line with 200 seconds gap
    const handlePlayBtnClick = () => {
        if (!playBtnDisabled) {
            clearTimeout(timeoutRef.current)
            setPlaying(true)
            intervalRef.current = setInterval(() => {
                setTrackValue(e => e + 15)
            }, 200)
        }
    }
    const handleStopBtnClick = () => {
        clearInterval(intervalRef.current)
        clearTimeout(timeoutRef.current)
        setPlaying(false)
    }

    const toggleLinear = () => {
        if (!playing)
            setLinear(e => !e)
    }

    useEffect(() => {
        if (addedItems.length > 0) {
            setPlayBtnDisabled(false)
        } else {
            setPlayBtnDisabled(true)
        }
    }, [addedItems])

    useEffect(() => {
        const selected = addedItems.find(e => e.selected)
        const overTheMark = selected && selected.keyframes.some(e => e.val == timelineValue)
        if (addedItems.some(e => e.selected) && !overTheMark) {
            setMarkBtnDisabled(false)
        } else {
            setMarkBtnDisabled(true)
        }
    }, [addedItems, timelineValue])

    useEffect(() => {
        setAddedItems(e => e.map(e => {
            if (e.selected)
                return {
                    ...e, keyframes: e.keyframes.map(e => {
                        if (e.val === timelineValue) return { ...e, selected: true }
                        return { ...e, selected: false }
                    })
                }
            return {
                ...e, keyframes: e.keyframes.map(e => ({ ...e, selected: false }))
            }
        }))
    }, [timelineValue])

    useEffect(() => {
        if (playing) {
            if (timelineValue === (scaleLength * 1000)) {
                if (linear) {
                    clearInterval(intervalRef.current)
                    timeoutRef.current = setTimeout(() => {
                        setPlaying(false)
                    }, 200)
                } else {
                    clearInterval(intervalRef.current)
                    timeoutRef.current = setTimeout(() => {
                        setTrackValue(15)
                        intervalRef.current = setInterval(() => {
                            setTrackValue(e => e + 15)
                        }, 200)
                    }, 200)
                }
            }
        }
    }, [timelineValue])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="bg-slate-700 flex justify-between p-2 relative select-none">
            <div className="flex gap-2">
                <div className="relative" ref={divRef}>
                    <div
                        className={`transition-transform duration-100 w-6 h-6 flex justify-center items-center bg-blue-500 rounded-lg cursor-pointer ${show && "rotate-45 bg-red-500"} ${playing ? "opacity-60" : "opacity-100"}`}
                        onClick={handleAddBtnClick}
                    >
                        <MdAdd className="transition-all ease-linear text-white text-lg" />
                    </div>
                    {show && (shapes.filter(elm_x => {
                        return !addedItems.some(elm_y => elm_x.id === elm_y.id)
                    }).length > 0 ?
                        <div className="all_items absolute z-50 bg-white -right-2 top-0 translate-x-full w-40 h-40 overflow-y-auto border border-slate-200 box-content">
                            {shapes.filter(elm_x => {
                                return !addedItems.some(elm_y => elm_x.id === elm_y.id)
                            }).map(e => (
                                <AllShapesCard key={e.id} {...e} />
                            ))}
                        </div> : <div className="absolute z-50 bg-white -right-2 top-0 translate-x-full w-40 h-40 border border-slate-200 box-content flex items-center justify-center font-semibold text-sm text-gray-600">
                            <p>No items</p>
                        </div>)}
                </div>
                <div onClick={toggleLinear} className={`w-14 bg-gray-800 font-semibold flex items-center justify-between text-gray-200 pl-3 pr-2 box-content rounded-lg text-sm cursor-pointer ${playing ? "opacity-60" : "opacity-100"}`}>
                    <p className="text-xs">{linear ? "Linear" : "Loop"}</p>
                    {linear ? <MdOutlineArrowRightAlt /> : <MdLoop />}
                </div>
            </div>
            {storyMode ? <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 text-sm">
                <div className={`w-6 h-6 flex justify-center items-center bg-white rounded-lg cursor-pointer ${markBtnDisabled ? "opacity-60" : "opacity-100"}`}>
                    <TbDiamondsFilled className="text-red-700" onClick={handleAddMark} />
                </div>
                <div className={`h-6 flex items-center rounded-lg cursor-pointer bg-red-700 text-white pr-1 pl-2 gap-1 ${markBtnDisabled && addedItems.some(e => e.selected) ? "opacity-100" : "opacity-60"}`} onClick={handleDeleteMark}>
                    <p className="text-xs font-semibold">Delete</p>
                    <TbDiamondsFilled />
                </div>
            </div> : <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
                {playing ?
                    <div className="h-6 flex items-center rounded-lg cursor-pointer bg-red-700 text-white px-2 gap-2" onClick={handleStopBtnClick}>
                        <p className="text-xs font-semibold">Stop</p>
                        <FaSquare className="text-xs" />
                    </div> :
                    <>
                        <div className={`w-6 h-6 flex justify-center items-center bg-white rounded-lg cursor-pointer ${playBtnDisabled ? "opacity-60" : "opacity-100"}`} onClick={handlePlayBtnClick}>
                            <IoMdPlay className="text-slate-900" />
                        </div>
                        <div className="w-6 h-6 flex justify-center items-center bg-white rounded-lg cursor-pointer" onClick={toggleStoryMode}>
                            <GoDotFill className="text-red-700" />
                        </div>
                    </>}
            </div>}
            {storyMode ? <div className="bg-yellow-600 flex items-center justify-center h-6 text-white pr-2 pl-3 rounded-lg gap-2 text-sm cursor-pointer" onClick={toggleStoryMode}>
                <p className="text-xs font-semibold">Save</p>
                <IoSaveSharp />
            </div> : <Counter />}
        </div>
    );
};

export default Topbar
