//Daniel Cortez-Sanchez 5/5/2024 
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import PlannerScreen from "./src/screens/PlannerScreen";


const navigator = createStackNavigator(

  {
    Home: HomeScreen,
    Planner: PlannerScreen
  },
  //options for the navigator
  {
    
    initialRouteName: "Home",
   
    defaultNavigationOptions: {
      
      title: "Daily Planner App ",
    },
  }
);
export default createAppContainer(navigator);
