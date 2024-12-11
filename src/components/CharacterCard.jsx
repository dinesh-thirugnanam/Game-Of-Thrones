import React, { useEffect, useRef, useState } from "react";

const CharacterCard = ({ img, name, desc }) => {
    const cardRef = useRef(null); // Reference to the card
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Create an intersection observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // When the card enters the viewport, trigger the animation
                } else {
                    setIsVisible(false); // When the card leaves the viewport, reset the animation
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the card is visible
        );

        // Observe the current card
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        // Cleanup observer on component unmount
        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`text-black font-got tracking-wider w-screen my-2 px-10 py-4 flex items-center odd:flex-row even:flex-row-reverse 
                ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`} // Apply the animation when visible
        >
            <img src={img} className="rounded-sm w-[40vw] h-[50vh] object-contain" alt={name} />
            <div className="text-center w-[60vw] bg-white/80 mx-5 py-6 px-4 rounded-md">
                <p className="text-xl font-semibold">{name}</p>
                <p className="font-lovelight font-bold text-black/70 text-3xl">"{desc}"</p>
            </div>
        </div>
    );
}

export default CharacterCard;
