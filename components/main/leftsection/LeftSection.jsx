import { useContext } from "react"
import Context from "../Context"
import AddedShapesCard from "./addedshapescard/AddedShapesCard"
           
const LeftSection = () => {
  const { addedItems } = useContext(Context)
  return ( 
    <div className="bg-slate-600 w-48">
      <div className="flex items-center bg-slate-600 justify-center text-white h-11 text-xs">
        <p>Added Items</p>
      </div>
      <div className="pb-2">
        {addedItems.length === 0 ? <div className="h-36 text-gray-300 text-sm font-semibold flex items-center justify-center">
          <p>No items</p>
        </div> : 
          <div className="added_items h-36 overflow-auto">
            {addedItems.map(e => <AddedShapesCard {...e} />)}
          </div>
        }  
      </div>
    </div> 
  )        
}

export default LeftSection