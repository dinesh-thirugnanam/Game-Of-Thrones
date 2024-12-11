import React from "react";
import CharacterCard from "./CharacterCard";

// Array of characters with name and description
const characters = [
    { img: "/images/nedstark.jpg",name: "Eddard Stark", desc: "When the snows fall and the white winds blow, the lone wolf dies, but the pack survives." },
    { img: "/images/robb.jpeg",name: "Robb Stark", desc: "The North remembers." },
    { img: "/images/sansa.jpeg",name: "Robb Stark", desc: "The North remembers." },
    { img: "/images/arya.jpeg",name: "Robb Stark", desc: "The North remembers." },
    { img: "/images/bran.jpg",name: "Robb Stark", desc: "The North remembers." },
    { img: "/images/nedstark.jpg",name: "Jon Snow", desc: "The Night is Dark and Full of Terrors." },
    // Add more characters if necessary
];

const Stark = () => {
    return (
        <div 
            className="bg-white/30 w-screen h-screen relative bg-top bg-[contain] bg-no-repeat" 
            style={{ backgroundImage: "url('/images/starkfamily.jpg')" }}
        >
            {/* Add a wrapper div to make the scrollable area function properly */}
            <div className="absolute z-10 overflow-y-auto overflow-x-hidden h-full w-full">
                {/* Map over the characters array and pass data to CharacterCard */}
                {characters.map((character, index) => (
                    <CharacterCard 
                        key={index}
                        img={character.img}
                        name={character.name} 
                        desc={character.desc} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Stark;
