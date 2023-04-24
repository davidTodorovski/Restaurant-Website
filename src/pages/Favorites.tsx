import React from "react";
import RestaurantCard from "../components/RestaurantCard";
import { useRestaurants } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";

// styles
import "./favorites.scss";

export default function Favorites() {
  const { restaurants, pending } = useRestaurants();

  const favoriteARestaurants = restaurants.filter((r) => r.isFavorite);
  console.log(favoriteARestaurants);
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="heading">Your favorite restaurants</h2>
      {pending && <p className="loader">Loading...</p>}
      {favoriteARestaurants.length !== 0 ? (
        <div className="restaurants-container-column">
          {favoriteARestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <p className="no-res">
          No favorite restaurants.{" "}
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go back
          </button>
        </p>
      )}
    </div>
  );
}
