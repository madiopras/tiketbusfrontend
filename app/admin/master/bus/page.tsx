import React from 'react'
import { useUser } from '../../context/UserContext';

export default function AdminBusPage() {
  const { user } = useUser();
  return (
    <div>
      <p>Hallo ini halaman master BUS</p>
      
     
    </div>
   
  )
}
