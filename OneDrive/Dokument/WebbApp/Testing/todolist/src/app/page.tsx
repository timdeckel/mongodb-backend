'use client'
import Header from "@/components/Header";
import USP from "@/components/USPs";
import TaskList from "@/components/TaskList";
import NewTask from "@/components/NewTask";
import { startTasks } from "@/components/Utils/defaultTasks";
import { useEffect, useState } from "react";
import { TaskType } from "@/components/Utils/types";

export default function Home() {
  const [tasks, setTasks]=useState<TaskType[] | null>(null)

  const addTask = (newTask:TaskType) => {
    if(tasks) 
      setTasks([...tasks, newTask])    
  }

  const removeTask = (id:string):void => {
    if (tasks) {
      setTasks(tasks.filter (item => item.id !== id))
    }
  }

   useEffect(() => {
    setTasks(startTasks)
   }, [])

  return (
    <>
      <Header />
      <USP />
      <TaskList taskItems={tasks} updateFunction={removeTask}/>
      <NewTask updateFunction={addTask} />
    </>
  );
}
