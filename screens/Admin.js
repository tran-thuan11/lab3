import { Text, View } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import MyStack from "../routers/MyStack"
const Tab = createMaterialBottomTabNavigator()
const Admin = () =>{
    return(
       <Tab.Navigator>
        <Tab.Screen name="MyStack" component={MyStack}
        options={{title:"Home",tabBarIcon:"home"}}/>
        {/* <Tab.Screen name="Transaction" component={MyStack}
        options={{tabBarIcon:"cash"}}/>
        <Tab.Screen name="Customers" component={MyStack}
        options={{tabBarIcon:"account"}}/>
        <Tab.Screen name="Setting" component={MyStack}
        options={{tabBarIcon:"cog"}}/> */}
       </Tab.Navigator>
    )
}
export default Admin