import React from "react";
import { View, Text ,TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MovieList from "./components/movies";
import Search from "./components/search";
import MovieDetails from "./components/moviedetails"; // import the MovieDetails component
import { Ionicons } from "@expo/vector-icons";
const Stack = createStackNavigator();

export default () => {
  let [fontsLoaded] = useFonts({
    
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="movies"
          component={MovieList}
          options={({ navigation }) => ({
            headerTitle: "My Movies",
            
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate("search")}
              >
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="search"
          component={Search}
          options={{ title: "Movie Search" }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{ title: "Movie Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};