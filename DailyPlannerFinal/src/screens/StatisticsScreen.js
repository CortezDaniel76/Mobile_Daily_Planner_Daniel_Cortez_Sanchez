import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TasksContext } from '../context/TasksContext';

const StatisticsScreen = () => {
  const { taskColors } = useContext(TasksContext);

  // Define the four specific colors you want to display
  const allowedColors = ['rgba(255, 99, 71, 0.3)', 'rgba(0, 0, 255, 0.3)', 'rgba(0, 128, 0, 0.3)', 'rgba(128, 0, 128, 0.3)'];

  // Function to count the number of tasks in each color category
  const countTasksByColor = () => {
    const colorCounts = {};
    taskColors.forEach(color => {
      if (colorCounts[color]) {
        colorCounts[color]++;
      } else {
        colorCounts[color] = 1;
      }
    });
    return colorCounts;
  };

  // Get the counts of tasks in each color category
  const colorCounts = countTasksByColor();

  // Filter out colors that are not in the allowed colors list
  const filteredColorCounts = Object.entries(colorCounts)
    .filter(([color]) => allowedColors.includes(color));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick View of Task Numbers</Text>
      {filteredColorCounts.map(([color, count]) => (
        <View key={color} style={[styles.colorContainer, { backgroundColor: color }]}>
          <Text style={styles.count}>{count}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default StatisticsScreen;
