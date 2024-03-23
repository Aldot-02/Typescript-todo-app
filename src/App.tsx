import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TaskComponent from './components/taskComponent';
import { addTask, deleteTask, getAllTasks, updateTask, markTaskAsComplete } from './api/handleApi';
import { setTasks, setText, setIsUpdating, setTaskId } from './actions/taskAction';

type PropsFromRedux = ConnectedProps<typeof connector>;

const App: React.FC<PropsFromRedux> = ({ tasks, text, isUpdating, taskId, setTasks, setText, setIsUpdating, setTaskId }) => {

  useEffect(() => {
    getAllTasks(setTasks)
  }, [setTasks]);

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

  return (
    <div className="App">
      <div className="container">
        <h1>ATLP TODO APP</h1>
        <div className="top">
          <input type="text" placeholder="Add your task here" value={text} onChange={(e) => setText(e.target.value)} />
          <div
            className="add"
            onClick={isUpdating ?
              () => updateTask(taskId, text, setTasks, setText, setIsUpdating)
              : () => addTask(text, setText, setTasks)}>
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
              deleteTask={() => deleteTask(item._id, setTasks)}
              completeTask={() => markTaskAsComplete(item._id, setTasks)}
            />
          )}
        </div>
      </div>
    </div>
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

export default connector(App);