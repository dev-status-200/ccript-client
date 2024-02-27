'use client';

import React, { useState, useEffect } from "react";
import DotIcon from "@/public/assets/icons/DotIcon";
import CheckCircleIcon from "@/public/assets/icons/CheckCircleIcon";
import moment from "moment";

const TodoItem = ({data, setOpen, updateTask, reset, deleteTask}) => {

  const [load, setLoad] = useState(false);
  const [task, setTask] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(()=>{
    setLoad(false);
    setEdit(false);
  }, [reset])

  const toggleEdit = () => {
    setEdit(true);
    setTask(data.item.task)
  }

  const updateTaskName = () => {
    setLoad(true);
    updateTask(data.item._id, {...data.item, task:task}, data.index);
  }

  const updateTaskStatus = () => {
    setLoad(true);
    updateTask(data.item._id, {...data.item, status:data.item.status?false:true}, data.index);
  }

  const removeTask = () => {
    setLoad(true);
    deleteTask(data.item._id);
  }

  return (
  <>
    <h2>
      <button
        className={`
          shadow-md flex items-center justify-between w-full text-left 
          font-semibold py-2 bg-white/[.6] px-3 border border-[#edd8c4]
          ${data.index==0?'rounded-t-lg':(data.index==data.length-1 &&! data.item.open)?'rounded-b-lg':''}
          ${(data.length==1 && !data.item.open)?'rounded-lg':''}
        `}
        onClick={(e) => { e.preventDefault(); setOpen(data.index); }}
        aria-expanded={data.item.open}
        aria-controls={`accordion-text-01`}
      >
        <div className="flex justify-items-center content-center items-center self-center">
          <span className="w-6 h-6" >
            <CheckCircleIcon  strokeWidth={"1"} stroke={data.item.status?"green":"#d7a97e"} fill={data.item.status?"#d5edc4":"none"} />
          </span>
          <span className="font-normal ml-2">
            {data.item.task}
          </span>
        </div>
        <DotIcon/>         
      </button>        
    </h2>
    <div
      id={`accordion-text-01`}
      role="region"
      aria-labelledby={`accordion-title-01`}
      className={`grid text-sm overflow-hidden transition-all duration-300 ease-in-out ${data.item.open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className={`overflow-hidden bg-[#f2f2f2]/[0.89] ${(data.index==data.length-1 && data.item.open)?'rounded-b-lg shadow-lg':''}`}>
        {!load &&<>
          <div className="flex justify-between">
            <div className="p-3">
              <p><span className="font-semibold">Status:</span> {data.item.status?'Completed':'Pending'}</p>
              <p><span className="font-semibold">Created At:</span> {moment(data.item.createdAt).format("MM/DD/YYYY hh:mm a" )}</p>
            </div>
            <div className="py-6 px-2 flex justify-between">
              {!edit && <>
                <img className="cursor-pointer"
                  src={'assets/icons/editIcon.webp'} 
                  style={{height:25, width:40}}
                  onClick={toggleEdit}
                />
                <img className="cursor-pointer"
                  src={data.item.status?'assets/icons/back.webp':'assets/icons/check.png'} 
                  style={{height:25, width:25}}
                  onClick={updateTaskStatus}
                />
              </>}
            </div>
          </div>
          <div className="pb-3 px-2">
            {!edit && 
            <button type="button" onClick={removeTask}
              className=" w-full bg-red-300/[0.4] text-red-700 hover:text-white hover:bg-red-800 focus:ring-1 focus:ring-red-300 rounded py-2 bg-red-400 dark:hover:bg-red-700 duration-300"
            > Delete
            </button>
            }
            {edit && 
              <div className="flex justify-items-center items-center ">
                <input 
                  className="block bg-white border rounded-md py-2 pl-4 mx-2 pr-3 w-[250px] shadow-md focus:outline-none focus:border-sky-500 sm:text-sm" 
                  placeholder="Update Task" 
                  type="text"
                  value={task}
                  onChange={(e)=>setTask(e.target.value)}
                />
                <img className="ml-2 cursor-pointer" 
                  src={'assets/icons/check.png'} 
                  style={{height:20}}
                  onClick={updateTaskName}
                />
                <img className="ml-2 cursor-pointer" 
                  src={'assets/icons/cross.png'} 
                  style={{height:20}} 
                  onClick={()=>setEdit(false)}
                />
              </div>
            }
          </div>
        </>}
        {load && <div className="flex justify-center p-2"><img className="animate-spin" src={'assets/icons/loader.png'} style={{height:40}} /></div>}
      </div>
    </div>
  </>
  )
}

export default React.memo(TodoItem);