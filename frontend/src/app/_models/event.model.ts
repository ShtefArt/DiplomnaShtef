import { Coordinate } from "./coordinate.model";

export interface Event {
    id: number;
    title: string;
    description: string;
    coordinates: Coordinate;
}