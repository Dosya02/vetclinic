import { IntroSection } from './IntroSection/IntroSection'
import { AboutSection } from './AboutSection/AboutSection'
import { TeamSection } from './TeamSection/TeamSection'
import { ServicesSection } from './ServicesSection/ServicesSection'

export const HomePage = () => {
	return (
		<>
			<IntroSection />
			<AboutSection />
			<TeamSection />
			<ServicesSection />
		</>
	);
}