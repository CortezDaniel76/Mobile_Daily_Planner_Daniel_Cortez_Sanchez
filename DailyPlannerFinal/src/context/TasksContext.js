import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskNotes, setTaskNotes] = useState([]);
  const [taskColors, setTaskColors] = useState([]);

  useEffect(() => {
    const retrieveTasks = async () => {
      try {
        const storedTasks = await SecureStore.getItemAsync('tasks');
        const storedTaskNotes = await SecureStore.getItemAsync('taskNotes');
        const storedTaskColors = await SecureStore.getItemAsync('taskColors');
        
        if (storedTasks) setTasks(JSON.parse(storedTasks));
        if (storedTaskNotes) setTaskNotes(JSON.parse(storedTaskNotes));
        if (storedTaskColors) setTaskColors(JSON.parse(storedTaskColors));
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    retrieveTasks();
  }, []);

  const saveData = async (updatedTasks, updatedTaskNotes, updatedTaskColors) => {
    try {
      await SecureStore.setItemAsync('tasks', JSON.stringify(updatedTasks));
      await SecureStore.setItemAsync('taskNotes', JSON.stringify(updatedTaskNotes));
      await SecureStore.setItemAsync('taskColors', JSON.stringify(updatedTaskColors));
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, taskNotes, setTaskNotes, taskColors, setTaskColors, saveData }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
