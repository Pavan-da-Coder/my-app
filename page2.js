import {useState} from "react";
import {StyleSheet, Text, View, Button, TextInput, Pressable, Modal, FlatList, Platform, Image} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring} from "react-native-reanimated";
import {TapGestureHandler, PanGestureHandler} from "react-native-gesture-handler";

const Hello = (thevar) => {
	const checking = thevar.say;

	const styles = StyleSheet.create({
		text: {
			color: "#32F1FA",
		},
	});
	return (
		<>
			<View>
				<Text>{checking} and done</Text>
				<Text style={styles.text}>
					Ok well regardless of however much sleep you get, why you gotta be getting enough to eat right?
				</Text>
			</View>
		</>
	);
};

const TheModal = ({isVisible, children, onClose}) => {
	const styles = StyleSheet.create({
		modalContent: {
			height: "75%",
			width: "100%",
			backgroundColor: "#4D73E6",
			borderTopRightRadius: 18,
			borderTopLeftRadius: 18,
			position: "absolute",
			// bottom: 0,
			top: 0,
		},
		titleContainer: {
			height: "16%",
			backgroundColor: "#E9C487",
			borderTopRightRadius: 10,
			borderTopLeftRadius: 10,
			paddingHorizontal: 20,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		title: {
			color: "#B36D29",
			fontSize: 16,
		},
		pickerContainer: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 50,
			paddingVertical: 20,
		},
	});

	return (
		<Modal animationtType="slide" transparent={true} visible={isVisible}>
			<View style={styles.modalContent}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Choose a sticker</Text>
					<Pressable onPress={onClose}>
						<MaterialIcons name="close" color="#fff" size={22} />
					</Pressable>
				</View>
				<Text style={{color: "#FFFFFF", fontSize: 80}}>Hello Alpesh!!</Text>
				{children}
			</View>
		</Modal>
	);
};

function EmojiList({onSelect, onCloseModal}) {
	const [emoji] = useState([
		require("../my-app/assets/Emojis/attacked-mahi-face.png"),
		require("../my-app/assets/Emojis/grinning-nervous-mahi-face.png"),
		require("../my-app/assets/Emojis/palming-face.png"),
		require("../my-app/assets/Emojis/right-side-up-pavan.png"),
		require("../my-app/assets/Emojis/upside-down-smilies.png"),
		require("../my-app/assets/Emojis/yawning-sleepiness.png"),
	]);

	const styles = StyleSheet.create({
		listContainer: {
			borderTopRightRadius: 10,
			borderTopLeftRadius: 10,
			paddingHorizontal: 20,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		image: {
			width: 100,
			height: 100,
			marginRight: 20,
		},
	});

	return (
		<>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={Platform.OS === "web"}
				data={emoji}
				contentContainerStyle={styles.listContainer}
				renderItem={({item, index}) => {
					return (
						<Pressable
							onPress={() => {
								onSelect(item);
								onCloseModal();
							}}
						>
							<Image source={item} key={index} style={styles.image} />
						</Pressable>
					);
				}}
			/>
		</>
	);
}

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

function EmojiSticker({imageSize, stickerSource}) {
	const scaleImage = useSharedValue(imageSize);
	const onDoubleTap = useAnimatedGestureHandler({
		onActive: () => {
			if (scaleImage.value !== imageSize * 2) {
				scaleImage.value = scaleImage.value * 2;
			}
		},
	});
	const imageStyle = useAnimatedStyle(() => {
		return {
			width: withSpring(scaleImage.value),
			height: withSpring(scaleImage.value),
		};
	});
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const onDrag = useAnimatedGestureHandler({
		onStart: (event, context) => {
			context.translateX = translateX.value;
			context.translateY = translateY.value;
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.translateX;
			translateY.value = event.translationY + context.translateY;
		},
	});

	const containerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value,
				},
				{
					translateY: translateY.value,
				},
			],
		};
	});

	return (
		<>
			<PanGestureHandler onGestureEvent={onDrag}>
				<AnimatedView style={[containerStyle, {top: -350}]}>
					<TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
						<AnimatedImage
							source={stickerSource}
							resizeMode="contain"
							style={[imageStyle, {width: imageSize, height: imageSize}]}
						/>
					</TapGestureHandler>
				</AnimatedView>
			</PanGestureHandler>
		</>
	);
}

export function ImageViewer({placeholderImageSource, selectedImage}) {
	const imageSource = selectedImage !== null ? {uri: selectedImage} : placeholderImageSource;
	const styles = StyleSheet.create({
		image: {
			width: 320,
			height: 440,
			borderRadius: 18,
		},
	});
	return <Image source={imageSource} style={styles.image} />;
}

export {Hello, TheModal, EmojiList, EmojiSticker};
