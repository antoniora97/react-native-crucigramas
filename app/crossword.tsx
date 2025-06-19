import Cell from "@/components/Cell";
import DraggableLetter from "@/components/DraggableLetter";
import { useState } from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type LayoutRect = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function CrosswordScreen() {
    const [dropZoneLayout, setDropZoneLayout] = useState<LayoutRect | null>(null);

    const handleDropZoneLayout = (event: LayoutChangeEvent) => {
        const {x, y, width, height } = event.nativeEvent.layout;
        setDropZoneLayout({ x, y, width, height });
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <Cell onLayout={handleDropZoneLayout} letterValue="A"/>
            <DraggableLetter letter="A" cell={dropZoneLayout} />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    }
});