import React from 'react'
import { useContext } from 'react'
import Context from '../../Context'

const AllShapesCard = ({ id, name }) => {
  const { setAddedItems } = useContext(Context)
  const handleClick = () => {
    setAddedItems(e => [...e, { id, name }])
  }
  return (
    <div onClick={handleClick} className="cursor-pointer flex items-center justify-center h-10 font-semibold text-sm hover:bg-slate-200 border-b border-slate-200">
      <p>{name}</p>
    </div>
  )
}

export default AllShapesCard