import { Timestamp } from "firebase/firestore";

export interface Project {
	id: string;
	name: string;
	summary: string;
	likes: number;
	createdAt: Timestamp;
	tags: string[];
}

export const example: Project = {
	id: "",
	name: "Dummy Project",
	summary: "Lorem ipsum",
	likes: 0,
	createdAt: new Timestamp(0, 0),
	tags: [],
};
