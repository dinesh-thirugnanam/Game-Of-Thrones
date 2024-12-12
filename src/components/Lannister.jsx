import React, { useEffect, useState, useRef } from "react";
import CharacterCard from "./CharacterCard";

const characters = [
    {
        img: "/images/lannisters/tywin.png",
        name: "Tywin Lannister",
        desc: "A lion does not concern itself with the opinion of sheep.",
    },
    {
        img: "/images/lannisters/cersei.png",
        name: "Cersei Lannister",
        desc: "When you play the game of thrones, you win or you die.",
    },
    {
        img: "/images/lannisters/jaime.png",
        name: "Jaime Lannister",
        desc: "The things I do for love.",
    },
    {
        img: "/images/lannisters/tyrion.png",
        name: "Tyrion Lannister",
        desc: "I drink and I know things.",
    },
    {
        img: "/images/lannisters/joffrey.png",
        name: "Joffrey Baratheon",
        desc: "I am the king! I will punish you for your insolence!",
    },
];

const Lannister = () => {
    const [scrollY, setScrollY] = useState(0);
    const scrollableRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollableRef.current) {
                setScrollY(scrollableRef.current.scrollTop);
            }
        };

        const container = scrollableRef.current;
        container?.addEventListener("scroll", handleScroll);

        return () => {
            container?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bg-black w-screen h-screen relative overflow-hidden">
            {/* Background image with dynamic positioning */}
            <img
                src="/images/lannisterfamily.jpeg"
                className="absolute w-full  opacity-30"
                style={{
                    top: `${-scrollY * 0.4 - 300}px`, // Parallax effect
                    height: "auto",
                }}
                alt="Stark Family Background"
            />
            {/* Scrollable character cards */}
            <div
                ref={scrollableRef}
                className="absolute z-10 overflow-y-visible overflow-x-hidden h-full w-full scroll-smooth"
            >
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
};

export default Lannister;
