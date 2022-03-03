import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({room}) => {
  return (
    <Link to={`/room/${room.id}`}>
    <div>
        <h2>{room.topic}</h2>
        <h3>{room.name}</h3>
        <h4>{room.description}</h4>
        <h4>{room.host}</h4>

    </div>
    </Link>
  )
}

export default ListItem
