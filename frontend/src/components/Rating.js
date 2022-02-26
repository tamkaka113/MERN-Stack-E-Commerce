import React from "react";
import PropTypes from "prop-types";

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

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
