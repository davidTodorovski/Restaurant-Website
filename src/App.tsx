import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RestaurantProvider from "./context/RestaurantProvider";
import { useFetch } from "./hooks/useFetch";

// components
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RestaurantDetail from "./pages/RestaurantDetail";
import Favorites from "./pages/Favorites";
import CuisinesPage from "./pages/CuisinesPage";
import Footer from "./components/Footer";

const App = () => {
  const { data, isPending, error } = useFetch(
    "http://localhost:5001/restaurants"
  );

  return (
    <div className="app container">
      {data && (
        <RestaurantProvider
          initRestaurants={data}
          pending={isPending}
          error={error}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cuisines/:type" element={<CuisinesPage />} />
            <Route path="/details/:slug" element={<RestaurantDetail />} />
          </Routes>
          <Footer />
        </RestaurantProvider>
      )}
    </div>
  );
};

export default App;
