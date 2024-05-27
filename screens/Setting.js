import { useEffect } from "react"
import { logout, useMyContextController } from "../store"
import { View } from "react-native"
import { Button } from "react-native-paper"

const Setting = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const handleLogout = () =>{
        logout(dispatch)
    }
    useEffect(()=>{
        if(userLogin == null) navigation.navigate("Login")
    }, [userLogin])
    return(
        <View style={{flex:1, justifyContent:'center'}}>
            <Button onPress={handleLogout} mode="contained">
                Logout
            </Button>
        </View>
    )
}
export default Setting