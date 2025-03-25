import { useEffect, useRef, useState } from "react";

function ZoomImage({ src, alt }) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const zoomRef = useRef(null);

  // zoom position information based on cursor hover or tap
  const updatePosition = (clientX, clientY, target) => {
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  // zoom in hover for desktop
  const handleMouseMove = (e) => {
    if (zoom) {
      updatePosition(e.clientX, e.clientY, e.currentTarget);
    }
  };

  // zoom in tap for mobile
  const handleTap = (e) => {
    setZoom(true);
    updatePosition(
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      e.currentTarget,
    );
  };

  // close zoom when clicked outside img, this is only for mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (zoom && zoomRef.current && !zoomRef.current.contains(e.target)) {
        setZoom(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [zoom]);

  return (
    <div
      ref={zoomRef}
      className="relative mx-auto mb-8 flex w-full cursor-move flex-col items-center overflow-hidden"
      onClick={handleTap}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
    >
      <img
        src={src}
        alt={alt}
        className="rounded-custom w-full border border-red-500 object-cover transition-transform duration-300"
      />
      {zoom && (
        <div
          className="rounded-custom pointer-events-none absolute inset-0 border border-gray-400 bg-no-repeat"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        />
      )}
    </div>
  );
}

export default ZoomImage;
