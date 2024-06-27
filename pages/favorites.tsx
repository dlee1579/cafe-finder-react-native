import NavigationBar from "@/components/NavigationBar"
import { Text, View } from "react-native"

export default function Favorites() {
    return (
        <>
        <View style={{
            backgroundColor: "rgb(207, 182, 157)",
            width: '100%',
            height: '100%'
        }}>
            <Text>Favorites Page</Text>
            <NavigationBar/>
        </View>
        </>
    )
}