import React, { useRef, useState } from 'react'
import './TodoForm.scss'
import { FaPenFancy } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { SlRocket } from "react-icons/sl";



function TodoForm() {
    const [tasks,setTasks] = useState([]);
    const inp = useRef()
    const inpE = useRef()

    const addTask= ()=>{
        if(inp.current.value!==''){
            const newTask = {
                id:tasks.length,
                nameTask:inp.current.value,
                isDone:false,
                isEdit:false,
            }
            setTasks([...tasks,newTask])
        }
        inp.current.value = ""
    }
    const taskComplited = (key)=>{
        const newTasks = [...tasks]
        newTasks[key].isDone=!newTasks[key].isDone
        setTasks(newTasks)
        
    }
    const editTask = (key)=>{
        const newTasks = [...tasks]
        newTasks[key].isEdit=!newTasks[key].isEdit
        setTasks(newTasks)
    }
    const deleteTask = (key)=>{
        const updateTask = tasks.filter((_,i)=>i!==key)
        setTasks(updateTask)
    }
    const newTextTask = (key)=>{
        const newTasks = [...tasks]
        newTasks[key].nameTask=inpE.current.value
        newTasks[key].isEdit=!newTasks[key].isEdit
        setTasks(newTasks)
    }
    
  return (
    <div className='container'>
        <h2>Get started</h2>
        <div className='inp-form'>
            <input type="text" ref={inp} />
            <button onClick={addTask}>Add</button>
        </div>

        <ul>
            {tasks.map((task,key)=>{
                return (
                    task.isEdit ? (
                        <div className='task' key={key}>
                            <input  
                                type='text'
                                ref={inpE}
                                defaultValue={task.nameTask}
                            ></input>
                            <div className='icons'>
                                <SlRocket className='icon' onClick={()=>newTextTask(key)}/>
                            </div>
                        </div>
                    ) : (
                        <div className='task' key={task.id}>
                            <li className={task.isDone?'Done':''} onClick={() => taskComplited(key)}>{task.nameTask}</li>
                            <div className='icons'>
                                <FaPenFancy className='icon' onClick={() => editTask(key)} />
                                <IoMdCloseCircleOutline className='icon' onClick={() => deleteTask(key)} />
                            </div>
                        </div>
                    )
                );
            })}
        </ul>
    </div>
  )
}

export default TodoForm