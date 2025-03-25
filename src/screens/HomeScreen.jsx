import React from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();
  const checkAuth = () => {
    const user = localStorage.getItem("username");
    if(user === null) {
      navigate("/admin/signin")
    }    
  }
  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <div className='app'>
      <Sidebar id={1} />
      <Content />
    </div>
  )
}
