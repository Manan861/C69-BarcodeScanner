import * as React from "react";
import {View,Text,StyleSheet,Image, TouchableOpacity} from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:false,
            scannedData:"",
            scanned:"",
            buttonState:"normal"
        }
    }
    getCameraPermissions=async()=>{
        const {status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:"clicked",
            scanned:false
        })
    }

    handleBarcodeScanner=async({type,data})=>{
        this.setState({
            scannedData:data,
            scanned:true,
            buttonState:"normal"
        })
    }
    render(){
        if(this.state.buttonState==="clicked" && this.state.hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned?undefined:this.handleBarcodeScanner}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(this.state.buttonState==="normal"){
            return(
            <View style={styles.container}>
                <Image 
                    source={require("../assets/scanner.jpg")}
                    style={styles.images}
                    />
                <Text style={styles.scannedText}>{"Scanned data: "+ this.state.scannedData}</Text>

                <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton}>
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>

            </View>
            )
        }
        
    }
}

const styles= StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    scanButton:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"navy",
        padding:20,
        marginTop:30,
        borderRadius:5,

    },
    buttonText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white"
    },
    images:{
        width:100,
        height: 100
    },
    scannedText:{
        fontSize:15,
        marginTop:30
    }
})