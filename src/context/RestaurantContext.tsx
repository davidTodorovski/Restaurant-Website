import { createContext, useContext } from "react";
import { RestaurantContextType } from "./RestaurantProvider";

export const RestaurantContext = createContext({} as RestaurantContextType);

export const useRestaurants = () => useContext(RestaurantContext);
