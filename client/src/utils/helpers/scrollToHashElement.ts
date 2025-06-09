import type { Location, NavigateFunction } from 'react-router-dom'
import { ROUTES } from '@constants'

export function scrollToHashElement(
	id: string,
	navigate: NavigateFunction,
	location: Location,
) {
	if (location.pathname !== ROUTES.HOME) {
		navigate(ROUTES.HOME, { state: { scrollToId: id } })
	} else {
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}
}