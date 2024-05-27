import { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { View, Image, Text, FlatList } from "react-native"
import { IconButton } from "react-native-paper"
const Services = ({navigation}) =>{
    const [services, setServices] = useState([])
    const cSERVICES = firestore().collection("SERVICES")

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: null,
           
          });
        cSERVICES.onSnapshot(response => {
            var arr = []
            response.forEach(doc => arr.push(doc.data()))
            setServices(arr)
        })
    },[])
    const renderItem = ({item}) =>{
        const {serviceName, price} = item
        return(
            <View style={{flexDirection:"row", borderWidth:1, height:60, borderRadius: 10, margin:5, justifyContent:"space-between", alignItems:"center", padding:10}}>
                <Text style={{fontSize:25, fontWeight:"bold"}}>{serviceName}</Text>
                <Text>{price}đ</Text>
            </View>
        )
    }
    return(
        <View style={{flex:1}}>
            <Image style={{alignSelf:"center", marginVertical:50}} source={require("../assets/logo.png")} />
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Text style={{
                    fontSize:24,
                    marginLeft:5,
                    fontWeight:'bold'
                }}>
                    Danh sách dịch vụ
                </Text>
                <IconButton icon={"plus-circle"} iconColor="red" size={40} onPress={()=>{navigation.navigate("AddNewService")}}/>
            </View>
            <FlatList data={services} keyExtractor={item => item.id} renderItem={renderItem}/>
        </View>
    )
}
export default Services