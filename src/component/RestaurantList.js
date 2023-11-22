// RestaurantList.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const restaurantsData = [
  { name: '엽기떡볶이', rating: 4.5, orders: 120, deliveryFee: 3000 },
  { name: '신전떡볶이', rating: 4.2, orders: 90, deliveryFee: 2500 },
  { name: '응급실떡볶이', rating: 4.8, orders: 150, deliveryFee: 3500 },
  { name: '배떡', rating: 4.0, orders: 80, deliveryFee: 2000 },
  { name: '청년다방', rating: 4.6, orders: 110, deliveryFee: 2800 },
];

const RestaurantList = () => {
  const [sortedRestaurants, setSortedRestaurants] = useState(restaurantsData);

  const sortRestaurants = (type) => {
    let sorted;

    switch (type) {
      case 'default':
        sorted = [...restaurantsData];
        break;
      case 'popular':
        sorted = [...restaurantsData].sort((a, b) => b.orders - a.orders);
        break;
      case 'rating':
        sorted = [...restaurantsData].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted = [...restaurantsData];
    }

    setSortedRestaurants(sorted);
  };

  return (
    <div>
      <h2>음식점 목록</h2>
      <div>
        <button onClick={() => sortRestaurants('default')}>기본순</button>
        <button onClick={() => sortRestaurants('popular')}>주문많은순</button>
        <button onClick={() => sortRestaurants('rating')}>별점순</button>
      </div>
      <ul>
      {sortedRestaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <div>
                <strong>{restaurant.name}</strong>
              </div>
              <div>별점: {restaurant.rating}</div>
              <div>주문수: {restaurant.orders}</div>
              <div>배달팁: {restaurant.deliveryFee}원</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );s
};

export default RestaurantList;