import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    let animationFrameId;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      // Make sure the cursor becomes visible
      cursor.style.opacity = "1";
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

      animationFrameId =
        requestAnimationFrame(animate);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    animationFrameId =
      requestAnimationFrame(animate);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    />
  );
}