"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import ReactPlayer from 'react-player'

import { Ad } from "@prisma/client";
import { Button } from "../ui/button";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { Slider } from "../ui/slider";

interface AdCardProps {
    ad : Ad
}

export const AdCard = ({ ad }: AdCardProps) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (value: number[]) => {
    const seekTime = (value[0] / 100) * duration;
    playerRef.current?.seekTo(seekTime);
    setCurrentTime(seekTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full p-4 bg-white shadow rounded-lg border border-t-4" style={{borderTopColor: ad.color}}>
      <div className="flex gap-4">
        <div className="relative size-24 rounded-lg overflow-hidden">
            <Image
                src={ad.image}
                alt={ad.name}
                fill
                className="object-cover"
            />
        </div>
        <div className="flex-1 space-y-4">
            <h2 className="font-semibold text-zinc-700" >{ad.name}</h2>
            <ReactPlayer
                ref={playerRef}
                url={ad.url}
                playing={playing}
                onProgress={handleProgress}
                onDuration={handleDuration}
                className="hidden sr-only"
                width="0"
                height="0"
            />
            <div className="flex items-center gap-2 py-3 rounded-lg">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-transparent"
                    onClick={handlePlayPause}
                >
                    {playing ? <FaCirclePause className="size-8 text-zinc-800" /> : <FaCirclePlay className="size-8 text-zinc-800" />}
                </Button>
                <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-gray-500 min-w-[35px]">{formatTime(currentTime)}</span>
                    <Slider
                        value={[duration ? (currentTime / duration) * 100 : 0]}
                        max={100}
                        step={1}
                        className="flex-1"
                        onValueChange={handleSeek}
                    />
                    <span className="text-xs text-gray-500 min-w-[35px]">{formatTime(duration)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}