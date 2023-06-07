import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import format from 'date-fns/format';
import firestore from '@react-native-firebase/firestore';


export default function Home({ navigation }) {
    const [equipamentos, setEquipamentos] = useState([]);
        useEffect(() => {
        const fetchEquipamentos = async () => {
            const querySnapshot = await firestore().collection('Equipamentos').get();
            const equipamentosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setEquipamentos(equipamentosData);
        };
    
        fetchEquipamentos();
        }, []);
    
        function ligarEquipamento(id) {
        const equipamentoRef = firestore().collection('Equipamentos').doc(id);
        equipamentoRef
            .get()
            .then((doc) => {
            if (doc.exists) {
                const equipamento = doc.data();
                const ligado = !equipamento.ligado;

                equipamentoRef
                .update({ ligado })
                .then(() => {
                    setEquipamentos((prevState) =>
                    prevState.map((item) => (item.id === id ? { ...item, ligado } : item))
                    );
                })
                .catch((error) => {
                    Alert.alert('Erro ao atualizar equipamento:', error.toString());
                });
            } 
        })
            .catch((error) => {
            Alert.alert('Erro ao buscar equipamento:', error.toString());
            });
        }
    
        function renderItem({ item }) {
        const status = item.ligado ? 'Ligado' : 'Desligado';
        const statusBotao = item.ligado ? 'Desliga!' : 'Liga!';
        const data = item.date.toDate();
        const dataFormatada = format(data, 'dd/MM/yyyy');
    
        return (
            <View style={styles.conteinerLista}>
            <TouchableOpacity onPress={() => navigation.push('Detalhes', { equipamento: item })}>
                <Text style={styles.textoConteiner}>Nome do equipamento: {item.nome}</Text>
                <Text style={styles.textoConteiner}>Ambiente: {item.ambiente}</Text>
                <Text style={styles.textoConteiner}>Consumo de energia: {item.energia}Kwh</Text>
                <Text style={styles.textoConteiner}>Status: {status}</Text>
                <Text style={styles.textoConteiner}>Data de pareamento: {dataFormatada}</Text>
            </TouchableOpacity>
            
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                    style={styles.botaoLigar} 
                    onPress={() => ligarEquipamento(item.id)}
                >

                    <Text style={styles.textoBotao}>{statusBotao}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.botaoLigar} 
                    onPress={() => navigation.push('Detalhes', { equipamento: item })}
                >

                    <Text style={styles.textoBotao}>Detalhes</Text>
                </TouchableOpacity>            
            </View>
            </View>
        );
        }
    
        return (
        <SafeAreaView style={styles.conteiner}>
            <View>
                <Text style={styles.textoAdicionar}>Meus Equipamentos</Text>
            </View>
            <FlatList 
                data={equipamentos} 
                renderItem={renderItem} 
                keyExtractor={(item) => item.id} 
            />
        </SafeAreaView>
        );
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
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#257ef4',
        marginHorizontal: 30,
        alignItems: 'center'
    },

    textoAdicionar: {
        color: '#fff',
        fontSize: 25,
        paddingVertical: 20
    },

    textoConteiner: {
        color: '#fff',
        alignSelf: 'flex-start',
        fontSize: 15
    },

    botaoLigar: {
        backgroundColor: '#257ef4',
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop: 10,
        borderRadius: 15,
        marginHorizontal: 5
    },

    textoBotao: {
        fontSize: 14,
        color: '#1C1C1C'
    }
})