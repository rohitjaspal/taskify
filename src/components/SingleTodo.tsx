import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from 'react-icons/md';
import { GrRevert } from 'react-icons/gr';
import { ActionType } from '../App';
import { useState } from 'react';

type Props =  {
  todo:Todo,
  todos:Todo[],
  updateTodos:Function
}

const SingleTodo = ({todo , updateTodos}: Props) => {
  const [edit , setEdit] = useState<boolean>(false);
  const [editTodo , setEditTodo] = useState<string>(todo.todo);
  
  return ( 
    <form className='todos_single'>
    <div className='singletodo'>
      <div>{
              <h3>{todo.todo}</h3>
            }
      </div>
      <div className='actions'>
        <div onClick={() => updateTodos({...todo , isDone: todo.isDone} ,ActionType.EDIT)}><AiFillEdit/></div>
        <div onClick={() => updateTodos({...todo , isDone: !todo.isDone } , ActionType.DONE)}>
          {todo.isDone? <GrRevert/> : <MdDone/>}
        </div>
        <div onClick={() => updateTodos(todo  , ActionType.DELETE)}><AiFillDelete/></div>
      </div>
    </div>
    </form>
  )
}

export default SingleTodo