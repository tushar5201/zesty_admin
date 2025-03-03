import React from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { Modal } from 'react-bootstrap'
import { io } from "socket.io-client"
import { toast } from 'react-toastify'

const socket = io("https://zesty-backend.onrender.com");

export default function HomeScreen() {

  return (
    <div className='app'>
      <Sidebar id={1} />
      <Content />
    </div>
  )
}
