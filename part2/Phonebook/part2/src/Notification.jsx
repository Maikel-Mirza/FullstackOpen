import React, { useEffect, useRef } from 'react';

const Notification = ({ message, setNotificationMessage }) => {
  const timeoutRef = useRef(null);


  useEffect(() => {
    // Clear the previous timeout, if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout for 3000 milliseconds only if there is a message
    if (message) {
      timeoutRef.current = setTimeout(() => {
        // Clear the message after the timeout
        setNotificationMessage(null);
      }, 3000);
    }

    // Clean up the timeout on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, setNotificationMessage]);

  // Render the component only if there is a message
  if (!message) {
    return null;
  }


  const notificationStyle = {
    color: message.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontStyle: 'italic',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  
  return (
    <div className="notification" style={notificationStyle}>
      {message.message}
    </div>
  );
};

export default Notification;
