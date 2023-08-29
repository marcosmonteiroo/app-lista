import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";


  export default function App() {
    const [name, setName] = useState("");
    const [names, setNames] = useState([]);
    const dataBase = "@names"
  
    useEffect(() => {
      AsyncStorage.getItem(dataBase).then((response) => {
        if (response !== null) {
          const storageParsed =JSON.parse(response)
  
          setNames(storageParsed);
        }
      })
  
    },[]);
  
    async function handleAddNewName() {
      setNames((prevState) => [...prevState, name]);
  
      const storage = await AsyncStorage.getItem(dataBase);
  
          if (storage !== null) {
            const storageParsed = JSON.parse(storage);
  
            await AsyncStorage.setItem(
              dataBase,
              JSON.stringify([ ...storageParsed, name])
            )
          } else {
            await AsyncStorage.setItem(
              dataBase,
              JSON.stringify([...names, name])
            );
            
          }
    }
     function handleRemoveName(nameToRemove) {
      Alert.alert(
          "Remover",
          `Remover o ${nameToRemove}?`,
          [
              {
                  text: "Não",
                  style: "cancel"
              },
              { 
                  text: "Sim", 
                  onPress: () => {
                      const updatedNames = names.filter(name => name !== nameToRemove);
                      setNames(updatedNames);
                  }
              }
          ],     
  
  
          { cancelable: false } 
  
          
      );
  }
      
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nome do evento</Text>
        <Text style={styles.subtitle}>Sexta, 4 de Novembro de 2022.</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TouchableOpacity style={styles.button}onPress={handleAddNewName}>
          <Feather name="plus-circle" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.part}>
        <FlatList
          data={[names]}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.part1}>
                Ninguém chegou no evento ainda? Adicione participantes a sua
                lista de presença.
              </Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.part2}>Participantes</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <> 
             <View style={styles.card}>
               <Text style={styles.cardText}>{item}</Text>
               <TouchableOpacity
                 style={styles.button2}
                 onPress={() => handleRemoveName(item)}
               >
                 <Feather name="minus-circle" size={24} color="#FFFFFF" />
               </TouchableOpacity>
             </View>
 
               
            </>
             
           )}
         />
       </View>
     </View>
   );
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131016",
    paddingHorizontal: 24,
    paddingVertical: 75,
  },
  title: {
    color: "#fdfcfe",
    textAlign: "left",
    fontSize: 24,
  },
  subtitle: {
    color: "#6b6b6b",
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 17,
    paddingVertical: 18,
    fontSize: 14,
    backgroundColor: "#1f1e25",
    color: "#fdfcfe",
    borderRadius: 4,
  },
  form: {
    marginTop: 34,
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#31CF67",
    padding: 19,
    borderRadius: 4,
  },
  button2: {
    backgroundColor: "#E23C44",
    padding: 18,
    borderRadius: 4,
    right: -20,    
    
  },

  part: {
    marginTop: 44,
  },

  part1: {
    color: "#FDFCFE",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },

  part2: {
    color: "#FDFCFE",
    fontSize: 20,
  },
  header: {
    marginBottom: 20,
  },

  card: {
    paddingHorizontal: 20,
    backgroundColor: "#1F1E25",
    marginBottom: 2,
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 16,
    flexDirection: "row",
    
   
  },
 
  cardText: {
    color: "#FDFCFE",
    fontSize: 16,

  },
});

