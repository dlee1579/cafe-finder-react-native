export type Ratings = {
    [field: string]: number,
}

export type Cafe = {
    id: string | null,
    name: string | null,
    address1: string | null,
    address2: string | null,
    number_seats: number | null,
    type_seats: string | null,
    description: string | null,
    neighborhood: string | null,
    has_wall_outlets: boolean | null,
    is_pet_friendly: boolean | null,
    thumbnail_image_location: string | null,
    ratings: Ratings | null,
    google_maps_url: string | null,
};

export type StackParamList = {
    Home: undefined,
    Favorites: undefined,
    Profile: undefined,
    Cafe: {cafeId: string | undefined},
    Login: undefined,
    AddReview: {
        cafeId: string | undefined,
        cafeName: string | undefined,
    }
  }

export type Review = {
    id: number | null,
    author_id: number | null,
    cafe_id: number | null,
    title: string | null,
    description: string | null,
    coffee_quality: number | null,
    comfortability: number | null,
    atmosphere: number | null,
    quietness: number | null,
    cleanliness: number | null,
    created_at: string | null,
    updated_at: string | null,
}

export const emptyReview = {
    id: null,
    author_id: null,
    cafe_id: null,
    title: null,
    description: null,
    coffee_quality: null,
    comfortability: null,
    atmosphere: null,
    quietness: null,
    cleanliness: null,
    created_at: null,
    updated_at: null,
}

export type CreateReview = {
    cafe_id: number | null,
    title: string | null,
    description: string | null,
    coffee_quality: number | null,
    comfortability: number | null,
    atmosphere: number | null,
    quietness: number | null,
    cleanliness: number | null,
}

export const ratingCategories = ["coffee_quality", "comfortability", "atmosphere", "quietness", "cleanliness"];

export type RatingType = {
    type: string,
    value: number,
}

export type StarType = {
    starType: string
}

export type LoginData = {
    username: string
    password: string
  }