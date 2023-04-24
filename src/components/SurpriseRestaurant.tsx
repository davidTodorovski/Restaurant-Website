import React from "react";
import { restaurantType } from "../data/types";
import { Link } from "react-router-dom";

// styles
import "./surprise-restaurant.scss";

type Props = {
  surpriseRestaurant: restaurantType;
};

export default function SurpriseRestaurant({ surpriseRestaurant }: Props) {
  return (
    <div className="showcase">
      <h2 className="heading">Don't know what to eat?</h2>
      {surpriseRestaurant && (
        <Link to={`details/${surpriseRestaurant.slug}`} className="btn">
          Surprise me!
        </Link>
      )}
    </div>
  );
}
