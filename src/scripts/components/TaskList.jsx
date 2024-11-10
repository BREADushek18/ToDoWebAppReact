import React, { useState } from 'react';
import SpecButtons from './SpecButtons';
import EditModal from './EditModal';
import ShareModal from './ShareModal';
import InfoModal from './InfoModal';
import '../../styles/tasks.scss';

const TaskList = ({ tasks, deleteTask, editTask, shareTask, gifs }) => {
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const [currentGif, setCurrentGif] = useState(null);
    const [currentTask, setCurrentTask] = useState({ title: '', description: '' });

    const handleTaskClick = (index) => {
        if (activeTaskIndex === index) {
            setActiveTaskIndex(null);
        } else {
            setActiveTaskIndex(index);
        }
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
        if (newTitle.trim() === '') {
            alert('Название задачи не может быть пустым!');
            return;
        }

        // Обновляем задачу
        const updatedTitle = newTitle.length > 28 ? newTitle.slice(0, 28) + '...' : newTitle;
        const updatedDesc = newDesc.length > 28 ? newDesc.slice(0, 28) + '...' : newDesc;

        editTask(currentTask.index, updatedTitle, updatedDesc);
        setEditModalOpen(false);
    };

    const truncateText = (text) => {
        return text.length > 28 ? text.slice(0, 28) + '...' : text;
    };

    return (
        <div className="task-container">
            {tasks.length === 0 ? (
                <>
                    <div className="divider"></div>
                    <div id="no-tasks">No tasks</div>
                    <div className="divider"></div>
                </>
            ) : (
                tasks.map((task, index) => (
                    <div 
                        className="task" 
                        key={index} 
                        data-full-title={task.title} 
                        data-full-desc={task.description}
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
                ))
            )}
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
        </div>
    );
};

export default TaskList;
