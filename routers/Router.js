import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { useEffect } from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Admin from "../screens/Admin"
import Customer from "../screens/Customer"
import ForgotPasswordScreen from "../screens/ForgotPassword";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService"
import ChangePassword from "../screens/ChangePassword";
const Stack = createStackNavigator()

const Router = () =>{
    return(
      <Stack.Navigator
      initialRouteName="Login"
        screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Service" component={Services}/>
        <Stack.Screen name="AddNewService" component={AddNewService}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen name="Admin" component={Admin}/>
        <Stack.Screen name="Customer" component={Customer}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        {/* <Stack.Screen name="Profile" component={Profile}/> */}
      </Stack.Navigator>
    )
}

export default Router