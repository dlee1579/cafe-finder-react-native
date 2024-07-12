import CafeTile from "@/components/CafeTile";
import NavigationBar from "@/components/NavigationBar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View, Image, StyleSheet, Pressable } from "react-native";
import { getAllCafes } from '../api-service';
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import * as SecureStore from 'expo-secure-store';

export function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    type Cafe = {
        id: string,
        name: string,
        address1: string,
        address2: string | null,
        number_seats: number,
        type_seats: string,
        description: string,
        neighborhood: string,
        has_wall_outlets: boolean,
        is_pet_friendly: boolean,
        thumbnail_image_location: string | null,
    }
    const [cafes, setCafes] = useState(Array<Cafe>);
    const getCafes = async () => {
        const token = await SecureStore.getItemAsync("token");
        setCafes(await getAllCafes(token))
    }
    useEffect(() => {
        getCafes();
    }, [])
    function onSearchSubmit() {
        // console.log("search submitted");
    }

    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: "rgb(207, 182, 157)",
            paddingTop: 60,
        },
        cafeSection: {
            flexDirection: "row",
            // justifyContent: "flex-end",
            paddingVertical: 30,
            alignItems: "center",
            textAlignVertical: 'center',
        },
        addCafe: {
            right: 10,
            position: 'absolute',
            // alignSelf: "flex-end",
        },
        textInput: {
            backgroundColor: "white",
            width: "86%",
            height: 57,
            borderRadius: 15,
            alignSelf: "center",
        },
        text: {
            // marginTop: 50,
            textAlign: 'left',
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "arial",
            justifyContent: 'flex-start',
            paddingLeft: "7%",
        },
        scrollView: {
            paddingHorizontal: 0,
            marginHorizontal: 0,
        },
    })
    const handleCafeTilePress = (cafeId: string) => {
        navigation.navigate("Cafe", {
            cafeId: cafeId,
        });
    }

    return <>
        <View
            style={styles.wrapper}
        >
            <TextInput
                placeholder="Search Bar"
                style={styles.textInput}
                onSubmitEditing={onSearchSubmit}
            />
            <View style={styles.cafeSection}>
                <Text style={styles.text}>Cafes near you</Text>
                <Pressable style={styles.addCafe}>
                    <Image source={require("../assets/images/add-circle--button-remove-cross-add-buttons-plus-circle-+-mathematics-math.png")} />
                </Pressable>
            </View>
            <SafeAreaView>
                <ScrollView
                style={styles.scrollView}
                >
                    {cafes.map((cafe, index) => (
                            <Pressable
                                onPress={()=>handleCafeTilePress(cafe.id)}
                                key={index}
                            >
                                <CafeTile
                                    key={cafe.id}
                                    name={cafe.name}
                                    neighborhood={cafe.neighborhood}
                                    thumbnail_image_location={cafe.thumbnail_image_location}
                                />
                            </Pressable>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <NavigationBar></NavigationBar>
        </View>
    </>
}