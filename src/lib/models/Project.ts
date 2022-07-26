export interface Project {
	id: string;
	name: string;
	summary: string;
	likes: number;
	tags: string[];
}

export const example: Project = {
	id: "",
	name: "Dummy Project",
	summary: "Lorem ipsum",
	likes: 0,
	tags: [],
};
