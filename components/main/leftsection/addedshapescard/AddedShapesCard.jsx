import { useContext } from "react"
import { MdDeleteForever } from "react-icons/md"
import Context from "../../Context"

const AddedShapesCard = ({ id, name, selected }) => {
    const { setAddedItems, timelineValue, storyMode, playing } = useContext(Context)
    const handleDltBtnClick = () => {
        if (!playing)
            setAddedItems(e => [...e.filter(e => e.id !== id)])
    }
    const handleCardClick = () => {
        if (storyMode)
            setAddedItems(e => [...e.map(e => {
                if (e.id === id) {
                    return {
                        ...e, selected: true, keyframes: e.keyframes.map(e => {
                            if (e.val === timelineValue) return { ...e, selected: true }
                            return { ...e, selected: false }
                        })
                    }
                }
                return { ...e, selected: false, keyframes: e.keyframes.map(e => ({ ...e, selected: false })) }
            })])
    }
    return (
        <div className={`flex gap-2 h-9 text-white items-center justify-between px-4 cursor-pointer ${selected ? "bg-slate-800" : "bg-slate-700"}`} onClick={handleCardClick}>
            <p className="font-semibold text-sm">{name}</p>
            <MdDeleteForever className={`text-red-600 text-xl ${playing ? "opacity-60" : "opacity-100"}`} onClick={handleDltBtnClick} />
        </div >
    )
}

export default AddedShapesCard