import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { useMyContextController } from "../store";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService";
import ServiceDetaill from "../screens/ServiceDetaill";

const Stack = createStackNavigator()
const MyStack = () =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    return(
        <Stack.Navigator
        initialRouteName="Services"
        screenOptions={{
            title: (userLogin!=null) && (userLogin.name),
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:"black"
            },
        }}>
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="AddNewService" component={AddNewService}/>
            <Stack.Screen name="ServiceDetail" component={ServiceDetaill}/>
        </Stack.Navigator>
    )
}
export default MyStack