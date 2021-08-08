export default function formatDuration(courseTime) {
	const mins = courseTime % 60;
	const hrs = (courseTime - mins) / 60;
	if (hrs < 10) {
		return `0${hrs}:${mins} hours`;
	}
	return `${hrs}:${mins} hours`;
}

export function retrieveAuthorNames(ids = [], authors) {
	return authors
		.filter((auth) => ids.includes(auth.id))
		.map((auth) => auth.name);
}

export function getCourseAuthors(allAuthors, courseAuthors) {
	return allAuthors
		.filter((author) => courseAuthors.includes(author.id))
		.map((authorObj) => authorObj.name)
		.join(', ');
}
