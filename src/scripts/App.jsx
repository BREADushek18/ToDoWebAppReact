import React, { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../scripts/utils/localStorage.js';
import TaskInput from '../scripts/components/TaskInput';
import TaskList from '../scripts/components/TaskList';
import DeleteTaskModal from '../scripts/components/DeleteTaskModal'; 
import '../styles/base.scss';
import '../styles/buttons.scss';
import '../styles/layout.scss';
import '../styles/modals.scss';
import '../styles/notes.scss';
import '../styles/tasks.scss';

import cat1 from '../assets/images/cat1.gif';
import cat2 from '../assets/images/cat2.gif';
import cat3 from '../assets/images/cat3.gif';
import cat4 from '../assets/images/cat4.gif';
import cat5 from '../assets/images/cat5.gif';

const gifs = [cat1, cat2, cat3, cat4, cat5];

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        const savedTasks = loadTasks();
        setTasks(savedTasks);
    }, []);

    const addTask = (title, description) => {
        const newTask = { title, description };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const openDeleteModal = (index) => {
        setTaskToDelete(index);
        setModalOpen(true);
    };

    const deleteTask = () => {
        const updatedTasks = tasks.filter((_, i) => i !== taskToDelete);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setModalOpen(false);
        setTaskToDelete(null);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTaskToDelete(null);
    };

    const editTask = (index, title, description) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, title, description } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    return (
        <div className="new-note-container">
            <TaskInput addTask={addTask} />
            <TaskList 
                tasks={tasks} 
                setTasks={setTasks} 
                deleteTask={openDeleteModal} 
                editTask={editTask} 
                gifs={gifs} 
            />
            <DeleteTaskModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onDelete={deleteTask} 
            />
        </div>
    );
}
