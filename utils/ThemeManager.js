export default class ThemeManager {
	constructor(namespace) {
		this.namespace = namespace
		this.getPersistTheme = this.getPersistTheme.bind(this)
		this.getInitialTheme = this.getInitialTheme.bind(this)
		this.persistTheme = this.persistTheme.bind(this)
	}

	getPersistTheme() {
		return localStorage.getItem(this.namespace)
	}

	getSystemPreference() {
		const mql = window.matchMedia('(prefers-color-scheme: dark)')
		return mql.matches ? 'dark' : 'light'
	}

	getInitialTheme() {
		const persistTheme = this.getPersistTheme()
		return persistTheme ?? this.getSystemPreference()
	}

	persistTheme(theme) {
		localStorage.setItem(this.namespace, theme)
	}
}
