export default function formatDuration(courseTime) {
	const mins = courseTime % 60;
	const hrs = (courseTime - mins) / 60;
	if (hrs < 10) {
		return `0${hrs}:${mins} hours`;
	}
	return `${hrs}:${mins} hours`;
}

export function retrieveAuthorNames(ids, authors) {
	return authors
		.filter((auth) => authors.contains(ids))
		.map((auth) => auth.name);
}
