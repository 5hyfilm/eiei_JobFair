"use client";
import { Rating } from "@mui/material";
import VideoPlayer from "@/components/VideoPlayer";
import { useState, useCallback } from "react";
import { useWindowListener } from "@/hooks/useWindowListener";

export default function PromoteCard() {
    const [playing, setPlaying] = useState(true);
    const [rating, setRating] = useState(0);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

    // Handle pointer move, cast event to PointerEvent
    const handlePointerMove = useCallback((e: Event) => {
        const pointerEvent = e as PointerEvent;
        setPointerPosition({ x: pointerEvent.clientX, y: pointerEvent.clientY });
    }, []);

    // Prevent right-click context menu inside PromoteCard
    const preventContextMenu = useCallback((e: Event) => {
        e.preventDefault();
    }, []);

    useWindowListener("contextmenu", preventContextMenu);
    useWindowListener("pointermove", handlePointerMove);

    return (
        <div className="relative w-[80%] shadow-lg mx-[10%] my-10 p-5 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 flex flex-row transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            <VideoPlayer vdoSrc="/vdo/jobfair.mp4" isPlaying={playing} />
            <div className="m-5 flex flex-col justify-between">
                <div className="text-lg font-bold text-indigo-900 mb-4">
                    29-31 ตุลาคม 2567 ระหว่างเวลา 10.00 – 15.00 น.
                    <br />
                    สถานที่: <span className="text-red-600">❗️❗️ศาลาพระเกี้ยว ❗️❗️</span>
                </div>
                
                <button
                    className="mb-4 rounded-md bg-sky-600 hover:bg-indigo-600 px-4 py-2 text-white shadow-md transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring focus:ring-sky-400"
                    onClick={() => setPlaying(!playing)}
                >
                    {playing ? "Pause Video" : "Play Video"}
                </button>

                {/* <div className="flex items-center space-x-3">
                    <span className="text-gray-700">Rate this event:</span>
                    <Rating
                        className="text-yellow-400"
                        value={rating}
                        onChange={(e, newValue) => {
                            if (newValue != null) setRating(newValue);
                        }}
                    />
                </div> */}

                {/* <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    Pointer: X: {pointerPosition.x}, Y: {pointerPosition.y}
                </div> */}
            </div>
        </div>
    );
}
