'use client'

import React, { useState, useEffect } from 'react'
import Image from "next/image";
import PlusIcon from "@/public/assets/icons/PlusIcon";
import ChevronIcon from "@/public/assets/icons/ChevronIcon";
import ListIcon from "@/public/assets/icons/ListIcon";
import TodoItem from "@/app/Components/TodoItem";
import todos from "@/app/api/todos/route";

const Home = (props) => {

  const [items, setItems] = useState([]);
  const [task, setTask] = useState('');
  const [reset, setReset] = useState(false);

  const setOpen = (params) => {
    let tempItems = [...items];
    tempItems[params].open = !tempItems[params].open;
    setItems(tempItems);
  };

  useEffect(()=>{
    setItems(props.data);
  }, []);

  const createTask = () => {
    if(task.length>2){
      todos.create({task})
      .then((x)=>{
        let tempItems = [...items];
        tempItems.push({...x.data, open:false})
        setItems(tempItems);
        setTask('');
      })
    }
  }

  const updateTask = (id, payload, index) => {
    todos.update(id, payload)
    .then(async(x)=>{
      await setTimeout(() => {
        setReset(!reset);
        let tempState = [...items];
        tempState[index] = {...tempState[index], ...payload}
        setItems(tempState)
      }, 1000);
    })
  }

  const deleteTask = (id) => {
    todos.remove(id)
    .then(async(x)=>{
      await setTimeout(() => {
        setReset(!reset);
        let tempState = [...items];
        tempState = tempState.filter((x)=>{
          return x._id!=id
        });
        setItems(tempState)
      }, 1000);
    })
  }

  return (
    <div className="bg-cover h-screen" style={{backgroundImage:'url(assets/images/image.webp)'}}>
      <div className="flex flex-col grid justify-items-center content-center items-center self-center backdrop-blur-sm bg-black/20 h-screen">
        <Image
          className="rounded-full border w-28 h-28 border-4 border-white shadow-xl"
          src="/assets/images/profile.jpg"
          alt="Next.js Logo"
          width={180}
          height={100}
          priority
        />
        <label className="relative block mt-5 ">
          <input 
            className="block bg-white border rounded-md py-2 pl-4 pr-3 w-[350px] shadow-md focus:outline-none focus:border-sky-500 sm:text-sm" 
            placeholder="Add a new Task" 
            type="text"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
          />
          <span 
            className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
            onClick={createTask}
          >
            <div className="bg-[#bdb58c] rounded mr-2 hover:bg-[#cfab8f] duration-100">
              <PlusIcon />
            </div>
          </span>
        </label>
          <div className="mt-6 border p-2 h-[40px] w-[350px] rounded-lg shadow-md backdrop-blur-3xl bg-white/10 flex justify-between">
            <div className="flex">
              <ListIcon/> <span className="mx-2 text-white">Your Todos</span>
            </div>
            <ChevronIcon/>
          </div>
        <div style={{height:300, overflowY:'auto', padding:10}}>
          <div className='w-[350px] ' >
            {items.length>0 && items.map((item, index)=>{
              return(
                <TodoItem 
                  key={index} 
                  data={{item, index, length:items.length}} 
                  setOpen={setOpen} 
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  reset={reset}
                />
              )
            })}
          </div>
          {items.length == 0 && 
          <div className="shadow-md flex items-center justify-center w-full h-[250px] rounded-lg bg-white/[.6] border border-[#edd8c4]">
            <p>No Tasks Today</p>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default React.memo(Home)