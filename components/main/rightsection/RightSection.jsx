import React, { useState, useRef, useEffect, useContext } from 'react'
import Bar from './bar/Bar'
import Context from '../Context'

const RightSection = () => {
  const [isDragging, setIsDragging] = useState(false)
  const { trackValue, setTrackValue, scaleLength, addedItems, barWidth } = useContext(Context)

  const trackRef = useRef(null);
  const markerRef = useRef(null);

  const calculatePosition = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const clickPositionX = clientX - rect.left + trackRef.current.scrollLeft
    const position = Math.round(clickPositionX / 15) * 15

    if (position <= 15) {
      return 15;
    } else if (position > (scaleLength * 5 * 15) + 15) {
      return (scaleLength * 5 * 15) + 15
    } else {
      return position
    }
  };

  const handleTrackClick = (e) => {
    const position = calculatePosition(e.clientX)
    setTrackValue(position)
  };

  const handleMouseDown = () => {
    setIsDragging(true)
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const position = calculatePosition(e.clientX)
      setTrackValue(position)
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false)
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.style.setProperty('min-height', `${trackRef.current.scrollHeight - 44}px`)
    }
  }, [markerRef])

  useEffect(() => {
    markerRef.current.style.setProperty('height', `${addedItems.length * 40}px`)
  }, [addedItems])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    };
  }, [isDragging])

  return (
    <div
      className="bg-gray-900 time-line h-full relative overflow-scroll selection:bg-transparent flex-1"
      ref={trackRef}
      onClick={handleTrackClick}
      style={{ height: '196px' }}
    >

      <div className="h-11 sticky top-0 bg-gray-900 z-40" style={{ width: `${barWidth}px` }}>
        {Array(scaleLength * 5 + 1)
          .fill()
          .map((_, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  width: '.5px',
                  height: i % 5 === 0 ? '18px' : '8px',
                  position: 'absolute',
                  left: `${i === 0 ? '15px' : `calc(${i * 15}px + 15px)`}`,
                  bottom: 0,
                  backgroundColor: 'white',
                  transform: 'translateX(-50%)'
                }}
              ></div>
              {i % 5 === 0 ? (
                <div
                  style={{
                    position: 'absolute',
                    left: `${i === 0 ? '15px' : `calc(${i * 15}px + 15px)`}`,
                    color: 'white',
                    top: '5px',
                    fontSize: '12px',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {i / 5}
                </div>
              ) : null}
            </React.Fragment>
          ))}
        <div className='absolute bg-yellow-500 w-1 -translate-x-1/2 cursor-pointer' onMouseDown={handleMouseDown} style={{
          height: "8px",
          bottom: "0",
          left: `${trackValue}px`
        }}>
          <div className='absolute bg-yellow-500 top-0 -translate-y-full -translate-x-1/4' style={{
            width: "8px",
            height: "10px",
            borderRadius: "2px"
          }}></div>
        </div>
      </div>
      {addedItems.map((e, i) => <Bar {...e} index={i} />)}
      <div
        className="absolute bg-yellow-500 -translate-x-1/2"
        ref={markerRef}
        onMouseDown={handleMouseDown}
        style={{
          left: `${trackValue}px`,
          top: '44px',
          cursor: 'pointer',
          width: "4px"
        }}
      ></div>
    </div>
  );
};

export default RightSection;
