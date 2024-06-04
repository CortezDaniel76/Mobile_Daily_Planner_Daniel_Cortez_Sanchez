import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TasksProvider } from './src/context/TasksContext';
import HomeScreen from './src/screens/HomeScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <TasksProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Planner" component={PlannerScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
};

export default App;
