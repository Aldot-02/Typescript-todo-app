import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setTasks, setText, setIsUpdating, setTaskId } from '../actions/taskAction';
import TaskComponent from '../components/taskComponent';
import { addTask, deleteTask, updateTask, markTaskAsComplete, getAllTasks, logoutUser, getAuthenticatedUser } from '../api/handleApi';
import { FaUser, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type PropsFromRedux = ConnectedProps<typeof connector>;

const HomePage: React.FC<PropsFromRedux> = ({ tasks, text, isUpdating, taskId, setTasks, setText, setIsUpdating, setTaskId }) => {

  const [showPopup, setShowPopup] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getAuthenticatedUser();
        if (userInfo) {
          setUserInfo(userInfo);
        } else {
          navigate('/auth');
        }
      } catch (error) {
        console.log(error);
        navigate('/auth');
      }
    };
  
    fetchUserInfo();
  }, []);  

  useEffect(() => {
    if (userInfo) {
      getAllTasks(userInfo._id, setTasks)
    }
  }, [userInfo, setTasks]);

  const updateTaskMode = (_id: string, text: string) => {
    setIsUpdating(true)
    setText(text)
    setTaskId(_id)
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;
    return 0;
  });

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
    {userInfo && showPopup && (
      <div className="popup">
        <div className="popup-header">
          <h3>User Information</h3>
          <FaTimes onClick={() => setShowPopup(false)} style={{cursor: "pointer"}} />
        </div>
        <div className="popup-content">
          <p><span>Name:</span> {userInfo.name}</p>
          <p><span>Email:</span> {userInfo.email}</p>
        </div>
        <div className="buttons-div">
          <button onClick={handleLogout}>Logout</button>
          <button>Update</button>
        </div>
      </div>
    )}
    <div className={`container ${showPopup ? 'blur-popup' : ''}`}>
      <div className={`navigation ${showPopup ? 'hidden' : ''}`}>
        <FaUser onClick={() => setShowPopup(true)}  style={{cursor: "pointer"}} />
      </div>
      <h1>MY TASKS</h1>
      <div className="top">
        <input type="text" placeholder="Add your task here" value={text} onChange={(e) => setText(e.target.value)} />
        <div
          className="add"
          onClick={isUpdating ?
            () => updateTask(userInfo._id, taskId, text, setTasks, setText, setIsUpdating)
            : () => addTask(userInfo._id, text, setText, setTasks)}>
          {isUpdating ? "Update" : "Add"}
        </div>
      </div>
      <div className="list">
        {sortedTasks.map((item) =>
          <TaskComponent
            key={item._id}
            text={item.text}
            isComplete={item.isComplete}
            updateTaskMode={() => updateTaskMode(item._id, item.text)}
            deleteTask={() => deleteTask(userInfo._id, item._id, setTasks)}
            completeTask={() => markTaskAsComplete(userInfo._id,item._id, setTasks)}
          />
        )}
      </div>
    </div>
    </>
  );
}

const mapStateToProps = (state: { tasks: { tasks: any; text: any; isUpdating: any; taskId: any; }; }) => ({
  tasks: state.tasks.tasks,
  text: state.tasks.text,
  isUpdating: state.tasks.isUpdating,
  taskId: state.tasks.taskId,
});

const mapDispatchToProps = {
  setTasks,
  setText,
  setIsUpdating,
  setTaskId,
};

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(HomePage);