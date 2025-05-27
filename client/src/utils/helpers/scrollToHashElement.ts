export function scrollToHashElement(hash: string | null) {
	if (!hash) return;

	const id = hash.replace("#", "");
	if (!id) return;

	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
}