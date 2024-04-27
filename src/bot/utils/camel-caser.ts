export async function snakeToCamel(str: string) {
	return str.replace(/_[a-z]/g, (match) => {
		return match[1].toUpperCase();
	});
}
