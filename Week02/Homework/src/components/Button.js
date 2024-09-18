import React, { useState } from 'react';
import cx from 'classnames';

export default function Stars() {
  const [starCount, setStarCount] = useState(0);
  const maxStars = 5;

  const incrementStars = () => {
    if (starCount < maxStars) {
      setStarCount(starCount + 1);
    }
  };

  const decrementStars = () => {
    if (starCount > 0) {
      setStarCount(starCount - 1);
    }
  };

  return (
    <div className="stars">
      <div className="stars-display">
        {Array.from({ length: starCount }, (_, index) => (
          <span key={index}>⭐</span>
        ))}
      </div>
      <div className="buttons">
        {starCount < maxStars && (
          <Button onClick={incrementStars} primary>
            [+]
          </Button>
        )}
        {starCount > 0 && (
          <Button onClick={decrementStars} secondary>
            [-]
          </Button>
        )}
      </div>
    </div>
  );
}

function Button(props) {
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    ...otherProps
  } = props;

  const classes = cx(
    otherProps.className,
    'flex items-center px-8 py-3 border',
    {
      'bg-blue-500 border-blue-500 text-white': primary,
      'bg-gray-900 border-gray-900 text-white': secondary,
      'bg-green-500 border-green-500 text-white': success,
      'bg-orange-400 border-orange-500 text-white': warning,
      'bg-red-600 border-red-700 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-orange-400': outline && danger,
      'text-red-600': outline && warning,
    }
  );

  return (
    <button {...otherProps} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true!'
      );
    }
  },
};
