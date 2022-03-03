import React from 'react'

const ListItem = ({room}) => {
  return (
    <div>
        <h2>{room.topic}</h2>
        <h3>{room.name}</h3>
        <h4>{room.description}</h4>
        <h4>{room.host}</h4>

    </div>
  )
}

export default ListItem
