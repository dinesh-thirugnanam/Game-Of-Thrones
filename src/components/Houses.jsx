import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Houses = ({ isMuted }) => {
    const navigate = useNavigate();

    const audioRefs = {
        stark: useRef(
            new Audio("/audio/Game Of Thrones House Stark Theme.mp3")
        ),
        targaryen: useRef(
            new Audio("/audio/Game Of Thrones House Targaryan Theme.mp3")
        ),
        lannister: useRef(
            new Audio("/audio/Game Of Thrones House Lannister Theme.mp3")
        ),
    };

    const currentAudio = useRef(null);

    const fadeAudio = (audio, type) => {
        if (!audio) return;

        let volume = type === "in" ? 0 : audio.volume || 1;
        const step = 0.05;
        const interval = setInterval(() => {
            if (type === "in" && volume < 1) {
                volume = Math.min(volume + step, 1);
                audio.volume = volume;
            } else if (type === "out" && volume > 0) {
                volume = Math.max(volume - step, 0);
                audio.volume = volume;
            } else {
                clearInterval(interval);
                if (type === "out") audio.pause();
            }
        }, 50);
    };

    const handleHoverStart = (house) => {
        if (isMuted) return;

        const newAudio = audioRefs[house]?.current;

        if (currentAudio.current && currentAudio.current !== newAudio) {
            fadeAudio(currentAudio.current, "out"); // Fade out current audio
        }

        if (newAudio && currentAudio.current !== newAudio) {
            // newAudio.currentTime = 0; // Restart the audio
            newAudio.play().catch((err) => console.error(`Play error: ${err}`));
            fadeAudio(newAudio, "in");
            currentAudio.current = newAudio;
        }
    };

    const handleHoverEnd = (house) => {
        const audio = audioRefs[house]?.current;
        if (audio && currentAudio.current === audio) {
            fadeAudio(audio, "out");
            currentAudio.current = null;
        }
    };

    return (
        <div className="bg-[#53310b] w-screen h-screen overflow-hidden relative animate-body opacity-100 transition-all duration-1000">
            <img
                src="https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg"
                className="absolute w-full max-sm:h-screen"
                alt="Winter Background"
            />
            <div className="relative text-center">
                <div className="w-fit h-fit py-3 mx-auto overflow-hidden animate-text text-nowrap">
                    <p className="text-[10vh] pt-5 font-black font-lovelight tracking-wider">
                        Winter is Coming...
                    </p>
                </div>
                <div className="sm:flex w-full justify-around px-10 mt-10 font-got">
                    {["stark", "targaryen", "lannister"].map((house) => (
                        <button
                            key={house}
                            className="hover:scale-125 pb-2 group transition-all duration-200 h-[60vh] bg-black/20 rounded-b-2xl shadow-2xl shadow-black flex flex-col items-center"
                            onMouseEnter={() => handleHoverStart(house)}
                            onMouseLeave={() => handleHoverEnd(house)}
                            onClick={() => {
                                handleHoverEnd(house);
                                navigate(`/${house}`);
                            }}
                        >
                            <img
                                className="h-[100%] group-hover:h-[80%] object-contain transition-all duration-1000"
                                src={`/images/House-${
                                    house.charAt(0).toUpperCase() +
                                    house.slice(1)
                                }-Main-Shield.png`}
                                alt={`House ${
                                    house.charAt(0).toUpperCase() +
                                    house.slice(1)
                                } Shield`}
                            />
                            <div className="group-hover:opacity-100 group-hover:mt-2 -mt-2 opacity-0 duration-1000 delay-200 transition-all text-wrap w-40">
                                {house === "stark"
                                    ? "WINTER IS COMING"
                                    : house === "targaryen"
                                    ? "BLOOD OF MY BLOOD"
                                    : "A LANNISTER ALWAYS PAYS HIS DEBTS"}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Houses;
