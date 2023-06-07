import React from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Login from "../pages/Login";
import Cadastrar from "../pages/Cadastrar";
import Home from "../pages/Home";
import New from "../pages/New";
import Detail from "../pages/Detail";

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
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/> 
                <Stack.Screen name='Cadastro' component={Cadastrar} options={{headerShown: false}}/> 
                <Stack.Screen name='Top' component={MyTop} options={{headerShown: false}}/> 
                <Stack.Screen name='Detalhes' 
                    component={Detail} 
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#1C1C1C',
                        },
                        headerTintColor: '#fff'
                    }}
                /> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}