import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TasksContext } from '../context/TasksContext';

const PlannerScreen = () => {
  const { tasks, setTasks, taskNotes, setTaskNotes, taskColors, setTaskColors, saveData } = useContext(TasksContext);
  const [taskInput, setTaskInput] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = { text: taskInput, color: 'rgba(255, 255, 255, 0.3)' };
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

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    const updatedTaskNotes = [...taskNotes];
    const updatedTaskColors = [...taskColors];
    updatedTasks.splice(index, 1);
    updatedTaskNotes.splice(index, 1);
    updatedTaskColors.splice(index, 1);
    setTasks(updatedTasks);
    setTaskNotes(updatedTaskNotes);
    setTaskColors(updatedTaskColors);
    saveData(updatedTasks, updatedTaskNotes, updatedTaskColors);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
    saveData(updatedTasks, taskNotes, taskColors);
  };

  const addNote = (index, note) => {
    const updatedTaskNotes = [...taskNotes];
    updatedTaskNotes[index] = note;
    setTaskNotes(updatedTaskNotes);
    saveData(tasks, updatedTaskNotes, taskColors);
  };

  const selectColor = (index, color) => {
    const updatedTaskColors = [...taskColors];
    updatedTaskColors[index] = color;
    setTaskColors(updatedTaskColors);
    saveData(tasks, taskNotes, updatedTaskColors);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
        <Text style={styles.titletext}>Daily Tasks</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={taskInput}
          onChangeText={(text) => setTaskInput(text)}
        />
        <Button title="Add Task" onPress={addTask} />
        <ScrollView style={styles.scrollView} keyboardDismissMode="on-drag">
          {tasks.map((task, index) => (
            <View key={index} style={[styles.taskContainer, { backgroundColor: taskColors[index] }]}>
              <TextInput
                style={styles.taskTextInput}
                value={task.text}
                onChangeText={(text) => editTask(index, text)}
              />
              <TextInput
                style={styles.taskNoteInput}
                placeholder="Add note"
                value={taskNotes[index]}
                onChangeText={(text) => addNote(index, text)}
              />
              <View style={styles.buttonsContainer}>
                <Button title="Delete" onPress={() => deleteTask(index)} />
              </View>
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
    </TouchableWithoutFeedback>
  );
};

const ColorButton = ({ title, color, onPress }) => {
  return (
    <Button title={title} onPress={onPress} color={color} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titletext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  scrollView: {
    marginTop: 20,
  },
  taskContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  taskTextInput: {
    fontSize: 18,
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  taskNoteInput: {
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});


export default PlannerScreen;
