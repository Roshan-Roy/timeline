import { useContext } from "react"
import { MdDeleteForever } from "react-icons/md"
import Context from "../../Context"

const AddedShapesCard = ({ id, name, selected }) => {
    const { setAddedItems } = useContext(Context)
    const handleDltBtnClick = () => {
        setAddedItems(e => [...e.filter(e => e.id !== id)])
    }
    const handleCardClick = () => {
        setAddedItems(e => [...e.map(e => {
            if (e.id === id) {
                return { ...e, selected: true }
            }
            return { ...e, selected: false }
        })])
    }
    return (
        <div className={`flex gap-2 h-9 text-white items-center justify-between px-4 cursor-pointer ${selected ? "bg-slate-800" : "bg-slate-700"}`} onClick={handleCardClick}>
            <p className="font-semibold text-sm">{name}</p>
            <MdDeleteForever className="text-red-600 text-xl" onClick={handleDltBtnClick} />
        </div >
    )
}

export default AddedShapesCard