import axios from 'axios';

const baseUrl = 'https://todo-app-apis.onrender.com';

const getAllTasks = (setTask: { (tasks: any): { type: string; payload: any; }; (arg0: any): void; }) => {
    axios.get(baseUrl).then(({data}) => {
        console.log(data)
        setTask(data)
    }).catch((error) => console.log(error))
}

const addTask = (text: string, setText: { (text: any): { type: string; payload: any; }; (arg0: string): void; }, setTask: (tasks: any) => { type: string; payload: any; }) =>{
    axios
    .post(`${baseUrl}/save`, {text})
    .then((data) => {
        console.log(data);
        setText("");
        getAllTasks(setTask)
    }).catch((error) => console.log(error))
}

const updateTask = (taskId: string, text: string, setTask: (tasks: any) => { type: string; payload: any; }, setText: { (text: any): { type: string; payload: any; }; (arg0: string): void; }, setIsUpdating: { (isUpdating: any): { type: string; payload: any; }; (arg0: boolean): void; }) =>{
    axios
    .put(`${baseUrl}/update`, {_id: taskId, text})
    .then((data) => {
        console.log(data)
        setText("")
        setIsUpdating(false)
        getAllTasks(setTask)
    }).catch((error) => console.log(error))
}

const deleteTask = (_id: string, setTask: (tasks: any) => { type: string; payload: any; }) =>{
    axios
    .delete(`${baseUrl}/delete`, { data: { _id } })
    .then((data) => {
        console.log(data);
        getAllTasks(setTask);
    }).catch((error) => console.log(error));
}

const markTaskAsComplete = (_id: string, setTask: (tasks: any) => { type: string; payload: any; }) => {
    axios
    .put(`${baseUrl}/complete`, { _id })
    .then((data) => {
        console.log(data);
        getAllTasks(setTask);
    }).catch((error) => console.log(error));
}

export {getAllTasks, addTask, updateTask, deleteTask, markTaskAsComplete}