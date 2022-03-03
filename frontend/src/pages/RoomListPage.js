import React, {useState,useEffect} from 'react'
import ListItem from '../components/ListItem'

const RoomListPage = () => {

  let [rooms, setRooms] = useState([])
  
  useEffect(()=>{
    getRooms()
  },[])


  let getRooms = async () => {
      let response = await fetch('/api/rooms')
      let data = await response.json()
      setRooms(data)
  }

  return (
    <div>
        <div className= 'Rooms-list'>
            {rooms.map((room, index)=>(
               <ListItem key={index} room={room} />
            ))}
        </div>
    </div>
  )
}

export default RoomListPage
