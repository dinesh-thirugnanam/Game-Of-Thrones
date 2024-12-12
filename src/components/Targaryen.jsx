import React, { useEffect, useState, useRef } from "react";
import CharacterCard from "./CharacterCard";

const characters = [
    {
        img: "/images/targaryens/dany.png",
        name: "Daenerys Targaryen",
        desc: "I am the blood of the dragon. I will take what is mine with fire and blood.",
    },
    {
        img: "/images/targaryens/viserys.png",
        name: "Viserys Targaryen",
        desc: "I am the last dragon. The Iron Throne is mine by right. All the world will be mine.",
    },
    {
        img: "/images/targaryens/madAerys.png",
        name: "Aerys II Targaryen",
        desc: "Burn them all.",
    },
    {
        img: "/images/targaryens/rhaegar.png",
        name: "Rhaegar Targaryen",
        desc: "The people will sing songs about the war he fought. The prince that was promised, they will call him.",
    },
    {
        img: "/images/targaryens/aegon.png",
        name: "Aegon Targaryen (Jon Snow)",
        desc: "The North is my home, but my blood is from fire. I am Aegon Targaryen, the true heir to the throne.",
    },
];

const Targaryen = () => {
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
                src="/images/danybg.jpg"
                className="absolute w-full  opacity-20"
                style={{
                    top: `${-scrollY * 0.5 - 1200}px`, // Parallax effect
                    height: "auto",
                }}
                alt="Targaryen Family Background"
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

export default Targaryen;
