import { transform } from "@babel/core";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler';

type LayoutRect = {
    x: number;
    y: number;
    width: number;
    height: number;
}

type DraggableLetterProps = {
    letter: string;
    cell: LayoutRect | null;
}

const { width } = Dimensions.get('window');

const DraggableLetter: React.FC<DraggableLetterProps> = ({ letter, cell }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx: any) => {
            translateX.value = ctx.startX + event.translationX;
            translateY.value = ctx.startY + event.translationY;
        },
        onEnd: () => {
            if (!cell) return;

            const inCell =
                translateX.value + 50 > cell.x &&
                translateX.value < cell.x + cell.width &&
                translateY.value + 50 > cell.y &&
                translateY.value < cell.y + cell.height;

            if (inCell) {
                translateX.value = withTiming(cell.x);
                translateY.value = withTiming(cell.y);
            } else {
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
            }
        }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
        position: 'absolute',
        top: 400,
        left: width / 2 - 25
    }));

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.letter, animatedStyle]}>
                <Text style={styles.letterText}>{letter}</Text>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    letter: {
        width: 50,
        height: 50,
        backgroundColor: '#4a90e2',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    letterText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24
    }
})

export default DraggableLetter;