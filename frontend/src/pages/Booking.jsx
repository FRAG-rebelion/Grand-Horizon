/* eslint-disable react/no-unknown-property */
import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "../components/Room";
import RoomDetail from "../components/RoomDetail";

// --- Scale and Dimensions ---
// Scale 1:1: Each base cell is 1 unit.
// Merging a 2×2 block yields a room of size 2×1×2.
const baseCellSize = 1;
const roomHeight = 1;
const mergedWidth = baseCellSize * 2; // 2 units
const mergedDepth = baseCellSize * 2; // 2 units

// Original grid: 10 columns x 8 rows. After merging: 5 columns x 4 rows.
const numMergedCols = 5;
const numMergedRows = 4;

function generateRooms() {
  const rooms = [];
  let id = 0;
  
  // Overall building footprint from merged grid:
  const footprintWidth = numMergedCols * mergedWidth;   // 5 * 2 = 10
  const footprintDepth = numMergedRows * mergedDepth;     // 4 * 2 = 8

  // --- Floor 1: Grand Lobby (Reception) ---
  const lobbyY = 0 + roomHeight / 2; 
  rooms.push({
    id: id,
    name: "Grand Lobby",
    description: "Welcome to The Standard, Downtown LA. Enjoy our grand lobby where arrivals are greeted in style.",
    price: null,
    position: [0, lobbyY, 0],
    floor: 1,
    size: [footprintWidth, roomHeight, footprintDepth],
    unclickable: true,
  });
  id++;

  // --- Floors 2-4: Deluxe Rooms (only outer rooms) ---
  const offsetX = ((numMergedCols - 1) / 2) * mergedWidth; // ((5-1)/2)*2 = 4
  const offsetZ = ((numMergedRows - 1) / 2) * mergedDepth;   // ((4-1)/2)*2 = 3
  for (let floor = 2; floor <= 4; floor++) {
    const y = (floor - 1) + roomHeight / 2; // Floor 2: 1.5, Floor 3: 2.5, Floor 4: 3.5
    // Set price based on floor level:
    const floorPrice = floor === 2 ? 300 : floor === 3 ? 350 : 400;
    for (let row = 0; row < numMergedRows; row++) {
      for (let col = 0; col < numMergedCols; col++) {
        // Only add rooms on the perimeter
        if (row !== 0 && row !== numMergedRows - 1 && col !== 0 && col !== numMergedCols - 1) {
          continue;
        }
        rooms.push({
          id: id,
          name: `Deluxe Room ${id}`,
          description: `Deluxe Room ${id} on Floor ${floor} – Enjoy a stylish and comfortable stay in the heart of Los Angeles.`,
          price: floorPrice,
          position: [col * mergedWidth - offsetX, y, row * mergedDepth - offsetZ],
          floor: floor,
          size: [mergedWidth, roomHeight, mergedDepth],
          unclickable: false,
          row: row, // Used later to decide if a balcony is added (front edge)
          col: col,
        });
        id++;
      }
    }
  }

  // --- Floor 5: Roof with two Rooftop Suites ---
  const roofY = (5 - 1) + roomHeight / 2; // 4.5
  const suiteWidth = footprintWidth / 2; // 10/2 = 5
  const suiteDepth = footprintDepth;       // 8
  rooms.push({
    id: id,
    name: "Rooftop Suite - West Wing",
    description: "An exclusive rooftop suite in the West Wing offering breathtaking views of the LA skyline.",
    price: 1200,
    position: [ -footprintWidth / 4, roofY, 0 ],
    floor: 5,
    size: [suiteWidth, roomHeight, suiteDepth],
    unclickable: false,
  });
  id++;
  rooms.push({
    id: id,
    name: "Rooftop Suite - East Wing",
    description: "An exclusive rooftop suite in the East Wing featuring panoramic views over downtown Los Angeles.",
    price: 1200,
    position: [ footprintWidth / 4, roofY, 0 ],
    floor: 5,
    size: [suiteWidth, roomHeight, suiteDepth],
    unclickable: false,
  });
  id++;

  // --- Floor 6: Executive Penthouse Suite ---
  const extraPenthouseY = (6 - 1) + roomHeight / 2; // 5.5
  rooms.push({
    id: id,
    name: "Executive Penthouse Suite",
    description: "Experience luxury at its finest in our Executive Penthouse Suite with unmatched views of Los Angeles.",
    price: 1500,
    position: [ footprintWidth / 4, extraPenthouseY, 0 ],
    floor: 6,
    size: [suiteWidth, roomHeight, suiteDepth],
    unclickable: false,
  });
  id++;

  return rooms;
}

const rooms = generateRooms();

// --- Main Booking Component ---
function Booking() {

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const detailRefs = useRef({});
  const sidebarRef = useRef(null);
  const registerRef = (id, el) => {
    detailRefs.current[id] = el;
  };

  useEffect(() => {
    if (selectedRoomId && detailRefs.current[selectedRoomId]) {
      detailRefs.current[selectedRoomId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedRoomId]);
  
  // Find the selected room details
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);


  return (
    
    <div className="flex h-screen">
      {/* 3D Hotel View */}
      <div className="w-1/2 h-screen">
        <Canvas camera={{ position: [20, 20, 30], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          <OrbitControls target={[0, 2.5, 0]} />
          {rooms.map((room) => (
            <Room
              numMergedRows={numMergedRows}
              key={room.id}
              position={room.position}
              size={room.size}
              room={room}
              onSelect={setSelectedRoomId}
              selectedRoomId={selectedRoomId}
            />
          ))}
        </Canvas>
      </div>
      {/* Sidebar: Room Details */}
      <div
        ref={sidebarRef}
        className="w-1/2 h-screen p-4 overflow-y-auto "
      >
        {selectedRoom ? (
          <RoomDetail
            key={selectedRoom.id}
            room={selectedRoom}
            selectedRoomId={selectedRoomId}
            onSelect={setSelectedRoomId}
            containerRef={sidebarRef}
            registerRef={registerRef}
          />
        ) : (
          <p>Please click on a room in the 3D view to see its details.</p>
        )}
      </div>
    </div>
  );
}

export default Booking;
