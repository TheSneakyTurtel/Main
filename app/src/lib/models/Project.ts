export interface Project {
	name: string;
	likes: number;
	comments: ProjectComment[];
}

export interface ProjectComment {
	author: string;
	contents: string;
}
