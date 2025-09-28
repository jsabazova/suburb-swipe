import { useState, useRef } from 'react';

const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const minSwipeDistance = threshold;

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
    setIsSwiping(true);
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) {
      setIsSwiping(false);
      return;
    }

    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }

    setIsSwiping(false);
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    isSwiping
  };
};

export default useSwipe;