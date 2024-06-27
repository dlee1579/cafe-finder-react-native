import { Text, TextInput, View } from "react-native";
import { Home } from "@/pages/home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import Favorites from "@/pages/favorites";
import Profile from "@/pages/profile";

const Stack = createNativeStackNavigator();

export default function Index() {

  return (
    // <Home></Home>
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
