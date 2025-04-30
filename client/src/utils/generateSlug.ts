export function generateSlug(str: string): string {
	return str
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-а-яё]/gi, '')
		.replace(/-+/g, '-');
}