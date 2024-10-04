const Mark = ({ left, selected }) => {
  return (
    <div className={`w-3 h-3 bg-yellow-500 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm rotate-45 ${selected ? "border-2 border-white":"border-none"}`} style={{ left: `${left}px` }}></div>
  )
}

export default Mark