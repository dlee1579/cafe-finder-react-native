import { RatingType, StarType } from "@/types";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Rating(props: RatingType) {
    const styles = StyleSheet.create({
        rating: {
            width: '50%',
            height: 60,
            justifyContent: 'center'
        },
        ratingType: {
            fontSize: 16,
            textAlign: 'center',
            padding: 5,
        },
        starSection: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        stars: {
            // paddingHorizontal: 10,
        },
        starValueText: {
            paddingRight: 10,
        }
    })
    const getRatingTypeText = (type: string) => {
        let subWords = type.split("_")
        for (let i = 0; i < subWords.length; i++) {
            subWords[i] = subWords[i].charAt(0).toUpperCase() + subWords[i].slice(1);
        }
        return subWords.join(" ")
    }

    const FullStar = () =>  {
        return <>
            <Image source={require("../assets/images/star-1--reward-rating-rate-social-star-media-favorite-like-stars.png")}/>
        </>
    }
    const HalfStar = () => {
        return <>
            <Image source={require("../assets/images/half-star.png")} />
        </>
    }
    const EmptyStar = () => {
        return <>
            <Image source={require("../assets/images/star-empty-1--reward-rating-rate-social-star-media-favorite-like-stars.png")}/>
        </>
    }

    const Star = (props: StarType) => {
        if (props.starType === "full") {
            return <>
                <FullStar/>
            </>
        } else if (props.starType === "half") {
            return <>
                <HalfStar/>
            </>
        } else if (props.starType === "empty") {
            return <>
                <EmptyStar />
            </>
        }
    }

    const renderStarRating = (value: number) => {
        let starRating = Math.round(value*2)/2;
        const starTypes = ['full', 'half', "empty"];
        let stars = [];
        let starTypeCount = {
            "full": 0,
            "half": 0,
            "empty": 0,
        };
        let starCount = 5;

        while (starRating >= 1 && starCount > 0) {
            stars.push("full")
            starCount--;
            starRating--;
        }
        if (starRating === 0.5) {
            stars.push("half")
            starCount--;
            starRating = starRating - 0.5;
        }
        while (stars.length < 5) {
            stars.push("empty")
        }
        return <>
            {stars.map((starType, index) => (
                <View key={index} style={styles.stars}>
                    <Star starType={starType}/>
                </View>
            ))}
        </>

    }
    return <>
        <View style={styles.rating}>
            <Text style={styles.ratingType}>{getRatingTypeText(props.type)}</Text>
            <View style={styles.starSection}>
                <Text style={styles.starValueText}>{props.value}</Text>
                {renderStarRating(props.value)}
            </View>
        </View>
    </>
}