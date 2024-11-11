import React, { useState } from 'react';
import SpecButtons from './SpecButtons';
import EditModal from './EditModal';
import ShareModal from './ShareModal';
import InfoModal from './InfoModal';
import '../../styles/tasks.scss';

const DraggableTaskList = ({ tasks, setTasks, deleteTask, editTask, gifs }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const [currentGif, setCurrentGif] = useState(null);
    const [currentTask, setCurrentTask] = useState({ index: null, title: '', description: '' });

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index) => {
        if (index !== draggedIndex) {
            const updatedTasks = [...tasks];
            const [movedTask] = updatedTasks.splice(draggedIndex, 1);
            updatedTasks.splice(index, 0, movedTask);
            setTasks(updatedTasks);
            setDraggedIndex(index);
        }
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleTaskClick = (index) => {
        setActiveTaskIndex(activeTaskIndex === index ? null : index);
    };

    const handleEditTask = (index) => {
        const task = tasks[index];
        setCurrentTask({ index, title: task.title, description: task.description });
        setEditModalOpen(true);
    };

    const handleShareTask = (index) => {
        const task = tasks[index];
        setCurrentTask(task);
        setShareModalOpen(true);
    };

    const handleInfoTask = () => {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        setCurrentGif(gifs[randomIndex]);
        setInfoModalOpen(true);
    };

    const handleSaveEdit = (newTitle, newDesc) => {
        if (newTitle.trim() === '') return;
        editTask(currentTask.index, newTitle, newDesc);
        setEditModalOpen(false);
    };

    const truncateText = (text) => {
        return text.length > 28 ? text.slice(0, 28) + '...' : text;
    };

    return (
        <>
            {tasks.map((task, index) => (
                <div
                    className="task"
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={() => handleDragOver(index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleTaskClick(index)}
                    style={{ marginBottom: activeTaskIndex === index ? '70px' : '8px' }}
                >
                    <div>
                        <strong className="task-title">{truncateText(task.title)}</strong><br />
                        <span className="task-body">{truncateText(task.description)}</span>
                    </div>
                    <button className="delete-button" onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(index);
                    }}>×</button>
                    {activeTaskIndex === index && (
                        <SpecButtons 
                            onEdit={() => handleEditTask(index)} 
                            onShare={() => handleShareTask(index)} 
                            onInfo={handleInfoTask}
                        />
                    )}
                </div>
            ))}
            <EditModal 
                isOpen={isEditModalOpen} 
                onClose={() => setEditModalOpen(false)} 
                onSave={handleSaveEdit} 
                fullTitle={currentTask.title} 
                fullDesc={currentTask.description} 
            />
            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setShareModalOpen(false)} 
                fullTitle={currentTask.title} 
                fullDescription={currentTask.description} 
            />
            <InfoModal 
                isOpen={isInfoModalOpen} 
                onClose={() => setInfoModalOpen(false)} 
                gif={currentGif}
            />
        </>
    );
};

export default DraggableTaskList;
