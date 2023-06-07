import React from "react";
import { SafeAreaView, Picker,Text, StyleSheet, TextInput, Alert, Button, View, StatusBar, TouchableOpacity } from "react-native";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function New(){
    const [nome, setNome] = useState('');
    const [ambiente, setAmbiente] = useState('');
    
    function newEquipamento(){
        firestore().
        collection('Equipamentos').
        add({
            nome: nome,
            ligado: false,
            energia: 0,
            ambiente: ambiente,
            date: firestore.FieldValue.serverTimestamp(),
        }).
        then(()=> Alert.alert("Equipamento adicionado com sucesso!")
        ).
        catch((error)=> Alert.alert("Erro ao adicionar o equipamento!"))

        setNome('');
        setAmbiente('');
    }

    return(
        <SafeAreaView style={styles.conteiner}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'#1C1C1C'}
            />
            <View style={styles.conteudo}>
                <Text style={styles.textoAdicionar}>Adicionar novo dispositivo</Text>
                <View style={styles.conteinerLista}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nome'}
                        placeholderTextColor={"grey"}
                        KeyboardAvoidingView="enable"
                        value={nome}
                        onChangeText={setNome}                
                    />      
                    <TextInput
                        style={styles.input}
                        placeholder={'Ambiente'}
                        placeholderTextColor={"grey"}
                        KeyboardAvoidingView="enable"
                        value={ambiente}
                        onChangeText={setAmbiente}                
                    />                                           
                </View>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={newEquipamento}
                >
                    <Text style={styles.textoBotao}>Enviar</Text>
                </TouchableOpacity> 
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C'
    },

    conteinerLista: {
        backgroundColor: '#333333',
        paddingVertical: 30,
        paddingHorizontal: 50,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#257ef4',
        marginHorizontal: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#257ef4',
        paddingHorizontal: 10,
        paddingVertical: 1,
        color: "#fff",
        borderRadius: 10,
        marginBottom: 20,
        width: 150
    },

    botao: {
        backgroundColor: '#257ef4',
        paddingVertical: 8,
        borderRadius: 20,
    },

    textoBotao: {
        color: '#1C1C1C',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20
    },

    textoAdicionar: {
        color: '#fff',
        fontSize: 25,
        marginBottom: 15
    },

    conteudo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    }
})