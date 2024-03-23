import React from 'react'
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { RiCheckboxFill } from 'react-icons/ri';

type TaskComponentProps = {
  text: string;
  isComplete: boolean;
  updateTaskMode: () => void;
  deleteTask: () => void;
  completeTask: () => void;
};

const TaskComponent: React.FC<TaskComponentProps> = ({ text, isComplete, updateTaskMode, deleteTask, completeTask }) => {
  return (
    <div className={`task ${isComplete ? 'completed' : ''}`}>
      <div className='text'>{text}</div>
      <div className='icons'>
        {!isComplete && <BiEdit className="icon" onClick={updateTaskMode} />}
        <AiFillDelete className="icon" onClick={deleteTask} />
        {!isComplete && <RiCheckboxFill className="icon" onClick={completeTask} />}
      </div>
    </div>
  )
}

export default TaskComponent;