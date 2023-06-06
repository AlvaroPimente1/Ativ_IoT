import React from "react";
import { SafeAreaView, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, StatusBar, View, TextInput, Alert, Image } from "react-native";
import auth from '@react-native-firebase/auth';

export default function Cadastrar({ navigation }){
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    function cadastroUser(){
        auth().
        createUserWithEmailAndPassword(email, senha).
        then(()=> {
            Alert.alert('Usuario criado com sucesso! Redirecionado a tela de login!');
            navigation.navigate('Login')
        }).
        catch(error =>{
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Esse email já está em uso!');
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert('Email inválido!');
            }
        })
    }

    return(
        <KeyboardAvoidingView
                behavior='padding'
                style={styles.container}
            >
                <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
                />
                <TouchableWithoutFeedback>
                    <View style={styles.conteudo}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/images/logoIot.png')}
                        />
                        
                        
                        <TextInput
                            style={styles.input}
                            placeholder={'Insira seu e-mail'}
                            placeholderTextColor={"grey"}
                            KeyboardAvoidingView="enable"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'Insira sua senha'}
                            placeholderTextColor={"grey"}
                            KeyboardAvoidingView="enable"
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={cadastroUser}
                        >
                            <Text style={styles.textoBotao}>Cadastrar usuario</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.textoMenor}>Já tem conta? Faça Login</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
            
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
},

    texto: {
            color: '#fff',
    },

    conteudo: {
        paddingVertical: 150
    },

    logo: {
        width: 200,
        height: 200,
        marginBottom: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#257ef4',
        paddingHorizontal: 12,
        paddingVertical: 1,
        color: "#fff",
        borderRadius: 10,
        marginBottom: 20
    },

    botao: {
        backgroundColor: '#257ef4',
        paddingVertical: 8,
        borderRadius: 20,
    },

    textoBotao: {
        color: '#1C1C1C',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    textoMenor: {
        fontSize: 9,
        color: '#B0C4DE',
        alignSelf: 'center',
        marginTop: 10
    }
})