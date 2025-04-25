import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IntroSection } from "./Intro/IntroSection";
import { AboutSection } from "./About/AboutSection";
import { TeamSection } from "./Team/TeamSection";
import { ServicesSection } from "./Services/ServicesSection";
import { ContactsSection } from "../../components";

export const HomePage: FC = () => {
	const location = useLocation();

	useEffect(() => {
		const hash = location.state?.scrollTo;

		if (hash) {
			const element = document.getElementById(hash);
			if (element) {
				// задержка нужна, если DOM ещё не успел отрендериться
				setTimeout(() => {
					element.scrollIntoView({ behavior: "smooth" });
				}, 100);
			}
		}
	}, [location.state]);

	return (
		<>
			<IntroSection />
			<AboutSection />
			<TeamSection />
			<ServicesSection />
			<ContactsSection />
		</>
	);
}