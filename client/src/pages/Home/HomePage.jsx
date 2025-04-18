import { useLocation } from 'react-router-dom'
import { IntroSection } from './IntroSection/IntroSection'
import { AboutSection } from './AboutSection/AboutSection'
import { TeamSection } from './TeamSection/TeamSection'
import { ServicesSection } from './ServicesSection/ServicesSection'
import { useEffect } from 'react'

export const HomePage = () => {
	const location = useLocation()

	useEffect(() => {
		const scrollTo = location.state?.scrollTo
		if (scrollTo) {
			const element = document.getElementById(scrollTo)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [location])

	return (
		<>
			<IntroSection />
			<AboutSection />
			<TeamSection />
			<ServicesSection />
		</>
	);
}