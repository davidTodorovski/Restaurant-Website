import React, { useEffect, useState } from "react";
import { restaurantType } from "../data/types";
import { RestaurantContext } from "./RestaurantContext";

type Props = {
  children: React.ReactNode;
  initRestaurants: restaurantType[];
  pending: boolean;
  error: boolean;
};

export type RestaurantContextType = {
  restaurants: restaurantType[];
  pending: boolean;
  error: boolean;
  favoriteARestaurant: (e: React.MouseEvent, id: string) => void;
  updateRestaurant: (res: restaurantType) => void;
};

export default function RestaurantProvider({
  children,
  initRestaurants,
  pending,
  error,
}: Props) {
  const [restaurants, setRestaurants] = useState<restaurantType[]>([]);

  useEffect(() => {
    const restaurantsLS = localStorage.getItem("restaurants");
    if (restaurantsLS) {
      setRestaurants(JSON.parse(restaurantsLS));
    } else {
      const allRestaurants = initRestaurants.map((r) => ({
        ...r,
        isFavorite: false,
      }));

      setRestaurants(allRestaurants);
    }
  }, [initRestaurants]);

  useEffect(() => {
    if (restaurants.length > 0) {
      localStorage.setItem("restaurants", JSON.stringify(restaurants));
    }
  }, [restaurants]);

  function favoriteARestaurant(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const updatedRestaurants = restaurants.map((r) => {
      if (r.id === id) {
        return { ...r, isFavorite: !r.isFavorite };
      } else {
        return r;
      }
    });

    setRestaurants(updatedRestaurants);
  }

  function updateRestaurant(res: restaurantType) {
    const updatedRestaurants = restaurants.map((r) => {
      if (r.id === res.id) {
        return res;
      } else {
        return r;
      }
    });
    setRestaurants(updatedRestaurants);
  }

  const obj = {
    restaurants,
    pending,
    error,
    favoriteARestaurant,
    updateRestaurant,
  };

  return (
    <RestaurantContext.Provider value={obj}>
      {children}
    </RestaurantContext.Provider>
  );
}
