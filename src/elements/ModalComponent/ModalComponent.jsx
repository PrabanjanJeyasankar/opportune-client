import React,{useEffect} from 'react'
import styles from '../ModalComponent/ModalComponent.module.css'



const ModalComponent = ({ isOpen, message, type, onClose }) => {
    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => {
          onClose();
        }, 2000); 
  
        return () => clearTimeout(timer); 
      }
    }, [isOpen, onClose]);
  
    if (!isOpen) return null;
  
    return (
      <div className={styles.modal_overlay}>
        <div className={styles.modal}>
          <div className={`${styles.modal_content} ${styles[type]}`}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  };

export default ModalComponent