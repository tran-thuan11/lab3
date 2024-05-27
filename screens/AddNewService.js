import { useState } from "react"
import { useMyContextController } from "../store"
import firestore from "@react-native-firebase/firestore"
import { View, Image, StyleSheet} from "react-native"
import { HelperText, TextInput , Button } from "react-native-paper"
import ImageCropPicker from "react-native-image-crop-picker"
import storage from "@react-native-firebase/storage"

const AddNewService = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [serviceName, setServiceName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const hasErrorServiceName = () => serviceName ==""
    const hasErrorPrice = () => price <= 0
    const SERVICES = firestore().collection("SERVICES")

    const handleAddNewService = () =>{
        SERVICES.add(
            {
                serviceName,
                price,
                create: userLogin.email,
         
            }
        ).then(response => {
            const refImage = storage().ref("/services/"+ response.id+".png")
            if(image!=""){
                refImage.putFile(image).then(()=>{
                refImage.getDownloadURL().then(
                    link => SERVICES.doc(response.id).update({image: link, id: response.id}))
                    navigation.navigate("Services")
                }).catch(e => console.log(e.message))
            }
            else{
                SERVICES.doc(response.id).update({id: response.id})
                navigation.navigate("Services")
            }
        }).catch(e => console.log(e.message))
    }
    const handleUploadImage=() =>{
        ImageCropPicker.openPicker({
            height: 300,
            width: 400,
            mediaType:"photo",
            cropping: true
        }).then(image => setImage(image.path))
        .catch(e => console.log(e.message))
    }
    return(
        <View style={{flex: 1, padding:10}}>
            <Button onPress={handleUploadImage}>Upload Image</Button>
            {((image!="")&&(<Image source={{uri: image}} style={{height:250}}/>))}
            <TextInput 
            style={{marginTop: 50}}
            label={"Input Service Name"}
            value={serviceName}
            onChangeText={setServiceName}
            />
            <HelperText type="error" visible={hasErrorServiceName()}>Service Name not empty</HelperText>
            <TextInput 
            label={"Input price"}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"/>
            <HelperText type="error" visible={hasErrorPrice()}>{"Price > 0"}</HelperText>
            <Button mode="contained" style={Style.button} onPress={handleAddNewService}>Add New Service</Button>
        </View>
    )
}
var Style = StyleSheet.create({
    button:{
        marginTop:7,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5
      
    },

})
export default AddNewService