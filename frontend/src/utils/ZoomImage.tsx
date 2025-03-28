import { useEffect, useRef, useState } from "react";

interface ZoomImageProps {
  src: string;
  alt: string;
}

function ZoomImage({ src, alt }: ZoomImageProps) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const zoomRef = useRef<HTMLDivElement>(null); 

  const updatePosition = (clientX: number, clientY: number, target: HTMLElement) => {
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom) {
      updatePosition(e.clientX, e.clientY, e.currentTarget);
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setZoom(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    updatePosition(clientX, clientY, e.currentTarget);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zoom && zoomRef.current && e.target instanceof Node && !zoomRef.current.contains(e.target)) {
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