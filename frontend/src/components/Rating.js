import React from "react";

const Rating = ({ value, text, color }) => {
  const Stars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;

    return (
      <span>
        <i
          style={{ color }}
          className={
            value >= index + 1
              ? "fas fa-star"
              : value >= number
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
    );
  });

  return (
    <div>
      <div>{Stars}</div>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};


export default Rating;
