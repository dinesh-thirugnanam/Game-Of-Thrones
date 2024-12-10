import React, { useState } from "react";
import HboIntroTest from "./HboIntroTest.jsx";
import Houses from "./Houses.jsx";

const Test = () => {
    const [videoEnded, setVideoEnded] = useState(false);

    const handleVideoEnd = () => {
        setVideoEnded(true); // Mark the video as ended
    };

    return (
        <div className="relative select-none">
            <HboIntroTest onVideoEnd={handleVideoEnd} />

            {/* Conditionally render Houses component after video ends */}
            {videoEnded && (
                <div className="transition-opacity duration-1000 opacity-100">
                    <Houses />
                </div>
            )}
        </div>
    );
};

export default Test;
