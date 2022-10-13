export const normalizeNotionCoverPath = (path) => {
	if (!path) return null
	return path.indexOf('/') === 0 ? `https://notion.so${path}` : path
}
