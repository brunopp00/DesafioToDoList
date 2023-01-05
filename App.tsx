import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Task } from './src/components/Task';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

export default function App() {

  const [lista, setLista] = useState<string[]>([])
  const [listaConcluidas, setListaConcluidas] = useState<string[]>([])
  const [task, setTask] = useState('')

  function handleAddTask() {
    if(task){
      setLista(prevState => [...prevState, task])
      setTask('')
    }
  }

  function handleRemoveTask(name: string) {
    Alert.alert('Remover', `Remover a Tarefa ${name}?`, [
        {
            text: 'Sim',
            onPress: () => {setLista(prevState => prevState.filter(item => item !== name)); setListaConcluidas(prevState => prevState.filter(item => item !== name))}
        },
        {
            text:'Não',
            style: 'cancel'
        }
    ])
  }
  function handleSelectTask(item: string) {
    if(listaConcluidas.find(data => data === item)){
      setListaConcluidas(prevState => prevState.filter(data => data !== item))
    }else {
      setListaConcluidas(prevState => [...prevState, item])
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.text}>
          <Text style={{color:'#4EA8DE', fontSize:42.76, fontWeight:'bold'}}>Tar</Text><Text style={{color:'#5E60CE', fontSize:42.76, fontWeight:'bold'}}>efas</Text>
        </View>
        <View style={styles.form}>
          <TextInput placeholderTextColor={'#525252'} placeholder='Adicione uma nova tarefa' style={styles.input} onChangeText={setTask} value={task}/>
          <TouchableOpacity onPress={() => handleAddTask()} style={styles.button}><Text style={{color:'#fff'}}>+</Text></TouchableOpacity>
        </View>
        <View style={styles.infos}>
          <Text style={styles.criadas}>
            Criadas {lista.length}
          </Text>
          <Text style={styles.concluidas}>
              Concluidas {listaConcluidas.length}
          </Text>
        </View>
        <FlatList 
          showsVerticalScrollIndicator
          data={lista}
          keyExtractor={key => key}
          renderItem={({item}) => (
            <View style={{alignItems:'center'}}>
              <Task description={item} key={item} onRemove={() => handleRemoveTask(item)} onSelect={() => handleSelectTask(item)}/>
            </View>
          )}
          ListEmptyComponent={() => (
            <>
            <View style={styles.texts}>
              <MaterialCommunityIcons name="clipboard-list-outline" size={64} color="#3d3d3d" />
              <Text style={styles.listEmptyText1}>
                  Você ainda não tem tarefas cadastradas
              </Text>
              <Text style={styles.listEmptyText2}>
                Crie tarefas e organize seus itens a fazer
              </Text>
            </View>
            </>
          )}
          />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    flex: 1,
    padding:24,
  },
  text: {
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    marginTop:30
  },
  form: {
    width: '100%',
    flexDirection:'row',
    marginTop:36,
    marginBottom:42
  },
  texts: {
    justifyContent:'center',
    alignItems:'center'
  },
  listEmptyText1: {
    color:'#727272',
    fontSize:14
  },
  listEmptyText2: {
    color:'#4C4C4C',
    fontSize:14
  },
  infos : {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15
  },
  criadas: {
    color:'#4EA8DE',
    fontWeight:'bold',
    fontSize:18
  },
  concluidas: {
    color:'#8284FA',
    fontWeight:'bold',
    fontSize:18
  },
  input:{
    backgroundColor:'#262626',
    flex:1,
    height:56,
    borderRadius:5,
    color:'#fff',
    padding:16,
    fontSize:16,
    marginRight:12
  },
  button: {
    width: 56,
    height:56,
    borderRadius:5,
    backgroundColor: '#1E6F9F',
    alignItems:'center',
    justifyContent:'center'
  }
});
