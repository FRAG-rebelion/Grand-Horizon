/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

function Room({ position, size, room, onSelect, selectedRoomId ,numMergedRows}) {
    const isSelected = room.id === selectedRoomId;
    const [w, h, d] = size;

    return (
        <group
            position={position}
            onClick={(e) => {
                e.stopPropagation();
                if (!room.unclickable) onSelect(room.id);
            }}
        >
            {/* Main Room Box */}
            <mesh>
                <boxGeometry args={size} />
                <meshStandardMaterial color={isSelected ? "orange" : "lightgrey"} />
            </mesh>

            {/* Windows on Four Faces */}
            {/* Front window (assume front is +Z) */}
            <mesh position={[0, 0, d / 2 + 0.01]}>
                <planeGeometry args={[w * 0.8, h * 0.5]} />
                <meshStandardMaterial color="skyblue" opacity={0.7} transparent />
            </mesh>
            {/* Back window */}
            <mesh position={[0, 0, -d / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[w * 0.8, h * 0.5]} />
                <meshStandardMaterial color="skyblue" opacity={0.7} transparent />
            </mesh>
            {/* Left window */}
            <mesh position={[-w / 2 - 0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[d * 0.8, h * 0.5]} />
                <meshStandardMaterial color="skyblue" opacity={0.7} transparent />
            </mesh>
            
            <mesh position={[w / 2 + 0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[d * 0.8, h * 0.5]} />
                <meshStandardMaterial color="skyblue" opacity={0.7} transparent />
            </mesh>

           
            {room.row !== undefined && room.row === numMergedRows - 1 && room.floor >= 2 && room.floor <= 4 && (
                <group position={[0, -h / 2 + 0.05, d / 2 + 0.25]}>
                    {/* Balcony floor */}
                    <mesh>
                        <boxGeometry args={[w, 0.1, 0.5]} />
                        <meshStandardMaterial color="dimgray" />
                    </mesh>
                    {(() => {
                        // Define fence rail dimensions:
                        const fenceRailHeight = 0.2;
                        const fenceRailThickness = 0.05;
                        return (
                            <>
                                {/* Front rail */}
                                <mesh position={[0, 0.05 + fenceRailHeight / 2, 0.25 + fenceRailThickness / 2]}>
                                    <boxGeometry args={[w, fenceRailHeight, fenceRailThickness]} />
                                    <meshStandardMaterial color="saddlebrown" />
                                </mesh>
                                {/* Back rail */}
                                <mesh position={[0, 0.05 + fenceRailHeight / 2, -0.25 - fenceRailThickness / 2]}>
                                    <boxGeometry args={[w, fenceRailHeight, fenceRailThickness]} />
                                    <meshStandardMaterial color="saddlebrown" />
                                </mesh>
                                {/* Left rail */}
                                <mesh position={[-w / 2 - fenceRailThickness / 2, 0.05 + fenceRailHeight / 2, 0]}>
                                    <boxGeometry args={[fenceRailThickness, fenceRailHeight, 0.5]} />
                                    <meshStandardMaterial color="saddlebrown" />
                                </mesh>
                                {/* Right rail */}
                                <mesh position={[w / 2 + fenceRailThickness / 2, 0.05 + fenceRailHeight / 2, 0]}>
                                    <boxGeometry args={[fenceRailThickness, fenceRailHeight, 0.5]} />
                                    <meshStandardMaterial color="saddlebrown" />
                                </mesh>
                            </>
                        );
                    })()}
                </group>
            )}
        </group>
    );
}
export default Room