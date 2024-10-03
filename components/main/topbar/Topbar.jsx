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

const Topbar = () => {
    const [show, setShow] = useState(false)
    const [markBtnDisabled, setMarkBtnDisabled] = useState(true)

    const { timelineValue, setAddedItems, addedItems, storyMode, setStoryMode } = useContext(Context)
    const divRef = useRef(null)

    const handleAddBtnClick = () => {
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
                    return { ...e, keyframes: [...e.keyframes, { val: timelineValue, selected: false }] }
                }
                return e
            }))
    }

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
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="bg-slate-700 flex justify-between p-2 relative">
            <div className="relative" ref={divRef}>
                <div
                    className={`transition-transform duration-100 w-6 h-6 flex justify-center items-center bg-blue-500 rounded-lg cursor-pointer ${show && "rotate-45 bg-red-500"}`}
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
            {storyMode ? <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 text-sm">
                <div className={`w-6 h-6 flex justify-center items-center bg-white rounded-lg cursor-pointer ${markBtnDisabled ? "opacity-60" : "opacity-100"}`}>
                    <TbDiamondsFilled className="text-red-700" onClick={handleAddMark} />
                </div>
                <div className="h-6 flex items-center rounded-lg cursor-pointer bg-red-700 text-white pr-1 pl-2 gap-1">
                    <p className="text-xs font-semibold">Delete</p>
                    <TbDiamondsFilled />
                </div>
            </div> : <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
                <div className="w-6 h-6 flex justify-center items-center bg-white rounded-lg cursor-pointer">
                    <IoMdPlay className="text-slate-900" />
                </div>
                <div className="w-6 h-6 flex justify-center items-center bg-white rounded-lg cursor-pointer" onClick={toggleStoryMode}>
                    <GoDotFill className="text-red-700" />
                </div>
            </div>}
            {storyMode ? <div className="bg-yellow-600 flex items-center justify-center h-6 text-white pr-2 pl-3 rounded-lg gap-2 text-sm cursor-pointer" onClick={toggleStoryMode}>
                <p className="text-xs font-semibold">Save</p>
                <IoSaveSharp />
            </div> : <Counter />}
        </div>
    );
};

export default Topbar
