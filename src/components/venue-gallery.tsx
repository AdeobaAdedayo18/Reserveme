import { useState } from "react";

interface VenueGalleryProps {
  images: string[];
}

export default function VenueGallery({ images }: VenueGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const goToPrevious = () => {
    setCurrentImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setCurrentImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="space-y-4">
      <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt="Venue view"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className="group relative overflow-hidden rounded-lg bg-neutral-100"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Venue thumbnail ${index + 1}`}
              className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 transition-colors ${
                currentImage === index
                  ? "border-2 border-indigo-500"
                  : "bg-neutral-900/0 group-hover:bg-neutral-900/10"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
