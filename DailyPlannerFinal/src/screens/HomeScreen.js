import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TasksContext } from '../context/TasksContext';

const HomeScreen = ({ navigation }) => {
  const { tasks } = useContext(TasksContext);

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>{new Date().toLocaleDateString()}</Text>
        <Text style={styles.dateTimeText}>{new Date().toLocaleTimeString()}</Text>
      </View>
      <Text style={styles.taskCountText}>Total Tasks: {tasks.length}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to Planner" onPress={() => navigation.navigate('Planner')} />
        <Button title="Quick Detail" onPress={() => navigation.navigate('Statistics')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  taskCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;
