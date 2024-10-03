const Mark = ({ left }) => {
  return (
    <div className="w-3 h-3 bg-yellow-500 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm rotate-45" style={{ left: `${left}px` }}></div>
  )
}

export default Mark