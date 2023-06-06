import React from "react";
import { 
    SafeAreaView, Text, StyleSheet,
    KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback,
    StatusBar, View, TextInput, Alert, Image } from "react-native";
import auth from "@react-native-firebase/auth";

export default function Login({ navigation }){
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    function loginUser(){
        auth().
        signInWithEmailAndPassword(email, senha).
        then(()=> {
            Alert.alert("Usuario Logado com sucesso!")
            navigation.navigate('Home')
        })
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado!');
            }

            if (error.code === 'auth/wrong-password') {
                Alert.alert('Senha incorreta!');
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
                            onPress={loginUser}
                        >
                            <Text style={styles.textoBotao}>Entrar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cadastro')}
                        >
                            <Text style={styles.textoMenor}>Não tem uma conta? Crie sua conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            
                        >
                            <Text style={styles.textoMenor}>Esqueci a minha senha</Text>
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