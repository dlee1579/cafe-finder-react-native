import { postReview } from "@/api-service";
import { ratingCategories, CreateReview, StackParamList, StarRating } from "@/types";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import * as SecureStore from 'expo-secure-store';
import Rating from "@/components/Rating";

export default function AddReview() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<StackParamList, "AddReview">>();
    const cafeId = route.params.cafeId ? parseInt(route.params.cafeId) : null;
    const cafeName = route.params.cafeName;
    const [review, setReview] = useState<CreateReview>({
        cafe_id: cafeId,
        title: null,
        description: null,
        coffee_quality: 0,
        comfortability: 0,
        atmosphere: 0,
        quietness: 0,
        cleanliness: 0,
    });
    // const ratingValues: Array<number> = [1,2,3,4,5];
    const ratingValues: Array<StarRating> = [
        {value: 1},
        {value: 2},
        {value: 3},
        {value: 4},
        {value: 5},
    ]
    const getRatingTypeText = (type: string) => {
        let subWords = type.split("_")
        for (let i = 0; i < subWords.length; i++) {
            subWords[i] = subWords[i].charAt(0).toUpperCase() + subWords[i].slice(1);
        }
        return subWords.join(" ")
    };

    const RatingCategoryStar = (category: string, starRating: StarRating) => 
        {
        let value = review[category as keyof CreateReview];
        if (typeof value === "string") {
            value = parseInt(value);
        } else if (value === null) {
            value = 0;
        }

        if (value >= starRating.value) {
            return <>
                <Pressable onPress={() => handleStarPress(category, starRating.value)}>
                    <Image source={require("../assets/images/star-full-add-rating.png")}/>
                </Pressable>
            </>
        } else {
            return <>
                <Pressable onPress={() => handleStarPress(category, starRating.value)}>
                    <Image source={require("../assets/images/star-empty-add-rating.png")}/>
                </Pressable>
            </>
        }
    }

    const renderStars = (category: string) => {
        return <>
            <View key={`render-stars-${category}`} style={styles.stars}>
                <FlatList
                    data={ratingValues}
                    renderItem={({item}) => RatingCategoryStar(category, item)}
                    keyExtractor={(item, index) => `${category}-${index}`}
                    horizontal={true}
                />
                {/* {ratingValues.map((starRating, index) => {
                    const value = review[category as keyof CreateReview];
                    console.log(value);
                    if (typeof value === "number" && value >= starRating.value) {
                        return <>
                            <Pressable key={`${category}-full-pressable-${index}`} onPress={() => handleStarPress(category, starRating.value)}>
                                <Image key={`${category}-full-image-${index}`} source={require("../assets/images/star-full-add-rating.png")}/>
                            </Pressable>
                        </>
                    } else {
                        return <>
                            <Pressable key={`${category}-empty-pressable-${index}`} onPress={() => handleStarPress(category, starRating.value)}>
                                <Image key={`${category}-empty-image-${index}`} source={require("../assets/images/star-empty-add-rating.png")}/>
                            </Pressable>
                        </>
                    }
                })} */}
            </View>
        </>
    }
    const handleStarPress = (category: string, value: number) => {
        setReview({...review, [category]: value});
    }
    const styles = StyleSheet.create({
        wrapper: {
            paddingTop: 80,
            paddingHorizontal: 40,
            gap: 50,
        },
        backButton: {
            position: "absolute",
            top: 40,
            left: 25,
            zIndex: 5,
        },
        scrollView: {
            gap: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            paddingTop: 20,
        },
        category: {
            fontSize: 24,
        },
        stars: {
            flexDirection: 'row',
            gap: 20,
        },
        shortDescription: {
            backgroundColor: "white",
            fontSize: 16,
            borderRadius: 4,
            maxWidth: "100%"
        },
        longDescription: {
            backgroundColor: "white",
            fontSize: 12,
            borderRadius: 4,
            height: 100,
            width: "100%",
        },
        submitReview: {
            borderWidth: 1,
            borderRadius: 15,
            color: 'black'
        }
    })
    const handleSubmitReviewPress = async () => {
        const token = await SecureStore.getItemAsync("token");
        const response = await postReview(review, token);
        console.log(response);

        if (response && "status" in response && response.status === 200) {
            Alert.alert("Review Submitted!");
            navigation.goBack();
        }
    }

    const RatingCategory = (category: string) => (
        <View>
            <Text style={styles.title}>{getRatingTypeText(category)}</Text>
            {renderStars(category)}
        </View>
    )

    return <>
    <Pressable onPress={navigation.goBack} style={styles.backButton}>
        <Image source={require("../assets/images/back-button.png")}/>
    </Pressable>
    <View style={styles.wrapper}>
        <ScrollView style={styles.scrollView}>
            <View style={{gap: 20}}>
                <Text style={styles.title}>Leave a Review for {cafeName}</Text>
                {/* {ratingCategories.map((ratingCategory, index) => {
                    return <>
                        <Text key={`${ratingCategory}-text-${index}`} style={styles.title}>{getRatingTypeText(ratingCategory)}</Text>
                        <View key={`${ratingCategory}-view-${index}`} style={styles.stars}>
                            {renderStars(ratingCategory)}
                        </View>
                    </>
                }
                )} */}
                <FlatList
                    data={ratingCategories}
                    renderItem={({item}) => RatingCategory(item)}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    scrollEnabled={false}
                />
                <View>
                    <Text style={styles.title}>Short Description of Visit</Text>
                    <TextInput onChangeText={newText => setReview({...review, title: newText})} style={styles.shortDescription} maxLength={50} multiline={false}></TextInput>
                </View>
                <View>
                    <Text style={styles.title}>Long Description of Visit</Text>
                    <TextInput onChangeText={newText => setReview({...review, description: newText})} style={styles.longDescription} maxLength={250} multiline={true} numberOfLines={4}></TextInput>
                </View>
            </View>
        </ScrollView>
        <View style={styles.submitReview}>
            <Button onPress={()=>handleSubmitReviewPress()} title="Submit Review" color="black"/>
        </View>
    </View>
    </>
}