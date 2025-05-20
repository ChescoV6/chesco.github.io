import React from 'react';

const NotificationCenter = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-2 right-2 w-64 max-h-72 overflow-y-auto space-y-1">
      {notifications.map((notif) => (
        <div key={notif.id} className="notification flex justify-between items-center">
          <span className="text-xs">{notif.message}</span>
          <button
            onClick={() => removeNotification(notif.id)}
            className="text-red-400 hover:text-red-500 text-xs"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;