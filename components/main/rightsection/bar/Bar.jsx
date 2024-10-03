import { useEffect, useContext } from "react"
import Context from "../../Context"
import Mark from "./mark/Mark"

const Bar = ({ selected, keyframes }) => {
    const { barWidth } = useContext(Context)
    return (
        <div className={`h-9 ${selected ? "bg-gray-600" : "bg-gray-800"} mb-1 relative`} style={{ width: `${barWidth}px` }}>
            {keyframes.map(e => {
                return <Mark left={((e.val / 200) * 15) + 15} />
            })}
        </div >
    )
}

export default Bar