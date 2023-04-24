import { restaurantType } from "../data/types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRestaurants } from "../context/RestaurantContext";
import { Link } from "react-router-dom";

// styles
import "./restaurant.scss";

type Props = {
  restaurant: restaurantType;
};

export default function RestaurantCard({ restaurant }: Props) {
  const { favoriteARestaurant } = useRestaurants();

  const rating =
    restaurant.reviewsList.length !== 0
      ? restaurant.reviewsList.reduce((a, b) => a + b.stars, 0) /
        restaurant.reviewsList.length
      : 0;

  return (
    <Link to={`/details/${restaurant.slug}`} className="restaurant">
      <img src={restaurant.image} alt="" />
      <div className="details">
        <h3>{restaurant.businessname}</h3>
        <button
          onClick={(e) => favoriteARestaurant(e, restaurant.id)}
          className="icon"
        >
          {restaurant.isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className="restaurant-type">{restaurant.restauranttype}</p>
        {restaurant.reviews !== 0 && (
          <>
            <p className="rating">rating - {rating},</p>
            <span>based on {restaurant.reviews} reviews</span>
          </>
        )}
      </div>
    </Link>
  );
}
