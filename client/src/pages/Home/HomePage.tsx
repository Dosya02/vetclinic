import { FC } from "react";
import { IntroSection } from "./Intro/IntroSection";
import { AboutSection } from "./About/AboutSection";
import { TeamSection } from "./Team/TeamSection";
import { ServicesSection } from "./Services/ServicesSection";

export const HomePage: FC = () => {
	return (
		<>
			<IntroSection />
			<AboutSection />
			<TeamSection />
			<ServicesSection />
		</>
	);
}