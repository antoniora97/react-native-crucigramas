import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import crosswordsData from '../data/crosswords.json';

const crossword = crosswordsData[0];
const GRID_SIZE = crossword.gridSize;
const WORDS = crossword.words;

function generateSolutionGrid(size: number, words: any[]) {
    const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));

    for (const { word, start_row, start_col, end_row, end_col, direction } of words) {
        for (let i = 0; i < word.length; i++) {
            const letter = word[i].toUpperCase();

            if (direction === 'horizontal') {
                grid[start_row][start_col + i] = letter;
            } else if (direction === 'vertical') {
                grid[start_row + i][start_col] = letter;
            }
        }
    }

    return grid;
}

function getUsedLetters(words: any[]) {
    const letterSet = new Set<string>();
    for (const { word } of words) {
        for (const char of word) {
            letterSet.add(char.toUpperCase());
        }
    }
    return Array.from(letterSet).sort();
}

function getStartCells(words: any[]) {
    const starts: { [key: string]: { number: number, clue: string } } = {};
    words.forEach((word, index) => {
        const key = `${word.start_row}-${word.start_col}`;
        if (!starts[key]) {
            starts[key] = {
                number: index + 1,
                clue: word.clue
            };
        }
    });
    return starts;
}

export default function CrosswordScreen() {
    const solution = generateSolutionGrid(GRID_SIZE, WORDS);
    const [activeClue, setActiveClue] = useState<string | null>(null);

    const [grid, setGrid] = useState(
        solution.map(row => row.map(cell => (cell ? '' : '')))
    );

    const handleChange = (text: string, row: number, col: number) => {
        const letter = text.slice(-1).toUpperCase();
        const newGrid = [...grid];
        newGrid[row][col] = letter;
        setGrid(newGrid);
    };

    const isCorrect = () => {
        return grid.flat().every((cell, i) => {
            const row = Math.floor(i / GRID_SIZE);
            const col = i % GRID_SIZE;
            return solution[row][col] === '' || cell === solution[row][col];
        });
    };

    const startCells = getStartCells(WORDS);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <Text style={styles.title}>{crossword.title}</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, justifyContent: 'center' }}>
                {getUsedLetters(WORDS).map((letter, i) => (
                    <Text key={i} style={{
                        padding: 6,
                        margin: 4,
                        borderRadius: 6,
                        backgroundColor: '#eee',
                        fontWeight: 'bold',
                        fontSize: 16,
                        borderColor: '#999',
                        borderWidth: 1
                    }}>
                        {letter}
                    </Text>
                ))}
            </View>

            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.grid}>
                    {grid.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((cell, colIndex) => {
                                const isEditable = solution[rowIndex][colIndex] !== '';
                                return (
                                    <View style={{ position: 'relative' }}>
                                        <TextInput
                                            key={colIndex}
                                            style={[
                                                styles.cell,
                                                isEditable ? styles.editableCell : styles.disabledCell
                                            ]}
                                            value={cell}
                                            maxLength={1}
                                            onChangeText={text => handleChange(text, rowIndex, colIndex)}
                                            editable={isEditable}
                                        />
                                        {startCells[`${rowIndex}-${colIndex}`] && (
                                            <Text
                                                style={styles.numberOverlay}
                                                onPress={() => setActiveClue(startCells[`${rowIndex}-${colIndex}`].clue)}
                                            >
                                                {startCells[`${rowIndex}-${colIndex}`].number}
                                            </Text>
                                        )}
                                    </View>

                                );
                            })}
                        </View>
                    ))}
                </View>

                <Text style={styles.result}>
                    {isCorrect() ? '✅ ¡Correcto!' : '📝 Completa el crucigrama'}
                </Text>

                {activeClue && (
                    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Pista seleccionada:</Text>
                        <Text style={{ fontStyle: 'italic', marginTop: 4 }}>{activeClue}</Text>
                    </View>
                )}

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    grid: { marginBottom: 20 },
    row: { flexDirection: 'row' },
    cell: {
        width: 32,
        height: 32,
        textAlign: 'center',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
        margin: 1
    },
    editableCell: { backgroundColor: '#fff', borderColor: '#333' },
    disabledCell: { backgroundColor: '#ddd', borderColor: '#999' },
    clues: { paddingHorizontal: 20 },
    clueItem: { fontSize: 16, marginBottom: 6 },
    result: { marginTop: 20, textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
    numberOverlay: {
        position: 'absolute',
        top: 1,
        left: 3,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#444'
    }

});
