import { FC } from "react";
import { Container } from "../../../components";
import { ServicesIntroImg } from "../../../assets";
import styles from "./IntroSection.module.css";

export const IntroSection: FC = () => (
	<section
		className={styles.intro}
		style={{ backgroundImage: `url(${ServicesIntroImg})` }}
	>
		<Container>
			<div className={styles.content}>
				<h1 className={styles.title}>Услуги</h1>
				<p className={styles.text}>
					Мы свяжем вас с нашей компетентной командой специалистов в области здравоохранения
				</p>
			</div>
		</Container>
	</section>
)