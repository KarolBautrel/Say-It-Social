import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';

const  RoomPage=() => {

  let {id} = useParams()
  let [room, setRoom] = useState(null)
  useEffect(()=>{
    getNote()
  },[id])

  let getNote = async ()=>{
      let response = await fetch(`/api/room/${id}`)
      let data = await response.json()
      setRoom(data)
  }
  
  return (
    <div>
       <p>{room?.name}</p>
    </div>
  )
}

export default RoomPage
