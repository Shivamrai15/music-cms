import { History, Song } from "@prisma/client";

export type UserHistory = History & { song: Song };