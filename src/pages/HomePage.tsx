import { useRestaurants } from "../context/RestaurantContext";
import { restaurantType } from "../data/types";

// styles
import "./home-page.scss";

// components
import PopularRestaurants from "../components/PopularRestaurants ";
import Cuisines from "../components/cuisines/Cuisines";
import AllRestaurants from "../components/AllRestaurants";
import SurpriseRestaurant from "../components/SurpriseRestaurant";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { restaurants, pending } = useRestaurants();
  const [surpriseRestaurant, setSurpriseRestaurant] =
    useState<restaurantType>();

  useEffect(() => {
    const surpriseRestaurant =
      restaurants[Math.floor(Math.random() * restaurants.length)];
    setSurpriseRestaurant(surpriseRestaurant);
  }, [restaurants]);

  const mostPopular = restaurants
    ? [...restaurants]
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 10)
        .sort((a, b) => {
          let aV = a?.reviewsList.reduce(
            (x: number, y: { stars: number }) => x + y.stars,
            0
          );
          aV = aV !== 0 ? aV / a.reviews : 0;
          let bV = b?.reviewsList.reduce(
            (x: number, y: { stars: number }) => x + y.stars,
            0
          );
          bV = bV !== 0 ? bV / b.reviews : 0;
          console.log(aV, bV);
          return bV - aV;
        })
    : [];

  return (
    <section className="home-page">
      {surpriseRestaurant && (
        <SurpriseRestaurant surpriseRestaurant={surpriseRestaurant} />
      )}
      <PopularRestaurants mostPopular={mostPopular} isPending={pending} />
      <Cuisines />
      <AllRestaurants />
    </section>
  );
}
