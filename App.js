import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from "react-native";
import {Hello, TheModal, EmojiList, EmojiSticker, ImageViewer} from "./page2.js";
import {NavigationContainer, ThemeProvider} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
	const [isSleepy, setIsSleepy] = useState("0");
	const [sleepinessCounter, setSleepinessCounter] = useState(0);
	const [AmISmart, setAmISmart] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pickedEmoji, setPickedEmoji] = useState(null);

	const onTrigger = () => {
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	if (isSleepy === "2") {
		setTimeout(() => {
			setIsSleepy("1");
		}, 2000);
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#2778FA",
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			color: "#32F1FA",
		},
		textred: {
			color: "#FF0000",
		},
		spacer: {
			paddingVertical: 10,
		},
		buttonholder: {
			flexDirection: "row",
			alignContent: "center",
			justifyContent: "center",
			width: 200,
		},
		inputstyler: {
			borderColor: "#FFFFFF",
			borderWidth: 1,
			width: 200,
			padding: 2,
			paddingLeft: 4,
			color: "#FFFFFF",
		},
	});

	const PlaceholderImage = require("../my-app/assets/splash.png");

	return (
		<>
			<Button
				title="Click to go to the other page"
				onPress={() => {
					navigation.navigate("Thirdpage", {name: "Pavan"});
				}}
			></Button>

			<Button
				title={"Red"}
				onPress={() => {
					setAmISmart(true);
				}}
			></Button>
			<Button
				title={"Blue"}
				onPress={() => {
					setAmISmart(false);
				}}
			></Button>

			<GestureHandlerRootView style={styles.container}>
				<View style={styles.container}>
					{/* Title Thing */}

					{/* <Text style={{color: AmISmart ? "#FF0000" : "#32F1FA"}}>The Sleepiness Questionairre!</Text> */}
					<Text style={AmISmart ? styles.textred : styles.text}>The Sleepiness Questionairre!</Text>

					<View style={styles.spacer}></View>
					<Text style={{color: "#32F1FA", paddingBottom: 4}}>Are you sleepy?</Text>

					{/* Just the yes and no buttons: */}
					<View style={styles.buttonholder}>
						<View style={{paddingHorizontal: 5}}>
							<Button
								title={"Yes"}
								onPress={() => {
									setIsSleepy("1");
								}}
								// disabled={isSleepy}
							></Button>
						</View>
						<View>
							<Button
								title={"No"}
								onPress={() => {
									setIsSleepy("2");
								}}
							></Button>
						</View>
					</View>

					{/* <StatusBar style="auto" /> */}

					{/* If you are sleepy, proceed */}
					{isSleepy === "1" && (
						<>
							<Text style={{color: "#32F1FA", paddingBottom: 4}}>How sleepy are you on a scale of 1 to 10?</Text>
							<View>
								<TextInput
									placeholder="11?"
									placeholderTextColor={"#FFFFFF"}
									style={styles.inputstyler}
									onChangeText={(texts) => setSleepinessCounter(texts)}
								></TextInput>

								{sleepinessCounter != 0 && (
									<>
										<View style={styles.spacer}></View>
										<Hello say="hello"></Hello>
										<Button title="Open the Modal" onPress={onTrigger}></Button>
										<TheModal isVisible={isModalVisible} onClose={onModalClose}>
											<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}></EmojiList>
										</TheModal>

										{/* {<View>
											<View style={styles.imageContainer}>
												<AnimatedImage placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
												{pickedEmoji !== null ? <EmojiSticker imageSize={"40"} stickerSource={pickedEmoji} /> : null}
											</View>
										</View>} */}

										<View style={styles.imageContainer}>
											{/* <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} /> */}
											{pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
										</View>
									</>
								)}
							</View>
						</>
					)}

					{/* If you are NOT sleepy */}
					{isSleepy == "2" && (
						<>
							<Text style={styles.text}>Are you sure about that?</Text>
							<Text style={{color: "#32F1FA", fontSize: 40}}>Think again</Text>
						</>
					)}
				</View>
			</GestureHandlerRootView>
		</>
	);
}

function Thirdpage({navigation, route}) {
	return <Text>This is {route.params.name}'s profile?</Text>;
}

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} options={{title: "Welcome"}}></Stack.Screen>
				<Stack.Screen name="Thirdpage" component={Thirdpage}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;

