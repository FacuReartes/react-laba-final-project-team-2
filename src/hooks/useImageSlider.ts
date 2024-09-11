import { ImageType } from '@/lib/definitions';
import { useState } from 'react';

export default function useImageSlider(images: ImageType[]) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function handlePrev() {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  function handleNext() {
    if (currentSlide === images.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }

  function handleCurrentSlide(getCurrentIndex: number) {
    setCurrentSlide(getCurrentIndex);
  }

  return {
    currentSlide,
    handlePrev,
    handleNext,
    handleCurrentSlide,
  };
}
