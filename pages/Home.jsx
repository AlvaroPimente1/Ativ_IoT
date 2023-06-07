import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Home(){
    const [equipamentos, setEquipamentos] = useState([]);
    useEffect(() => {
        const fetchEquipamentos = async () => {
            const querySnapshot = await firestore().collection('Equipamentos').get();
            const equipamentosData = querySnapshot.docs.map((doc) => doc.data());
            setEquipamentos(equipamentosData);
        };
        fetchEquipamentos();
    }, []);

    function renderItem({ item }){
        return(
            <View style={styles.conteinerLista}>
                <Text>{item.nome}</Text>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.conteiner}>
            <FlatList
                data={equipamentos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
        paddingHorizontal: 100,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#257ef4',
        marginHorizontal: 30
    },
})