import { Timestamp } from "firebase/firestore";

export interface Project {
	id: string;
	url: string;
	name: string;
	summary: string;
	likes: number;
	createdAt: Timestamp;
	madeUsing: string[];
}

export const exampleProject: Project = {
	id: "",
	url: "",
	name: "Dummy Project",
	summary: "Lorem ipsum",
	likes: 0,
	createdAt: new Timestamp(0, 0),
	madeUsing: [],
};
