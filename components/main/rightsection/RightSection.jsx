import React from 'react'
import { useState } from 'react'

const RightSection = () => {
  const [scaleLength, uptScaleLength] = useState(20)
  return (
    <div className='bg-gray-900 flex-grow cursor-pointer'>
      <div className='time-line h-full relative overflow-scroll' style={{ height: "196px" }}>
        <div className='h-11 sticky top-0 bg-gray-900'>
          {Array((scaleLength * 5) + 1).fill().map((_, i) => {
            return <>
              <div style={{
                width: "1px",
                height: i % 5 === 0 ? "18px" : "10px",
                position: "absolute",
                left: `${i === 0 ? "15px" : `calc(${i * 15}px + 15px)`}`,
                bottom: 0,
                backgroundColor: "white"
              }}></div>
              {i % 5 === 0 ? <div style={{
                position: "absolute",
                left: `${i === 0 ? "15.5px" : `calc(${i * 15}px + 15.5px)`}`,
                color: "white",
                top: "5px",
                fontSize: "12px",
                transform: "translateX(-50%)"
              }}>{i / 5}</div> : null}
            </>
          })}
          <div style={{
            width: "1px",
            height: "10px",
            position: "absolute",
            left: `${(scaleLength * 15 * 5) + 30}px`,
            bottom: 0
          }}></div>
        </div>
      </div>
    </div>
  )
}

export default RightSection