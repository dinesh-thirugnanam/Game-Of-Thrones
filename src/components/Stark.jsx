import React, { useEffect, useState, useRef } from "react";
import CharacterCard from "./CharacterCard";

const characters = [
    {
        img: "/images/starks/nedstark.png",
        name: "Eddard Stark",
        desc: "When the snows fall and the white winds blow, the lone wolf dies, but the pack survives.",
    },
    {
        img: "/images/starks/catelyn.png",
        name: "Catelyn Stark",
        desc: "Love didn’t just happen to us. We built it slowly, stone by stone, over the years.",
    },
    {
        img: "/images/starks/robb.png",
        name: "Robb Stark",
        desc: "The North remembers.",
    },
    {
        img: "/images/starks/sansa.png",
        name: "Sansa Stark",
        desc: "I am Sansa Stark of Winterfell. This is my home. And you can’t frighten me.",
    },
    {
        img: "/images/starks/arya.png",
        name: "Arya Stark",
        desc: "A girl is Arya Stark of Winterfell. And I’m going home.",
    },
    {
        img: "/images/starks/bran.png",
        name: "Bran Stark",
        desc: "I can never be Lord of Winterfell. I can never be lord of anything… I’m the Three-Eyed Raven.",
    },
    {
        img: "/images/starks/jonsnow.png",
        name: "Jon Snow",
        desc: "The more you give a king, the more he wants. A lion does not concern himself with the opinion of sheep.",
    },
];

const Stark = () => {
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
                src="/images/starkfamily.jpg"
                className="absolute w-full  opacity-30"
                style={{
                    top: `${-scrollY * 0.35}px`, // Parallax effect
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

export default Stark;
