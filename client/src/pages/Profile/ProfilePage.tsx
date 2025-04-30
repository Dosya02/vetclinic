import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Container, Section } from "../../components";
import { pageConfig } from "../../config";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import styles from "./ProfilePage.module.css";

const sidebarItems = [
	{
		title: "Личный кабинет",
		link: pageConfig.profileAccountDetails,
		icon: "user",
	},
	{
		title: "Карта питомца",
		link: pageConfig.profilePets,
		icon: "pet-card",
	},
	{
		title: "Записи",
		link: pageConfig.profileAppointments,
		icon: "medical-receipt",
	},
];

export const ProfilePage: FC = () => (
	<Section>
		<Container>
			<div className={styles.wrapper}>
				<aside className={styles.sidebar}>
					<ul className={styles.list}>
						{sidebarItems.map(item =>
							<SidebarItem key={item.link} item={item} />
						)}
					</ul>
				</aside>
				<Outlet />
			</div>
		</Container>
	</Section>
);
