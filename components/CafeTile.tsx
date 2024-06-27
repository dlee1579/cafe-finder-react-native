import { Text, View, Image } from "react-native";

interface CafeTile {
    // id: string,
    name: string,
    // address1: string,
    // address2: string | null,
    // number_seats: number,
    // type_seats: string,
    // description: string,
    neighborhood: string,
    // has_wall_outlets: boolean,
    // is_pet_friendly: boolean,
    thumbnail_image_location: string | null,
}


export default function CafeTile(cafe: CafeTile){
    // const {cafe} = props;
    console.log(cafe);
    const thumbnailPath = '../assets/images/'+cafe.thumbnail_image_location;

    return <>
        <View
            style={{
                width: 308,
                height: 220,
                borderRadius: 15,
                backgroundColor: "gray",
                marginLeft: "10%",
                marginTop: 20,
            }}
        >
            <Image
                source={require('../assets/images/hi_note_thumbnail.jpeg')}
                style={{
                    resizeMode: 'cover',
                    maxWidth: 308,
                    maxHeight: 220,
                    borderRadius: 15,
                }}
            />
            <Image
                // source={require(thumbnailPath)}
                source={{
                    uri: `../assets/images/${cafe.thumbnail_image_location}`
                }}
            />
            <View
                style={{
                    zIndex: 1,
                    position: "absolute",
                    backgroundColor: "#D9D9D9",
                    flex: 1,
                    // justifyContent: 'flex-end',
                    bottom: 0,
                    height: 83,
                    width: "100%",
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                }}
            >
                <View
                    style={{
                        marginLeft: 10,
                        marginTop: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}
                    >{cafe.name}</Text>
                    <Text
                        style={{
                            fontSize: 10,
                            color: "rgba(0,0,0,.5)"
                        }}
                    >{cafe.neighborhood}</Text>
                    <Text
                        style={{
                            fontSize: 10,
                            color: "rgba(0,0,0,.5)",
                        }}
                    >
                        0.x mi from you
                    </Text>
                </View>
            </View>
        </View>
    </>
}