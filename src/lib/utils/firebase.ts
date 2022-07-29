import { collection, getDocs as nativeGetDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { instanceOf } from "./types";
import { type Project, exampleProject } from "../models/Project";

export const projects = getDocs<Project>({
	collectionPath: "projects",
	includeIDInData: true,
	isValid: (obj) => instanceOf(obj, exampleProject),
});

export function getDocs<T extends { [key: string | number]: any }>(
	params: GetDocsParameters,
): Promise<T[]> {
	return new Promise(async (resolve, reject) => {
		const collectionRef = collection(db, params.collectionPath);
		const snapshot = await nativeGetDocs(collectionRef);

		if (snapshot.empty) return resolve([]);

		const docs = snapshot.docs.map((doc) =>
			params.includeIDInData ? { ...doc.data(), id: doc.id } : doc.data(),
		);
		resolve(docs.filter(params.isValid) as T[]);
	});
}

export interface GetDocsParameters {
	collectionPath: string;
	isValid: (obj: any) => boolean;
	includeIDInData: boolean;
}
