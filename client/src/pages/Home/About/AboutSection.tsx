import { FC } from "react";
import { Container, Image, Section, Title } from "../../../components";
import { AboutImg } from "../../../assets";
import { AboutInfo } from "./Info/Info";
import { AboutFeatures } from "./Features/Features";
import styles from "./AboutSection.module.css";

export const AboutSection: FC = () => (
	<Section className={styles.about} id="about-us">
		<Container>
			<div className={styles.inner}>
				<Title
					text="Мы предоставляем лучшие услуги по уходу за домашними животными"
					align="left"
				/>
				<AboutInfo />
				<AboutFeatures />
			</div>
		</Container>

		<div className={styles.imageWrapper}>
			<Image className={styles.image} src={AboutImg} alt="О нас" />
		</div>
	</Section>
);