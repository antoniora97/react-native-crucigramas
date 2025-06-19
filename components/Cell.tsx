import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";

type CellProps = {
    onLayout: (event: LayoutChangeEvent) => void;
    letterValue: string;
}

const Cell: React.FC<CellProps> = ({ onLayout, letterValue }) => {
    return (
        <View style={ styles.cell } onLayout={ onLayout }>
            <Text style={ styles.text }>{ letterValue }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cell: {
        width: 10,
        height: 10,
        backgroundColor: '#eee',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#666'
    }
})

export default Cell;