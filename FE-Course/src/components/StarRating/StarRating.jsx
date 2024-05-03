import React, { useState } from 'react';

const StarRating = ({ totalStars ,handleStarClick,dataRate }) => {

  return (
    <>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            selected={dataRate >= starValue}
            onClick={() => handleStarClick(starValue)}
          />
        );
      })}
    </>
  );
};

const Star = ({ selected, onClick }) => (
  <span style={{ color: selected ? 'gold' : 'gray', cursor: 'pointer' ,fontSize: 32}} onClick={onClick}>
    ★
  </span>
);

export default StarRating;
