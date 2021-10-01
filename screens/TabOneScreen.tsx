import * as React from 'react';
import {
	Button,
	InputAccessoryView,
	KeyboardAvoidingView,
	Pressable,
	StyleSheet,
	TextInput,
} from 'react-native';
import { useFonts } from 'expo-font';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
/*by default component uses hljs so access hljs styles, import from /prism for prism styles */
import { atomDark } from 'react-syntax-highlighter/src/styles/prism';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	const [text, onChangeText] = React.useState('Useless Text');
	const [editor, openEditor] = React.useState(false);
	const inputAccessoryViewID = 'highlighter';
	const [loaded] = useFonts({
		FiraCode: require('../assets/fonts/FiraCode-Regular.ttf'),
	});

	if (!loaded) {
		return null;
	}

	const codeString = `
query TestQuery($test: String!) {
	anime(first: 10) {
		nodes {
			title {
				original
			}
			description
		}
	}
}
	`;
	return (
		<View style={styles.container}>
			{editor ? (
				<>
					<KeyboardAvoidingView behavior={'padding'} style={styles.avoid}>
						<TextInput
							style={styles.input}
							onChangeText={onChangeText}
							value={text}
							multiline={true}
							autoCapitalize={'none'}
							autoCorrect={false}
							autoFocus={true}
							onBlur={() => openEditor(false)}
							inputAccessoryViewID={inputAccessoryViewID}
						/>
					</KeyboardAvoidingView>
					<InputAccessoryView nativeID={inputAccessoryViewID}>
						<Button
							onPress={() => openEditor(false)}
							title='Show Highlighted Text'
						/>
					</InputAccessoryView>
				</>
			) : (
				// <Pressable style={styles.container} onPressOut={() => openEditor(true)}>
				<>
					<SyntaxHighlighter
						language='graphql'
						style={atomDark}
						fontFamily={'FiraCode'}
						fontSize={15}
						highlighter={'prism'}>
						{text}
					</SyntaxHighlighter>
					<View style={styles.button}>
						<Button onPress={() => openEditor(true)} title='Edit Text'></Button>
					</View>
				</>
				// </Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avoid: {
		marginBottom: 270,
		flex: 1,
		flexGrow: 1,
		padding: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	input: {
		//height: 200,
		fontSize: 15,
		flex: 1,
		flexGrow: 1,
		top: 10,
		borderWidth: 1,
		padding: 15,
		color: 'white',
		fontFamily: 'FiraCode',
	},
	button: {
		paddingBottom: 10,
	},
});
