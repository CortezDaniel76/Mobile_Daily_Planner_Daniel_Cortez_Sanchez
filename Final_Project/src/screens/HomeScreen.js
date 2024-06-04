import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = ({ navigation }) => {
  //State variables to store the number of tasks and current date/time
  const [numTasks, setNumTasks] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  //useEffect hook to run code when the comp mounts
  useEffect(() => {
    //Retrieve tasks from SecureStorage and update the num of tasks
    retrieveTasks();

    //Set up a timer to update the current date/time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    //Clean up the timer 
    return () => clearInterval(timer);
  }, []);

  //Function to retrieve tasks from SecureStorage
  const retrieveTasks = async () => {
    try {
      //Retrieve tasks from SecureStorage
      const storedTasks = await SecureStore.getItemAsync('tasks');
      //If tasks are found, update the number of tasks
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        setNumTasks(tasks.length);
      }
    } catch (error) {
      //Log an error if you can't retrieve anything displayable
      console.log('Error retrieving tasks:', error);
    }
  };

  //Render the HomeScreen component
  return (
    <View style={styles.container}>
      {/* Display the current date and time */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleDateString()}
        </Text>
        <Text style={styles.dateTimeText}>
          {currentDateTime.toLocaleTimeString()}
        </Text>
      </View>
      {/* Display the total number of tasks */}
      <View style={styles.taskCountContainer}>
        <Text style={styles.taskCountText}>Total Tasks: {numTasks}</Text>
      </View>
      {/* Button to navigate to the PlannerScreen */}
      <View style={styles.buttonContainer}>
        <Button
          title="Planner"
          onPress={() => navigation.navigate('Planner')}
          color="#228B22"
        />
      </View>
    </View>
  );
};

//Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  taskCountContainer: {
    marginBottom: 20,
  },
  taskCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

//Export the HomeScreen component
export default HomeScreen;
