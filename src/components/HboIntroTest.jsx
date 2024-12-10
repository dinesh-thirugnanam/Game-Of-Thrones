import React, { useRef, useState } from "react";

const HboIntroTest = ({ onVideoEnd }) => {
    const hbo = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [videoEnd, setVideoEnd] = useState(false);

    const toggleMute = () => {
        setIsMuted((prev) => {
            // Update mute state for all audios
            Object.values(audioRefs).forEach((ref) => {
                ref.current.muted = !prev;
            });
            return !prev;
        });
    };

    const startSequence = () => {
        setIsVideoVisible(true);
        setTimeout(() => {
            hbo.current.play();
        }, 500);
    };

    return (
        <div className="relative w-screen h-screen overflow-y-auto scroll-smooth">
            <button
                className={`absolute top-4 right-4 px-4 py-2 bg-black text-white rounded-full shadow-lg z-50 ${
                    isMuted ? "opacity-50" : "opacity-100"
                }`}
                onClick={toggleMute}
            >
                {isMuted ? "Unmute" : "Mute"}
            </button>

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
                    onEnded={() => {
                        setVideoEnd(true);
                        onVideoEnd(); // Trigger callback to parent
                    }}
                />
            )}
        </div>
    );
};

export default HboIntroTest;
