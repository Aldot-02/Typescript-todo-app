export const setTasks = (tasks: any) => ({
    type: "SET_TASKS",
    payload: tasks,
});

export const setText = (text: any) => ({
    type: "SET_TEXT",
    payload: text,
});

export const setIsUpdating = (isUpdating: any) => ({
    type: "SET_IS_UPDATING",
    payload: isUpdating,
});

export const setTaskId = (taskId: any) => ({
    type: "SET_TASK_ID",
    payload: taskId,
});