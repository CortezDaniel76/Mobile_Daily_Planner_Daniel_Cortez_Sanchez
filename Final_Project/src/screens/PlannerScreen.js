import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

//PlannerScreen component
const PlannerScreen = () => {
  //State variables to manage tasks, task input, edited task text, task notes, task colors, and current date/time
  const [tasks, setTasks] = useState([]); //Array to store tasks
  const [taskInput, setTaskInput] = useState(''); //Input field for adding tasks
  const [taskNotes, setTaskNotes] = useState(Array.from({ length: 50 }, () => '')); // Array to store task notes
  const [taskColors, setTaskColors] = useState(Array.from({ length: 50 }, () => 'rgba(255, 255, 255, 0.3)')); //Array to store task colors
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); //Current date/time

  //useEffect hook to run code when the component mounts
  useEffect(() => {
    //Set up a timer to update the current date/time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    //Retrieve tasks, task notes, and task colors from SecureStore when component mounts
    retrieveTasks();

    //Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  //Function to retrieve tasks, task notes, and task colors from SecureStore
  const retrieveTasks = async () => {
    try {
      //Retrieve tasks, task notes, and task colors from SecureStore
      const storedTasks = await SecureStore.getItemAsync('tasks');
      const storedTaskNotes = await SecureStore.getItemAsync('taskNotes');
      const storedTaskColors = await SecureStore.getItemAsync('taskColors');
      
      //If data is found, update the corresponding state variables
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      if (storedTaskNotes) {
        setTaskNotes(JSON.parse(storedTaskNotes));
      }
      if (storedTaskColors) {
        setTaskColors(JSON.parse(storedTaskColors));
      }
    } catch (error) {
      //Log an error if data retrieval fails
      console.log('Error retrieving data:', error);
    }
  };

  //Function to save tasks, task notes, and task colors to SecureStore
  const saveData = async (updatedTasks, updatedTaskNotes, updatedTaskColors) => {
    try {
      //Save tasks, task notes, and task colors to SecureStore
      await SecureStore.setItemAsync('tasks', JSON.stringify(updatedTasks));
      await SecureStore.setItemAsync('taskNotes', JSON.stringify(updatedTaskNotes));
      await SecureStore.setItemAsync('taskColors', JSON.stringify(updatedTaskColors));
    } catch (error) {
      //Log an error if data saving fails
      console.log('Error saving data:', error);
    }
  };

  //Function to add a new task
  const addTask = () => {
    if (taskInput.trim() !== '') {
      //Create a new task object
      const newTask = {
        text: taskInput,
        color: 'rgba(255, 255, 255, 0.3)' //Make sure its not too solid!!!!!!
      };
      const updatedTasks = [...tasks, newTask];
      const updatedTaskNotes = [...taskNotes, ''];
      const updatedTaskColors = [...taskColors, 'rgba(255, 255, 255, 0.3)'];
      setTasks(updatedTasks);
      setTaskNotes(updatedTaskNotes);
      setTaskColors(updatedTaskColors);
      saveData(updatedTasks, updatedTaskNotes, updatedTaskColors);
      setTaskInput('');
    }
  }; 
  //Function to delete a task
  const deleteTask = (index) => {
    //Create updated arrays without the task to be deleted
    const updatedTasks = [...tasks];
    const updatedTaskNotes = [...taskNotes];
    const updatedTaskColors = [...taskColors];
    updatedTasks.splice(index, 1);
    updatedTaskNotes.splice(index, 1);
    updatedTaskColors.splice(index, 1);
    //Update state variables with updated arrays
    setTasks(updatedTasks);
    setTaskNotes(updatedTaskNotes);
    setTaskColors(updatedTaskColors);
    //Save updated data to SecureStore
    saveData(updatedTasks, updatedTaskNotes, updatedTaskColors);
  };

  //Function to edit a task
  const editTask = (index, newText) => {
    //Create a copy of tasks array and update the text of the task at the given index
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    //Update state variable with the updated array
    setTasks(updatedTasks);
    //Save updated data to SecureStore
    saveData(updatedTasks, taskNotes, taskColors);
  };

  //Function to add a note to a task
  const addNote = (index, note) => {
    //Create a copy of task notes array and update the note at the given index
    const updatedTaskNotes = [...taskNotes];
    updatedTaskNotes[index] = note;
    //Update state variable with the updated array
    setTaskNotes(updatedTaskNotes);
    //Save updated data to SecureStore
    saveData(tasks, updatedTaskNotes, taskColors);
  };

  //Function to select a color for a task
  const selectColor = (index, color) => {
    //Create a copy of task colors array and update the color at the given index
    const updatedTaskColors = [...taskColors];
    updatedTaskColors[index] = color;
    //Update state variable with the updated array
    setTaskColors(updatedTaskColors);
    //Save updated data to SecureStore
    saveData(tasks, taskNotes, updatedTaskColors);
  };

  //Render the PlannerScreen component
  return (
    <View style={styles.container}>
      {/* Display current date, time, and weekday */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleDateString()}
        </Text>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleTimeString()}
        </Text>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleDateString('en-US', { weekday: 'long' })}
        </Text>
      </View>
      {/* Title for task input section */}
      <Text style={styles.titletext}>Daily Tasks</Text>
      {/* Input field for adding tasks */}
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={taskInput}
        onChangeText={(text) => setTaskInput(text)}
      />
      {/* Button to add a task */}
      <Button title="Add Task" onPress={addTask} />
      {/* ScrollView to display tasks */}
      <ScrollView style={styles.scrollView}>
        {/* Map through tasks and display each task */}
        {tasks.map((task, index) => (
          <View key={index} style={[styles.taskContainer, { backgroundColor: taskColors[index] }]}>
            {/* Input field to edit task text */}
            <TextInput
              style={styles.taskTextInput}
              value={task.text}
              onChangeText={(text) => editTask(index, text)}
            />
            {/* Input field to add/edit task note */}
            <TextInput
              style={styles.taskNoteInput}
              placeholder="Add note"
              value={taskNotes[index]}
              onChangeText={(text) => addNote(index, text)}
            />
            {/* Button to delete task */}
            <View style={styles.buttonsContainer}>
              <Button title="Delete" onPress={() => deleteTask(index)} />
            </View>
            {/* Buttons to select task color */}
            <View style={styles.colorButtonsContainer}>
              <ColorButton title="Exercise" color="red" onPress={() => selectColor(index, 'rgba(255, 99, 71, 0.3)')} />
              <ColorButton title="Work" color="blue" onPress={() => selectColor(index, 'rgba(0, 0, 255, 0.3)')} />
              <ColorButton title="School" color="green" onPress={() => selectColor(index, 'rgba(0, 128, 0, 0.3)')} />
              <ColorButton title="Misc" color="purple" onPress={() => selectColor(index, 'rgba(128, 0, 128, 0.3)')} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

//ColorButton component to select task color
const ColorButton = ({ title, color, onPress }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      color={color}
    />
  );
};

//Styles for the PlannerScreen 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ccc',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginTop: 20,
  },
  taskContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  taskTextInput: {
    marginBottom: 10,
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  taskNoteInput: {
    marginBottom: 10,
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'flex-end',
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  titletext: {
    alignSelf: "center",
    fontWeight: 'bold', 
    fontSize: 18, 
  }
});

//Export the PlannerScreen component
export default PlannerScreen;
