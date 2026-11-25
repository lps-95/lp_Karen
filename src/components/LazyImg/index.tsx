import React from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ fallbackSrc, ...props }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return <img loading="lazy" {...props} onError={handleError} />;
};

export default LazyImage;
