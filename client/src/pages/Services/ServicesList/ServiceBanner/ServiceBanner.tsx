import { ServicesBannerImg } from "../../../../assets";
import { Image, NavButton } from "../../../../components";
import { pageConfig } from "../../../../config";
import styles from "./ServiceBanner.module.css";

export const ServicesBanner = () => (
	<div className={styles.banner}>
		<div className={styles.textWrapper}>
			<h4 className={styles.title}>
				Запишитесь на приём сегодня
			</h4>
			<NavButton title="Записаться" to={pageConfig.appointment} />
		</div>
		<div className={styles.imageWrapper}>
			<Image
				className={styles.image}
				src={ServicesBannerImg}
				alt="services banner"
			/>
		</div>
	</div>
)