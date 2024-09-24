import { ImageType } from '@/lib/definitions';
import { useState } from 'react';

export default function useImageSlider(images: ImageType[]) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverSlide, setHoverSlide] = useState(0);

  function handlePrev() {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1);
      setHoverSlide(images.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
      setHoverSlide(currentSlide - 1);
    }
  }

  function handleNext() {
    if (currentSlide === images.length - 1) {
      setCurrentSlide(0);
      setHoverSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
      setHoverSlide(currentSlide + 1);
    }
  }

  function handleCurrentSlide(getCurrentIndex: number) {
    setCurrentSlide(getCurrentIndex);
  }

  function handleMouseMove(getCurrentIndex: number) {
    setHoverSlide(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHoverSlide(currentSlide);
  }

  return {
    currentSlide,
    hoverSlide,
    setHoverSlide,
    handlePrev,
    handleNext,
    handleCurrentSlide,
    handleMouseMove,
    handleMouseLeave,
  };
}
