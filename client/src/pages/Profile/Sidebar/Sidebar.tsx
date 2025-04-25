import { FC } from "react";
import { TabType } from "../ProfilePage";
import { SidebarItem } from "./Item/Item";
import styles from "./Sidebar.module.css";

interface SidebarItem {
	title: string
	icon: string
	tab: TabType
}

const sidebarItems: SidebarItem[] = [
	{
		title: "Личный кабинет",
		icon: "user",
		tab: "accountDetails",
	},
	{
		title: "Карта питомца",
		icon: "pet-card",
		tab: "petCards",
	},
	{
		title: "Записи",
		icon: "medical-receipt",
		tab: "appointments",
	},
]

interface Props {
	tab: TabType,
	changeTab: (tab: TabType) => void
}

export const Sidebar: FC<Props> = ({ tab, changeTab }) => (
	<aside className={styles.sidebar}>
		<ul className={styles.items}>
			{sidebarItems.map((item, index) =>
				<SidebarItem
					key={index}
					title={item.title}
					icon={item.icon}
					isActive={tab === item.tab}
					onClick={() => changeTab(item.tab)}
				/>
			)}
		</ul>
	</aside>
);
