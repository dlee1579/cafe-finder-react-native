import CafeTile from "@/components/CafeTile";
import NavigationBar from "@/components/NavigationBar";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View, Image, StyleSheet } from "react-native";


export function Home() {
    const navigation = useNavigation();
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
    const [cafes, setCafes] = useState(Array<Cafe>)
    const getCafes = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/cafe/api/cafes/");
            const json = await response.json();
            setCafes(json);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCafes();
    }, [])
    function onSearchSubmit() {
        console.log("search submitted");
    }

    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            backgroundColor: "rgb(207, 182, 157)",
            paddingTop: 30,
        },
        textInput: {
            backgroundColor: "white",
            width: "86%",
            height: 57,
            borderRadius: 15,
            alignSelf: "center",
        },
        text: {
            marginTop: 50,
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


    return <>
        <View
            style={styles.wrapper}
        >
            <TextInput
                placeholder="Search Bar"
                style={styles.textInput}
                onSubmitEditing={onSearchSubmit}
            />
            <Text
                style={styles.text}
            >Cafes near you</Text>
            <SafeAreaView>
                <ScrollView
                style={styles.scrollView}
                >
                    {cafes.map((cafe) => (
                            <CafeTile
                                key={cafe.id}
                                name={cafe.name}
                                neighborhood={cafe.neighborhood}
                                thumbnail_image_location={cafe.thumbnail_image_location}
                            />
                    ))}
                </ScrollView>
            </SafeAreaView>
            <NavigationBar></NavigationBar>
        </View>
    </>
}