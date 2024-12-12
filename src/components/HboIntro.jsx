import React, { useRef, useState } from "react";

const HboIntro = () => {
    const [hboPlay, setHboPlay] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [videoEnd, setVideoEnd] = useState(false); // Flag to track if the video has ended

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

    const fadeAudio = (audio, type) => {
        if (!audio) return;

        let volume = type === "in" ? 0 : 1;
        const step = 0.05;
        const interval = setInterval(() => {
            if (type === "in" && volume < 1) {
                volume += step;
                audio.volume = Math.min(volume, 1);
            } else if (type === "out" && volume > 0) {
                volume -= step;
                audio.volume = Math.max(volume, 0);
            } else {
                clearInterval(interval);
                if (type === "out") audio.pause();
            }
        }, 50);
    };

    const handleHoverStart = (house) => {
        if (isMuted) return;
        const audio = audioRefs[house]?.current;
        if (audio) {
            audio.currentTime = 0;
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

    const hbo = useRef(null);

    const toggleMute = () => {
        setIsMuted((prev) => {
            const newMutedState = !prev;
            Object.values(audioRefs).forEach((ref) => {
                ref.current.muted = newMutedState;
            });
            return newMutedState;
        });
    };

    const startSequence = () => {
        setIsVideoVisible(true);
        setTimeout(() => {
            hbo.current.play();
        }, 500);
    };

    const handleVideoEnd = () => {
        setVideoEnd(true); // Set videoEnd to true when the video finishes
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

            <div
                className={`relative w-screen h-screen overflow-y-auto scroll-smooth`}
            >
                <div
                    className={`bg-white/20 z-10 size-fit transition-opacity duration-1000 ${
                        isVideoVisible ? "opacity-0" : "opacity-100"
                    } ${videoEnd ? "invisible" : "visible"}`}
                >
                    <img
                        src="\images\got-throne.jpg"
                        className="w-screen h-screen z-20 object-cover"
                        draggable="false"
                    />
                    <button
                        className="z-30 absolute bg-white/40 py-4 px-6 rounded-2xl text-xl hover:scale-110 hover:bg-white/60 active:bg-white/70 transition-all font-got bottom-1/3 right-1/2"
                        onClick={startSequence}
                    >
                        Join Us on this Journey
                    </button>
                </div>

                {isVideoVisible && !videoEnd && (
                    <video
                        id="video"
                        src="\clips\hbo intro hd1080p.mp4"
                        ref={hbo}
                        muted={isMuted}
                        className="absolute top-0 left-0 w-screen h-full object-cover transition-opacity duration-1000 opacity-0"
                        onCanPlay={() => {
                            setTimeout(() => {
                                const videoElement =
                                    document.getElementById("video");
                                videoElement.classList.remove("opacity-0");
                                videoElement.classList.add("opacity-100");
                            }, 100);
                        }}
                        onEnded={handleVideoEnd} // Use the local handler to set videoEnd to true
                    />
                )}
            </div>

            {/* Content After Video Ends */}
            {videoEnd && (
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
                            {/* House Stark Button */}
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
                            {/* House Targaryen Button */}
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
                            {/* House Lannister Button */}
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