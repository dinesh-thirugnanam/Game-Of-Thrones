import React from "react";
import CharacterCard from "./CharacterCard";

// Array of characters with name and description
const characters = [
    { name: "Eddard Stark", desc: "When the snows fall and the white winds blow, the lone wolf dies, but the pack survives." },
    { name: "Robb Stark", desc: "The North remembers." },
    { name: "Robb Stark", desc: "The North remembers." },
    { name: "Robb Stark", desc: "The North remembers." },
    { name: "Robb Stark", desc: "The North remembers." },
    { name: "Jon Snow", desc: "The Night is Dark and Full of Terrors." },
    // Add more characters if necessary
];

const Targaryen = () => {
    return (
        <div 
            className="bg-black w-screen min-h-screen relative" 
            style={{ backgroundImage: "url('/images/starkfamily.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Add a wrapper div to make the scrollable area function properly */}
            <div className="absolute z-10 overflow-y-auto overflow-x-hidden h-full w-full">
                {/* Map over the characters array and pass data to CharacterCard */}
                {characters.map((character, index) => (
                    <CharacterCard 
                        key={index} 
                        name={character.name} 
                        desc={character.desc} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Targaryen;
