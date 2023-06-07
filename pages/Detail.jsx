import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, Touchable, TouchableOpacity, TextInput, Alert } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import firestore from '@react-native-firebase/firestore';

export default function Detail({ route }){
    const equipamento =  route.params.equipamento
    const [modalVisible, setModalVisible] = useState(false);
    const [consumo, setConsumo] = useState(0);

    function showModal(){
        setModalVisible(true);
    }

    function hiddenModal(){
        setModalVisible(false)
    }

    function atualizarEnergia() {
        if (consumo === '') {
            Alert.alert('Digite um valor de energia válido');
            return;
        }
        
        const equipamentoRef = firestore().collection('Equipamentos').doc(equipamento.id);
        equipamentoRef
        .update({ energia: parseInt(consumo) })
        .then(() => {
            Alert.alert('Energia atualizada com sucesso!');
        })
        .catch((error) => {
            Alert.alert('Erro ao atualizar energia:', error.toString());
        });

        setModalVisible(false)
    }    

    function excluirEquipamento() {
        const equipamentoRef = firestore().collection('Equipamentos').doc(equipamento.id);
        equipamentoRef
        .delete()
        .then(() => {
            Alert.alert('Equipamento excluído com sucesso!');
            // Realize qualquer outra ação necessária após a exclusão
        })
        .catch((error) => {
            Alert.alert('Erro ao excluir equipamento:', error.toString());
        });
    }

    return(
        <SafeAreaView style={styles.conteiner}>
            <View style={styles.conteinerLista}>
                <View style={styles.linhasConteiner}>
                    <Image source={require('../assets/images/internet.png')} style={styles.imagem}/>
                    <Text style={styles.textoMaior}>Nome do equipamento: {equipamento.nome}</Text>
                </View>

                <View style={styles.linhasConteiner}>
                    <Image source={require('../assets/images/ambiente.png')} style={styles.imagem}/>
                    <Text style={styles.textoMaior}>Ambiente: {equipamento.ambiente}</Text>
                </View>
                <View style={styles.linhasConteiner}>
                    <Image source={require('../assets/images/luz.png')} style={styles.imagem}/>
                    <Text style={styles.textoMaior}>Consumo de energia: {equipamento.energia}Kwh</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.botao}
                    onPress={showModal}
                >
                    <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao}
                    onPress={excluirEquipamento}
                >
                    <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>         
            </View>


            {modalVisible && (
                <View style={styles.modal}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Energia'}
                        placeholderTextColor={"grey"}
                        KeyboardAvoidingView="enable" 
                        keyboardType="numeric"  
                        value={consumo}
                        onChangeText={setConsumo}                          
                    />

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.botao} onPress={atualizarEnergia}>
                            <Text style={styles.textoBotao}>Salvar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.botao} onPress={hiddenModal}>
                            <Text style={styles.textoBotao}>Fechar</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        justifyContent: 'center'
    },

    textoMaior: {
        fontSize: 15,
        color: '#fff',
        paddingVertical: 3
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

    imagem: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginVertical: 2
    },

    linhasConteiner: {
        flexDirection: 'row',
        marginVertical: 3
    },

    botao: {
        backgroundColor: '#257ef4',
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 5
    },

    textoBotao: {
        color: '#1C1C1C',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20
    },

    modal: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#333333",
        padding: 20,
        alignItems: 'center',
        height: '35%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
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


})