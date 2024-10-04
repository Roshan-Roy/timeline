import { useContext, useEffect, useState } from "react"
import Context from "../../Context"
import { RiSubtractLine } from "react-icons/ri"
import { IoMdAdd } from "react-icons/io"

const Counter = () => {
  const { scaleLength, setScaleLength, addedItems } = useContext(Context)
  const [disableSubBtn, setDisableSubBtn] = useState(true)
  const [disableAddBtn, setDisableAddBtn] = useState(false)

  const largestKeyframe = () => {
    let largest = 0;
    addedItems.forEach(e => {
      e.keyframes.forEach(e => {
        if (e.val > largest) {
          largest = e.val
        }
      })
    });
    return largest
  }

  const handleAddBtn = () => {
    setScaleLength(e => e + 10)
  }
  const handleSubBtn = () => {
    setScaleLength(e => e - 10)
  }

  useEffect(() => {
    if (scaleLength <= 20 || (largestKeyframe() > (scaleLength - 10) * 5 * 200)) {
      setDisableSubBtn(true)
    } else {
      setDisableSubBtn(false)
    }
    if (scaleLength >= 200) {
      setDisableAddBtn(true)
    } else {
      setDisableAddBtn(false)
    }
  }, [scaleLength, addedItems])

  return (
    <div className="flex gap-1">
      <button className={`bg-slate-500 w-6 h-6 flex items-center justify-center text-sm rounded-sm text-white cursor-pointer ${disableSubBtn ? "opacity-40" : "opacity-100 "}`} onClick={handleSubBtn} disabled={disableSubBtn}><RiSubtractLine /></button>
      <div className="bg-white font-semibold text-xs flex items-center justify-center w-8 h-6 rounded-sm"><p>{scaleLength}</p></div>
      <button className={`bg-slate-500 w-6 h-6 flex items-center justify-center text-sm rounded-sm text-white cursor-pointer ${disableAddBtn ? "opacity-40" : "opacity-100 "}`} onClick={handleAddBtn} disabled={disableAddBtn}><IoMdAdd /></button>
    </div>
  )
}

export default Counter