import React from "react";
import { SafeAreaView, Text, StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import MapView from "react-native-maps";

export default function Home(){

    return(
        <SafeAreaView style={styles.conteiner}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#fff"
                translucent                
            />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -1.455833,
                    longitude: -48.503889,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,                
                }}
            />
            <View style={styles.modal}>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                    <Image
                        source={require('../assets/images/outline_search_black_18dp.png')}
                        style={styles.iconLupa}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquise o destino... "
                    />
                    <View style={styles.line}/>
                </View>

                <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <TouchableOpacity
                        style={styles.conteinerFoto}
                    >
                        <Image
                            source={require('../assets/images/baseline_home_black_36dp.png')}
                            style={styles.logoCasa}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.conteinerFoto}
                    >
                        <Image
                            source={require('../assets/images/baseline_work_black_24dp.png')}
                            style={styles.logoCasa}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#fff',
    }, 
    
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    modal: {
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: '#fff'
    },

    input: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderWidth: 0.5,
        marginBottom: 10,
        borderRadius: 10
    },

    iconLupa: {
        width: 25,
        height: 25,
        alignSelf: 'center',
        marginRight: 5
    },

    line: {
        height: 1,
        backgroundColor: '#000',
        alignSelf:'stretch'
    },

    logoCasa: {
        width: 50,
        height: 50
    },

    conteinerFoto: {
        backgroundColor: '#CCCCCC',
        borderRadius: 40,
        marginHorizontal: 5,
        paddingHorizontal: 8,
        paddingVertical: 8
    }
})