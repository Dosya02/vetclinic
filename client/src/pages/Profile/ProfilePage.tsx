import { FC, useState } from "react";
import { Container, Section } from "../../components";
import styles from "./ProfilePage.module.css";
import { Sidebar } from "./Sidebar/Sidebar";
import { AccountDetails } from "./AccountDetails/AccountDetails";

export type TabType = "accountDetails" | "petCards" | "appointments";

export const ProfilePage: FC = () => {
	const [tab, setTab] = useState<TabType>("accountDetails");

	const changeTab = (tab: TabType) => setTab(tab);

	return (
		<Section>
			<Container>
				<div className={styles.wrapper}>
					<Sidebar tab={tab} changeTab={changeTab} />
					<div className={styles.content}>
						{tab === "accountDetails" && <AccountDetails />}
						{tab === "petCards" && <h1>Hello country!</h1>}
						{tab === "appointments" && <h1>Hello city!</h1>}
					</div>
				</div>
			</Container>
		</Section>
	);
}