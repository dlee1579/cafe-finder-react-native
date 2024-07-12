import { Text, TextInput, View } from "react-native";
import { Home } from "@/pages/home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Favorites from "@/pages/favorites";
import Profile from "@/pages/profile";
import CafeDetails from "@/pages/cafe";
import Login from "@/pages/login";
import AddReview from "@/pages/addReview";
import { StackParamList } from "@/types";

const Stack = createNativeStackNavigator<StackParamList>();

const GlobalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(207, 182, 157)",
  },
};

export default function Index() {

  return (
    <NavigationContainer independent={true} theme={GlobalTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Cafe" component={CafeDetails}/>
        <Stack.Screen name="AddReview" component={AddReview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
