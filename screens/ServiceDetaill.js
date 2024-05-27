import React, { useEffect, useLayoutEffect, useState } from "react"
import { useMyContextController } from "../store"
import firestore from "@react-native-firebase/firestore"
import { View, Image, StyleSheet, Text} from "react-native"
import { HelperText, TextInput , Button, IconButton, Dialog, Portal, PaperProvider } from "react-native-paper"
import ImageCropPicker from "react-native-image-crop-picker"
import storage from "@react-native-firebase/storage"

const ServiceDetail = ({navigation, route}) =>{
    const {id} = route.params.item
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [service, setService] = useState({});
    const hasErrorServiceName = () => service.serviceName ==""
    const hasErrorPrice = () => service.price <= 0
    const SERVICES = firestore().collection("SERVICES")
    const [visible, setVisible] = useState(false);
    const hideDialog =()=> setVisible(false);

    useEffect(()=>{
      SERVICES.doc(id).onSnapshot(response =>setService(response.data()))
    }, [])
    const UpdateService = () =>{  
        const refImage = storage().ref("/services/"+ id + ".png")
        refImage.putFile(service.image).then(()=>{
          refImage.getDownloadURL().then(link =>{
            SERVICES.doc(id).update({...service, create: userLogin.email, image: link})
          })
         navigation.navigate("Services")
        }).catch(e=>console.log(e.message))
    }
    const handleUploadImage=() =>{
        ImageCropPicker.openPicker({
            height: 300,
            width: 400,
            mediaType:"photo",
            cropping: true
        }).then(respone => setService({...service, image: respone.path}))
        .catch(e => console.log(e.message))
    }
    const handleDeleteService=()=>{
      SERVICES.doc(id).delete().then(()=>navigation.navigate("Services"))
    }

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerRight: (props) => <IconButton icon={"delete"} iconColor="white" {...props} 
          onPress={() => setVisible(true)}
        />
      })
    },[])
    return(
      (service!=null)&&
      <PaperProvider>
        <View style={{flex: 1, padding:10}}>
            <Button onPress={handleUploadImage}>Upload Image</Button>
            {(service.image)&&(<Image source={{uri: service.image}} style={{height:250}}/>)}
            <TextInput 
            style={{marginTop: 50}}
            label={"Input Service Name"}
            value={service.serviceName}
            onChangeText={(text)=>setService({...service, serviceName: text})}
            />
            <HelperText type="error" visible={hasErrorServiceName()}>Service Name not empty</HelperText>
            <TextInput 
            label={"Input price"}
            value={service.price}
            onChangeText={(text)=>setService({...service, price: text})}
            keyboardType="numeric"/>
            <HelperText type="error" visible={hasErrorPrice()}>{"Price > 0"}</HelperText>
            <Button mode="contained" style={Style.button} onPress={UpdateService}>Update Service</Button>

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Comfirm Delete Service</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">Do you want to delete service?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={handleDeleteService}>Yes</Button>
                  <Button onPress={hideDialog}>No</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
      </View>
      </PaperProvider>
    )
}
export default ServiceDetail;
var Style = StyleSheet.create({
    button:{
        marginTop:7,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5
      
    },

})