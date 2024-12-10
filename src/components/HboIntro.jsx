import React, { useRef, useState } from "react";

const HboIntro = () => {
    const hbo = useRef(null);
    const [hboPlay, setHboPlay] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(true);
    const [isMuted, setIsMuted] = useState(true); // Controls the mute state

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

    const toggleMute = () => {
        setIsMuted((prev) => {
            // Update mute state for all audios
            Object.values(audioRefs).forEach((ref) => {
                ref.current.muted = !prev;
            });
            return !prev;
        });
    };

    const fadeAudio = (audio, type) => {
        if (!audio) return;

        let volume = type === "in" ? 0 : 1; // Start at 0 for fade-in or 1 for fade-out
        const step = 0.05; // Adjust the volume step for smooth fading
        const interval = setInterval(() => {
            if (type === "in" && volume < 1) {
                volume += step;
                audio.volume = Math.min(volume, 1); // Ensure volume doesn't exceed 1
            } else if (type === "out" && volume > 0) {
                volume -= step;
                audio.volume = Math.max(volume, 0); // Ensure volume doesn't drop below 0
            } else {
                clearInterval(interval);
                if (type === "out") audio.pause(); // Stop the audio on fade-out
            }
        }, 50); // Interval duration for fading effect
    };

    const handleHoverStart = (house) => {
        if (isMuted) return; // Do nothing if muted
        const audio = audioRefs[house]?.current;
        if (audio) {
            audio.currentTime = 0; // Restart the audio
            audio
                .play()
                .catch((err) =>
                    console.error(`Failed to play ${house} audio`, err)
                );
            fadeAudio(audio, "in");
        }
    };

    const handleHoverEnd = (house) => {
        const audio = audioRefs[house]?.current;
        if (audio) {
            fadeAudio(audio, "out");
        }
    };

    return (
        <div className="relative w-screen h-screen">
            {/* Mute/Unmute Button */}
            <button
                className={`absolute top-4 right-4 px-4 py-2 bg-black text-white rounded-full shadow-lg z-50 ${
                    isMuted ? "opacity-50" : "opacity-100"
                }`}
                onClick={toggleMute}
            >
                {isMuted ? "Unmute" : "Mute"}
            </button>

            {isVideoVisible && (
                <video
                    ref={hbo}
                    src="/clips/hbo intro hd1080p.mp4"
                    className={`w-full h-full transition-all duration-1000 ease-in-out ${
                        hboPlay
                            ? "scale-150 opacity-0"
                            : "scale-100 opacity-100"
                    }`}
                    autoPlay
                    muted
                    onEnded={() => setIsVideoVisible(false)}
                />
            )}
            {!isVideoVisible && (
                <div className="bg-pink-400 h-screen w-screen relative translate-body">
                    <img
                        src="https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg"
                        className="absolute z-0"
                        alt="Winter Background"
                    />
                    <div className="relative text-center">
                        <div className="w-fit h-fit py-3 mx-auto overflow-hidden animate-text text-nowrap">
                            <p className="text-7xl pt-5 font-black font-lovelight tracking-wider">
                                Winter is Coming...
                            </p>
                        </div>
                        <div className="flex w-full justify-around px-10 mt-10 font-got">
                            <button
                                className="hover:scale-125 pb-2 group transition-all duration-200 h-[60vh] bg-black/20 rounded-b-2xl shadow-2xl shadow-black flex flex-col items-center"
                                onMouseEnter={() => handleHoverStart("stark")}
                                onMouseLeave={() => handleHoverEnd("stark")}
                            >
                                <img
                                    className="h-[100%] group-hover:h-[80%] object-contain transition-all duration-1000"
                                    src="/images/House-Stark-Main-Shield.png"
                                    alt="House Stark Shield"
                                />
                                <div className="group-hover:opacity-100 group-hover:mt-2 -mt-2 opacity-0 duration-1000 delay-200 transition-all text-wrap w-40">
                                    "WINTER IS COMING"
                                </div>
                            </button>
                            <button
                                className="hover:scale-125 pb-2 group transition-all duration-200 h-[60vh] bg-black/20 rounded-b-2xl shadow-2xl shadow-black flex flex-col items-center"
                                onMouseEnter={() =>
                                    handleHoverStart("targaryen")
                                }
                                onMouseLeave={() => handleHoverEnd("targaryen")}
                            >
                                <img
                                    className="h-[100%] group-hover:h-[80%] object-contain transition-all duration-1000"
                                    src="/images/House-Targaryen-Main-Shield.png"
                                    alt="House Targaryen Shield"
                                />
                                <div className="group-hover:opacity-100 group-hover:mt-2 -mt-2 opacity-0 duration-1000 delay-200 transition-all text-wrap w-40">
                                    "BLOOD OF MY BLOOD"
                                </div>
                            </button>
                            <button
                                className="hover:scale-125 pb-2 group transition-all duration-200 h-[60vh] bg-black/20 rounded-b-2xl shadow-2xl shadow-black flex flex-col items-center"
                                onMouseEnter={() =>
                                    handleHoverStart("lannister")
                                }
                                onMouseLeave={() => handleHoverEnd("lannister")}
                            >
                                <img
                                    className="h-[100%] group-hover:h-[80%] object-contain transition-all duration-1000"
                                    src="/images/House-Lannister-Main-Shield.png"
                                    alt="House Lannister Shield"
                                />
                                <div className="group-hover:opacity-100 group-hover:mt-2 -mt-2 opacity-0 duration-1000 delay-200 transition-all text-wrap w-40">
                                    "A LANNISTER ALWAYS PAYS HIS DEBTS"
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HboIntro;
