import axios from 'axios';

const baseUrl = 'https://todo-app-apis.onrender.com';

const getAllTasks = (userId: string, setTask: { (tasks: any): { type: string; payload: any; }; (arg0: any): void; }) => {
    axios.get(`${baseUrl}?userId=${userId}`).then(({data}) => {
        console.log(data)
        setTask(data)
    }).catch((error) => console.log(error))
}

const addTask = (userId: string, text: string, setText: { (text: any): { type: string; payload: any; }; (arg0: string): void; }, setTask: (tasks: any) => { type: string; payload: any; }) =>{
    axios
    .post(`${baseUrl}/save`, {userId, text})
    .then((data) => {
        console.log(data);
        setText("");
        getAllTasks(userId, setTask);
    }).catch((error) => console.log(error))
}

const updateTask = (userId: string, taskId: string, text: string, setTask: (tasks: any) => { type: string; payload: any; }, setText: { (text: any): { type: string; payload: any; }; (arg0: string): void; }, setIsUpdating: { (isUpdating: any): { type: string; payload: any; }; (arg0: boolean): void; }) =>{
    axios
    .put(`${baseUrl}/update`, {userId, _id: taskId, text})
    .then((data) => {
        console.log(data)
        setText("")
        setIsUpdating(false)
        getAllTasks(userId, setTask);
    }).catch((error) => console.log(error))
}

const deleteTask = (userId: string, _id: string, setTask: (tasks: any) => { type: string; payload: any; }) =>{
    axios
    .delete(`${baseUrl}/delete`, { data: { userId, _id } })
    .then((data) => {
        console.log(data);
        getAllTasks(userId, setTask);
    }).catch((error) => console.log(error));
}

const markTaskAsComplete = (userId: string, _id: string, setTask: (tasks: any) => { type: string; payload: any; }) => {
    axios
    .put(`${baseUrl}/complete`, { userId, _id })
    .then((data) => {
        console.log(data);
        getAllTasks(userId, setTask);
    }).catch((error) => console.log(error));
}

const registerUser = (name: string, email: string, password: string) => {
    axios
    .post(`${baseUrl}/register`, { name, email, password })
    .then((data) => {
        console.log(data);
    }).catch((error) => console.log(error));
}

const loginUser = (email: string, password: string, navigate: { (arg0: string): void; }) => {
    axios
    .post(`${baseUrl}/login`, { email, password }, { withCredentials: true })
    .then((data) => {
        console.log(data);
        navigate('/');
    }).catch((error) => console.log(error));
}

const getAuthenticatedUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/authenticated`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  const logoutUser = async () => {
    try {
      await axios.post(`${baseUrl}/logout`, { withCredentials: true });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export {getAllTasks, addTask, updateTask, deleteTask, markTaskAsComplete, registerUser, loginUser, getAuthenticatedUser, logoutUser}