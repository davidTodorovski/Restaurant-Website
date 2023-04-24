export interface ReviewsList {
    id: number;
    author: string;
    comment: string;
    stars: number;
}

export interface restaurantType {
    reviews: number;
    parkinglot: boolean;
    phone: string;
    image: string;
    restauranttype: string;
    businessname: string;
    address: string;
    slug: string;
    email: string;
    id: string;
    reviewsList: ReviewsList[];
    website: string;
    isFavorite?: boolean
}