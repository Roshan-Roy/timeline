import { useContext } from "react"
import { MdDeleteForever } from "react-icons/md"
import Context from "../../Context"

const AddedShapesCard = ({ id, name }) => {
    const { setAddedItems } = useContext(Context)
    const handleDltBtnClick = () => {
        setAddedItems(e => [...e.filter(e => e.id !== id)])
    }
    return (
        <div className="flex gap-2 h-9 bg-slate-700 text-white items-center justify-between px-4 cursor-pointer">
            <p className="font-semibold text-sm">{name}</p>
            <MdDeleteForever className="text-red-500 text-xl" onClick={handleDltBtnClick} />
        </div>
    )
}

export default AddedShapesCard