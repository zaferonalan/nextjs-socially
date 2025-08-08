"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchTask = async() => {
  const { data } = await axios.get("http://localhost:3000/api/tasks")
  console.log(data);
  return data
}



function TasksPage() {
  const {data} = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTask
  })
  return (
    <div>TasksPage</div>
  )
}

export default TasksPage