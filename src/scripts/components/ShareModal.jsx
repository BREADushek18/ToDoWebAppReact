import React from 'react';

const ShareModal = ({ isOpen, onClose, fullTitle, fullDescription }) => {
    const handleCopy = () => {
        const textToCopy = `Задача: ${fullTitle}\nОписание задачи: ${fullDescription}\nЗадача была создана в самом лучшем To Do приложении разработчиком BREADushek <3`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Текст скопирован в буфер обмена!');
                onClose();
            })
            .catch(err => console.error('Ошибка копирования: ', err));
    };

    return (
        <div className={`share-modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleCopy}>
                    <img src="../src/assets/icons/copy-modal-share.svg" alt="Копировать" />
                </button>
                <button className="icon-button">
                    <img src="../src/assets/icons/vk-modal-share.svg" />
                </button>
                <button className="icon-button">
                    <img src="../src/assets/icons/telegram-modal-share.svg" alt="Telegram" />
                </button>
                <button className="icon-button">
                    <img src="../src/assets/icons/whatsapp-modal-share.svg" alt="WhatsApp" />
                </button>
                <button className="icon-button">
                    <img src="../src/assets/icons/facebook-modal-share.svg" alt="Facebook" />
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
