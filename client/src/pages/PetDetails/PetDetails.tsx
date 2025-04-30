import { FC } from "react";
import { useParams } from "react-router-dom";
import { DogImg } from "../../assets";
import { BackButton } from "../../components";
import { PetAvatar } from "./PetAvatar/PetAvatar";
import { PetInfo } from "./PetInfo/PetInfo";
import { PetTypes } from "../../enums";
import { PetAppointments } from "./PetAppointments/PetAppointments";
import styles from "./PetDetails.module.css";
import { PetVaccinations } from "./PetVaccinations/PetVaccinations";

export const PetDetails: FC = () => {
	const { slugAndId } = useParams();
	const id = slugAndId?.split("-").pop();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<BackButton
					className={styles.backButton}
					to="back"
					text="Назад к питомцам"
				/>
				<PetAvatar imageUrl={DogImg} />
				<PetInfo
					name="Лайка"
					type={PetTypes.DOG}
				/>
				<div className={styles.content}>
					<PetAppointments />
					<PetVaccinations />
				</div>
			</div>
		</div>
	);
}