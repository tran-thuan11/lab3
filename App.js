import Login from "./screens/Login";
import { MyContextControllerProvider } from "./store";
import Router from "./routers/Router"
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

const App = () =>{
  useEffect(()=>{
    
    const USERS = firestore().collection("USERS")
    const admin = {
      phone: "111111",
      password: "123456789",
      fullName: "Tran minh thuan",
      email: "2024802010305@student.tdmu.edu.vn",
      role: "admin"
    }
    USERS.doc(admin.email).onSnapshot(u => {
      if(!u.exists)
      { 
        auth().createUserWithEmailAndPassword(admin.email, admin.password).then(response=>{
          USERS.doc(admin.email).set(admin).then(()=> console.log("Add new user admin!"))
        })
      }
    })
  },[])
  return(
    <View style={{flex:1}}>
      <StatusBar style="light" />
    <MyContextControllerProvider>
          <NavigationContainer>
            <Router/>
          </NavigationContainer>
        </MyContextControllerProvider>
    </View>
  
 
  )
}
export default App