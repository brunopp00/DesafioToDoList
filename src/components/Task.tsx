import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox'
import react, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { EvilIcons } from '@expo/vector-icons'; 

type Props = {
    description: string,
    onRemove: () => void,
    onSelect:() => void
}

export const Task = ({description, onRemove, onSelect} : Props) => {
    const [isChecked, setChecked] = useState(false)
    return(
        <View style={styles.container}>
            <ExpoCheckbox 
                style={styles.checkbox}
                value={isChecked}
                onValueChange={(value) => {
                    onSelect()
                    setChecked(value)
                }}
                color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.name}>{description}</Text>
            <EvilIcons onPress={() => onRemove()} name="trash" style={{marginRight:10, color:'#fff'}} size={34} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#262626',
        width:'100%',
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        height:56
    },
    checkbox: {
        marginLeft:10
    },
    name: {
        color:'#fff',
        flex:1,
        fontSize:16,
        marginLeft:16
    },
    buttonText: {
        color:'#FFF',
        fontSize:16
    },
})