import React, { useEffect, useRef, useState } from "react";

const CharacterCard = ({ img, name, desc }) => {
    const cardRef = useRef(null); // Reference to the card
    const [isVisible, setIsVisible] = useState(false); // Visibility state

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const viewportHeight = window.innerHeight;
                    const cardRect = entry.target.getBoundingClientRect();

                    // Set animation class based on position
                    if (cardRect.top < viewportHeight / 2) {
                        setIsVisible("animate-fadeInFromTop");
                    } else {
                        setIsVisible("animate-fadeInFromBottom");
                    }
                } else {
                    setIsVisible(""); // Reset when the card leaves the viewport
                }
            },
            { threshold: 0.1 } // Trigger when 50% of the card is visible
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`text-black font-got tracking-wider group transition-all opacity-0 w-screen my-2 px-10 py-4 flex items-center odd:flex-row even:flex-row-reverse ${
                isVisible ? isVisible : "opacity-0"
            }`}
        >
            <img
                src={img}
                className="rounded-md w-[35vw] aspect-[3/2] object-cover transition-all"
                style={{
                    filter: "drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.8))",
                }}
                alt={name}
            />
            <div className="text-center w-[60vw] bg-white/80 mx-5 py-6 px-4 rounded-md shadow-lg shadow-black transition-all">
                <p className="text-2xl py-4 font-semibold">{name}<span className="italic text-md"></span></p>
                {/* <p>The imp</p> */}
                <p className="font-lovelight font-bold text-black/70 text-4xl">
                    "{desc}"
                </p>
            </div>
        </div>
    );
};

export default CharacterCard;
