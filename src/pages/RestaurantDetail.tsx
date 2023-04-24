import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useRestaurants } from "../context/RestaurantContext";

// components
import ErrorAlert from "../components/ui/ErrorAlert";
import Spinner from "../components/ui/Spinner";

// styles
import "./restaurant-detail.scss";

const defaultFormValues = {
  author: "",
  comment: "",
  stars: 1,
};

export default function RestaurantDetail() {
  const { slug } = useParams();
  const { restaurants, pending, error, updateRestaurant } = useRestaurants();
  const [inputValues, setInputValues] = useState(defaultFormValues);

  const curRestaurant = restaurants.find((res) => res.slug === slug);

  const setInputValuesFunc = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValues.author === "" || inputValues.comment === "") return;

    const review = {
      stars: +inputValues.stars,
      author: inputValues.author,
      comment: inputValues.comment,
      id: +(Date.now() + "").slice(-10),
    };

    const updatedObj = { ...curRestaurant };
    updatedObj?.reviewsList?.unshift(review);
    updatedObj.reviews = updatedObj?.reviewsList?.length;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedObj),
    };
    fetch(
      `http://localhost:5001/restaurants/${curRestaurant?.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => updateRestaurant(data))
      .catch((error) => console.log(error));

    setInputValues(defaultFormValues);
  };

  if (error) {
    <ErrorAlert>
      <p>An error occurred.</p>
    </ErrorAlert>;
  }

  if (pending) {
    return <Spinner />;
  }

  if (!curRestaurant) {
    return (
      <ErrorAlert>
        <p>Restaurant with that name doesn't exist.</p>
      </ErrorAlert>
    );
  }

  const rating =
    curRestaurant.reviewsList.length !== 0
      ? curRestaurant.reviewsList.reduce((a, b) => a + b.stars, 0) /
        curRestaurant.reviewsList.length
      : 0;

  return (
    <section className="restaurant-detail-section">
      <h2 className="heading">{slug}</h2>

      <div className="restaurant-detail">
        <img src={curRestaurant.image} alt="" />
        <div>
          {curRestaurant.reviews !== 0 && (
            <>
              <p className="res-detail-rating">rating - {rating}</p>
              <p className="res-detail-review">
                based on {curRestaurant.reviews} reviews
              </p>
            </>
          )}
          <p className="res-detail-email">{curRestaurant.email}</p>
          <p className="res-detail-phone">{curRestaurant.phone}</p>
          <p className="res-detail-address">{curRestaurant.address}</p>
          {curRestaurant.parkinglot && (
            <p className="res-detail-parking">
              We have a parking lot waiting for you
            </p>
          )}
        </div>
      </div>
      <h2 className="heading">Reviews</h2>
      {curRestaurant.reviewsList.length !== 0 ? (
        <div className="reviews-container">
          {curRestaurant.reviewsList.map((rev) => (
            <div key={rev.id} className="restaurant-review">
              <p>
                <b>Author:</b>&nbsp;
                {rev.author}
              </p>
              <p>
                <b>Message:</b>&nbsp;
                {rev.comment}
              </p>
              <p>
                <b>Stars:</b>&nbsp;
                {rev.stars}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-rev">No reviews</p>
      )}
      <h2 className="heading">Review form</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          <span>Name</span>
          <input
            onChange={setInputValuesFunc}
            className="name-input"
            type="text"
            name="author"
            value={inputValues.author}
          />
        </label>
        <label>
          <span>Comment</span>
          <textarea
            onChange={setInputValuesFunc}
            className="comment-input"
            name="comment"
            value={inputValues.comment}
          />
        </label>
        <label>
          <span>Stars</span>
          <input
            onChange={setInputValuesFunc}
            className="stars-input"
            type="range"
            min="1"
            max="5"
            name="stars"
            value={inputValues.stars}
          />
        </label>
        <button className="btn">Leave a review</button>
      </form>
    </section>
  );
}
