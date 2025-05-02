import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FormButton, FormImageDropdown, FormInlineDropdown, FormInput } from "../../../components";
import styles from "./AuthorizedForm.module.css";
import { IPet } from "../../../models";
import { DogImg, RabbitImg } from "../../../assets";
import { PetTypes } from "../../../enums";
import { DropdownProvider } from "../../../context";

const pets: IPet[] = [
	{
		id: "1",
		name: "Лайка",
		type: PetTypes.DOG,
		imageUrl: DogImg,
	},
	{
		id: "2",
		name: "Бэнни",
		type: PetTypes.RABBIT,
		imageUrl: RabbitImg,
	},
	{
		id: "3",
		name: "Ранго",
		type: PetTypes.LIZARD,
	},
];

const services = [
	"Вакцинация",
	"Микрочипирование",
	"Очень длинный сервис - Ультразвук",
	"Сервис 4",
];

const doctors = [
	"Лавров М.",
	"Пугачева А.",
	"Львович А.",
];

const dates = [
	"04.09.24 13:00",
	"18.12.24 16:00",
	"23.07.24 09:00",
]

export const AuthorizedForm: FC = () => {
	const [formState, setFormState] = useState<{
		pet: { name?: string; imageUrl?: string };
		service: string;
		doctor: string;
		date: string;
		comment: string;
	}>({
		pet: {},
		service: "",
		doctor: "",
		date: "",
		comment: "",
	});

	const handlePetChange = (pet: { name?: string; imageUrl?: string }) => {
		setFormState((prev) => ({ ...prev, pet }));
	};


	const handleServiceChange = (service: string) => {
		setFormState((prev) => ({ ...prev, service }));
	};

	const handleDoctorChange = (doctor: string) => {
		setFormState((prev) => ({ ...prev, doctor }));
	};

	const handleDateChange = (date: string) => {
		setFormState((prev) => ({ ...prev, date }));
	};

	const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormState((prev) => ({ ...prev, comment: e.target.value }));
	};


	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log("Форма отправлена: ", formState);
	}

	return (
		<DropdownProvider>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Записаться на прием</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.input}>
						<FormImageDropdown
							placeholder="Выберите питомца"
							options={pets.map(item => ({
								name: item.name,
								imageUrl: item.imageUrl
							}))}
							value={formState.pet}
							onChange={handlePetChange}
						/>
					</div>
					<div className={styles.input}>
						<FormInlineDropdown
							id="service"
							label="Услуга"
							placeholder="Выберите услугу"
							options={services}
							value={formState.service}
							onChange={handleServiceChange}
						/>
					</div>
					<div className={styles.input}>
						<FormInlineDropdown
							id="doctor"
							label="Врач"
							placeholder="Выберите врача"
							options={doctors}
							value={formState.doctor}
							onChange={handleDoctorChange}
						/>
					</div>
					<div className={styles.input}>
						<FormInlineDropdown
							id="date"
							label="Дата и время"
							placeholder="Выберите дату и время"
							options={dates}
							value={formState.date}
							onChange={handleDateChange}
						/>
					</div>
					<div className={styles.input}>
						<FormInput
							placeholder="Напишите свой комментарий"
							value={formState.comment}
							onChange={handleCommentChange}
							errorMessage=""
						/>
					</div>
					<FormButton text="Записаться" />
				</form>
			</div>
		</DropdownProvider>
	);
}