import { FC } from "react";
import { IntroSection } from "./Intro/IntroSection";
import { ServicesListSection } from "./ServicesList/ServicesListSection";

export const ServicesPage: FC = () => (
	<>
		<IntroSection />
		<ServicesListSection />
	</>
);
