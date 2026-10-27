import React, { createContext, useEffect, useRef } from 'react';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const listenersRef = useRef(new Map());

  // Subscribe to an event
  const on = (event, callback) => {
    if (!listenersRef.current.has(event)) {
      listenersRef.current.set(event, new Set());
    }
    listenersRef.current.get(event).add(callback);

    // Return unsubscribe function
    return () => off(event, callback);
  };

  // Unsubscribe
  const off = (event, callback) => {
    if (listenersRef.current.has(event)) {
      listenersRef.current.get(event).delete(callback);
    }
  };

  // Emit event locally and to other tabs via StorageEvent
  const emit = (event, payload) => {
    // Local dispatch
    if (listenersRef.current.has(event)) {
      listenersRef.current.get(event).forEach((cb) => {
        try {
          cb(payload);
        } catch (err) {
          console.error(`Error in socket listener for ${event}:`, err);
        }
      });
    }

    // Broadcast across browser tabs
    try {
      localStorage.setItem(
        'campussync_socket_event',
        JSON.stringify({ event, payload, timestamp: Date.now() })
      );
    } catch (e) {
      // ignore
    }
  };

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'campussync_socket_event' && e.newValue) {
        try {
          const { event, payload } = JSON.parse(e.newValue);
          if (listenersRef.current.has(event)) {
            listenersRef.current.get(event).forEach((cb) => cb(payload));
          }
        } catch (err) {
          console.error('Error handling storage socket event:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <SocketContext.Provider value={{ emit, on, off, isConnected: true }}>
      {children}
    </SocketContext.Provider>
  );
};
