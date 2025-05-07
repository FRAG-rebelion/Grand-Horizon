/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import level5 from "../assets/level5.jpg";
import level4 from "../assets/level4.jpg";
import level1 from "../assets/level1.jpg";
import level2 from "../assets/level2.jpg";
import level3 from "../assets/level3.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// --- Custom Hook for Visibility in the Sidebar ---

function useOnScreen(ref, containerRef, rootMargin = "0px") {
 
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    if (!ref.current || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { root: containerRef.current, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, containerRef, rootMargin]);
  return isIntersecting;
}

// Helper function to get room type based on floor.
function getRoomType(room) {
  if (room.floor === 1) return "Reception";
  if (room.floor === 2) return "Deluxe Rooms - Level 1";
  if (room.floor === 3) return "Deluxe Rooms - Level 2";
  if (room.floor === 4) return "Deluxe Rooms - Level 3";
  if (room.floor === 5) return "Penthouse";
  if (room.floor === 6) return "Royal Room";
  return "Room";
}

function getRoomImg(room) {
  // Adjust these mappings as needed
  if (room.floor === 2) return level1;
  if (room.floor === 3) return level2;
  if (room.floor === 4) return level4;
  if (room.floor === 5) return level3;
  if (room.floor === 6) return level5;
  return "";
}

// --- Sidebar RoomDetail Component ---
function RoomDetail({ room, onSelect, containerRef, registerRef }) {
  const navigate = useNavigate();
  const localRef = useRef(null);
  const isVisible = useOnScreen(localRef, containerRef, "0px");

  useEffect(() => {
    if (localRef.current) registerRef(room.id, localRef.current);
  }, [room.id, registerRef]);
  

  const handleClick = (e) => {
    e.stopPropagation();
    if (!room.unclickable && isVisible) onSelect(room.id);
  };

  // Get details to display
  const roomType = getRoomType(room);

  const RoomImg = getRoomImg(room);
  console.log("this is the selected room", room);

  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/payment", { state: { room } });
    } else {
      navigate("/login");
    }
  };

  return (
    
    <div
      ref={localRef}
      onClick={handleClick}
      className={`max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer ${
        room.unclickable ? "opacity-50 cursor-default" : ""
      }`}
    >
      
      {/* Full-width Large Image */}
      <img
        src={RoomImg}
        alt={`${roomType} preview`}
        className="w-full h-64 object-cover"
      />
      {/* Card Details */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-1">{roomType}</h3>
        {room.description && (
          <p className="text-gray-700 mb-1">{room.description}</p>
        )}
        {room.price && (
          <p className="text-lg font-bold text-green-600 mb-3">
            ${room.price} per night
          </p>
        )}
        <p className="text-sm text-gray-500 mb-4">
          Floor: {room.floor} {room.unclickable && "- Not Available"}
        </p>
        
      <button
      onClick={handleBookNow}
      className="w-full bg-prime hover:bg-second text-white px-6 py-3 rounded transition-colors"
    >
      Book Now
    </button>
      </div>
    </div>
  );
}

export default RoomDetail;
