import React from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Login from "../pages/Login";
import Cadastrar from "../pages/Cadastrar";
import Home from "../pages/Home";
import New from "../pages/New";

const Top = createMaterialTopTabNavigator();

function MyTop(){
    return(
        <Top.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor: "#1C1C1C", marginTop: 50 },
            tabBarLabelStyle: { fontWeight: "bold", color: '#fff' },
            tabBarIndicatorStyle: { backgroundColor: "#257ef4" },
        }}            
        >
            <Top.Screen name="Home" component={Home}/>
            <Top.Screen name="New" component={New}/>
        </Top.Navigator>
    )
}

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='Login' component={Login}/> 
                <Stack.Screen name='Cadastro' component={Cadastrar}/> 
                <Stack.Screen name='Top' component={MyTop}/> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}