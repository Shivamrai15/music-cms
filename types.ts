import { History, Song } from "@prisma/client";

export type UserHistory = History & { song: Song };

export interface GenerateSyntheticDataProps {
    songName: string;
    albumName: string;
    releaseYear: number;
    artists: string[];
}


export type SyntheticDataResponse = {
    language: string,
    genre: string,
    explicit: boolean,
    director: string,
    lyricist: string,
    tempo: string,
    description: string,
    mood: string[],
    instrumentation: string[]
}