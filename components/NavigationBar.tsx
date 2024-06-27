import { ParamListBase, useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export default function NavigationBar() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const styles = StyleSheet.create({
        wrapper: {
            height: 100,
            width: "100%",
            borderColor: "black",
            borderTopWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around', 
            position: 'absolute',
            bottom: 0,
        },
        text: {
            fontSize: 16,
            fontFamily: 'arial',
            alignSelf: 'center',
            paddingTop: 5,
        },
        tabs: {
            justifyContent: 'center',
            // width: "33%"
        },
        icon: {
            alignSelf: 'center',
            paddingTop: 0,
        }
    });
    const handlePress = (pageName: string) => {
        console.log(pageName);
        navigation.navigate(pageName);
    }

    return (
    <>
        <View
            style={styles.wrapper}
        >
            <Pressable
                style={styles.tabs}
                onPress={()=> handlePress('Home')}
            >
                <View
                    style={styles.tabs}
                >
                    <Image style={styles.icon} source={require('../assets/images/magnifying-glass--glass-search-magnifying.png')}/>
                    <Text style={styles.text}>Browse</Text>
                </View>
            </Pressable>
            <Pressable
                style={styles.tabs}
                onPress={()=>handlePress('Favorites')}
            >
                <View style={styles.tabs}>
                    <Image style={styles.icon} source={require('../assets/images/heart--reward-social-rating-media-heart-it-like-favorite-love.png')} />
                    <Text style={styles.text}>Favorites</Text>
                </View>
            </Pressable>
            <Pressable
                style={styles.tabs}
                onPress={()=>handlePress('Profile')}
            >
                <View style={styles.tabs}>
                    <Image style={styles.icon} source={require('../assets/images/user-circle-single--circle-geometric-human-person-single-user.png')} />
                    <Text style={styles.text}>Profile</Text>
                </View>
            </Pressable>
        </View>
    </>
    )
}