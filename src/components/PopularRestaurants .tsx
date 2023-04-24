import React from "react";
import { restaurantType } from "../data/types";

// components
import RestaurantCard from "../components/RestaurantCard";
import Spinner from "./ui/Spinner";

// styles
import "./popular-restaurants.scss";

type Props = {
  mostPopular: restaurantType[];
  isPending: boolean;
};

export default function PopularRestaurants({ mostPopular, isPending }: Props) {
  return (
    <section>
      <h2 className="heading">Our most popular restaurants</h2>
      <div className="restaurants-container">
        {mostPopular.length !== 0 &&
          mostPopular.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
      </div>
      {isPending && <Spinner />}
    </section>
  );
}
