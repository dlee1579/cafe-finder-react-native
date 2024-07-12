import NavigationBar from "@/components/NavigationBar"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react"
import { Text, View, Image, StyleSheet, ScrollView, Linking, Pressable } from "react-native"
import { Cafe, emptyReview, Review, StackParamList } from "../types"
import { getCafeDetailsById, getReviewsByCafeId } from "@/api-service";
import Rating from "@/components/Rating";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import * as SecureStore from 'expo-secure-store';


export default function CafeDetails() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route  = useRoute<RouteProp<StackParamList, 'Cafe'>>();
    const cafeId = route.params.cafeId;

    const [cafeDetails, setCafeDetails] = useState<Cafe>({
        id: null,
        name: null,
        address1: null,
        address2: null,
        number_seats: null,
        type_seats: null,
        description: null,
        neighborhood: null,
        has_wall_outlets: null,
        is_pet_friendly: null,
        thumbnail_image_location: null,
        ratings: null,
        google_maps_url: null,
    });
    const [reviews, setReviews] = useState<Array<Review>>([]);
    const [myReview, setMyReview] = useState<Review>(emptyReview);
    const amenities = ['number_seats', 'has_wall_outlets', 'is_pet_friendly'];
    const amenitiesTextMap: any = {
        number_seats: {
            text: `${cafeDetails.number_seats} Seats`,
            icon: require("../assets/images/chair--chair-business-product-comfort-decoration-sit-furniture.png"),
        },
        has_wall_outlets: {
            text: "Wall Outlets",
            icon: require("../assets/images/electric-cord-3--electricity-electronic-appliances-device-cord-cable-plug-connection.png"),
        },
        is_pet_friendly: {
            text: "Pet Friendly",
            icon: require("../assets/images/pets-allowed--travel-wayfinder-pets-allowed.png"),
        }
    };

    const getCafeDetails = async () => {
        const token = await SecureStore.getItem("token");
        const payload = await getCafeDetailsById(cafeId, token);
        if (payload) {
            setCafeDetails(payload);
        }
    };

    const getCafeReviews = async () => {
        const token = await SecureStore.getItem("token");
        const currentUserId = parseInt(await SecureStore.getItem("userId")!);
        const payload = await getReviewsByCafeId(cafeId, token);
        if (payload) {
            setReviews(payload);
            const myReviews = payload.filter((payloadReview: Review) => (
                payloadReview.author_id === currentUserId
            ))
            if (myReviews) {
                setMyReview(myReviews[0]);
            }
        }
        // payload.filter((payloadReview: Review) => (
        //     payloadReview.author_id === 
        // ))
    }

    useEffect(()=> {
        getCafeDetails();
        getCafeReviews();
    }, []);

    const styles = StyleSheet.create({
        backButton: {
            position: "absolute",
            top: 40,
            left: 25,
            zIndex: 5,
        },
        cafeName: {
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'arial',
        },
        cafeNeighborhood: {
            fontSize: 16,
            opacity: 0.5,
        },
        basicInfoSection: {
            paddingVertical: 15,
            paddingLeft: 20,
            borderColor: 'black',
            height: 90,
            borderBottomWidth: .5,
        },
        cafeAddress: {
            fontSize: 16,
            textDecorationLine: 'underline',
            paddingLeft: 10,
            alignSelf: 'center',
        },
        addressSection: {
            flexDirection: 'row',
            padding: 20,
            height: 75,
            borderBottomWidth: .5,
        },
        amenitiesSection: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderBottomWidth: .5,
        },
        amenity: {
            width: '50%',
            flexDirection: 'row',
            height: 60,
            justifyContent: 'center'
        },
        amenityContent: {
            alignSelf: 'center',
            fontSize: 16,
            paddingHorizontal: 15,
            textAlign: 'center',
        },
        ratingsSection: {
            padding: 20,
            borderBottomWidth: .5,
        },
        ratingsHeader: {
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'arial',
        },
        ratings: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        rating: {
            width: '50%',
        },
        reviewsSection: {
            padding: 20,
            paddingBottom: 200,
        },
        reviewsHeader: {
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'arial',
            // paddingVertical:
        },
        reviewsText: {
            paddingVertical: 10,
        },
        addReview: {
            right: 0,
            position: "absolute",
        },
        myReviewHeader: {
            fontSize: 20,
            paddingTop: 20,
            paddingBottom: 10,
        },
        myReviewTitle: {
            fontWeight: 'bold',
            paddingBottom: 5,
        }
    });

    const handleOpenAddress = () => {
        if (cafeDetails.google_maps_url) {
            Linking.canOpenURL(cafeDetails.google_maps_url!).then(supported => {
                if (supported) {
                    Linking.openURL(cafeDetails.google_maps_url!);
                } else {
                    console.error('Cannot open Google Maps URL');
                }
            })
        }
    };

    const handleAddReview = (cafeId: string|null, cafeName: string|null) => {
        if (cafeId && cafeName) {
            navigation.navigate("AddReview", {
                cafeId: cafeId,
                cafeName: cafeName,
            });
        }
    }

    const MyReview = () => (
        myReview && <View>
            <Text style={styles.myReviewHeader}>My Review:</Text>
            <Text style={styles.myReviewTitle}>{myReview.title}</Text>
            <Text>{myReview.description}</Text>
        </View>
    )

    return (
        <>
        <Pressable onPress={navigation.goBack} style={styles.backButton}>
            <Image source={require("../assets/images/back-button.png")}/>
        </Pressable>
        <ScrollView style={{
            backgroundColor: "rgb(207, 182, 157)",
            width: '100%',
            height: '100%',
            // height: 4000,
        }}>
            <Image
                source={require('../assets/images/hi_note_thumbnail.jpeg')}
                style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: 290,
                }}
            />
            <View style={styles.basicInfoSection}>
                <Text style={styles.cafeName}>{cafeDetails.name}</Text>
                <Text style={styles.cafeNeighborhood}>Cafe in {cafeDetails.neighborhood}</Text>
            </View>
            <View style={styles.addressSection}>
                <Image source={require('../assets/images/location-pin-3--navigation-map-maps-pin-gps-location.png')} />
                <Text onPress={handleOpenAddress} style={styles.cafeAddress}>{cafeDetails.address1}</Text>
            </View>
            <View style={styles.amenitiesSection}>
                {Object.keys(amenitiesTextMap).map((key, index) => (
                    <View key={index} style={styles.amenity}>
                        <Image style={styles.amenityContent} source={amenitiesTextMap[key].icon}/>
                        <Text style={styles.amenityContent}>{amenitiesTextMap[key].text}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.ratingsSection}>
                <Text style={styles.ratingsHeader}>Ratings ({reviews.length})</Text>
                <View style={styles.ratings}>
                    {cafeDetails.ratings && Object.keys(cafeDetails.ratings).map((key) => (
                        <Rating key={key} type={key} value={cafeDetails.ratings![key]} />
                    ))}
                </View>
            </View>
            <View style={styles.reviewsSection}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.reviewsHeader}>Reviews ({reviews.filter((review) => (review.title && review.description)).length})</Text>
                    {/* <Text style={styles.reviewsHeader}>Reviews ({reviews.length})</Text> */}
                    {!myReview && <Pressable style={styles.addReview} onPress={()=>handleAddReview(cafeDetails.id, cafeDetails.name)}>
                        <Image source={require("../assets/images/add-circle--button-remove-cross-add-buttons-plus-circle-+-mathematics-math.png")}/>
                    </Pressable>}
                </View>
                <View>
                    <MyReview />
                    {/* {reviews.map((review, index) => (
                        <Text key={index} style={styles.reviewsText}>{review.title}</Text>
                    ))} */}
                </View>
            </View>
        </ScrollView>
        <NavigationBar/>
        </>
    )
}