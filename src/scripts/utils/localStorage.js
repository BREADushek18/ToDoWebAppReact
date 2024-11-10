export const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};

export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};