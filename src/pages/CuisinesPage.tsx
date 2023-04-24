import { useRestaurants } from "../context/RestaurantContext";
import { Link, useParams } from "react-router-dom";

// components
import ErrorAlert from "../components/ui/ErrorAlert";
import RestaurantCard from "../components/RestaurantCard";

export default function Cuisines() {
  const { restaurants, pending } = useRestaurants();
  const { type } = useParams();

  const cuisineRes = restaurants.filter((r) => r.restauranttype === type);

  if (pending) {
    return <p className="loader">Loading...</p>;
  }

  if (cuisineRes.length <= 0 || !cuisineRes) {
    return (
      <ErrorAlert>
        <p>No restaurants found for the chosen type</p>
        <div className="center">
          <Link className="error-link" to="/">
            Show all restaurants
          </Link>
        </div>
        <p>ljk;jkl</p>
      </ErrorAlert>
    );
  }

  return (
    <section>
      <h2 className="heading">{type} Restaurants</h2>
      <div className="restaurants-container">
        {cuisineRes.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </section>
  );
}
