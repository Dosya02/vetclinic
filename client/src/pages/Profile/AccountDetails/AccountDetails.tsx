import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./AccountDetails.module.css";
import { Heading } from "./Heading/Heading";
import { FormSection } from "./FormSection/FormSection";
import { FormDefaultDropdown, FormInput, FormPasswordInput } from "../../../components";
import { useAppSelector } from "../../../hooks";
import { Divider } from "./Divider/Divider";

const months = [
	'Январь', 'Февраль', 'Март', 'Апрель',
	'Май', 'Июнь', 'Июль', 'Август',
	'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

const getDaysInMonth = (monthIndex: number, year: number): number => {
	return new Date(year, monthIndex + 1, 0).getDate();
};

export const AccountDetails: FC = () => {
	const { userInfo } = useAppSelector(state => state.authReducer);

	const [formState, setFormState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		birthdate: {
			day: "",
			month: "",
			year: "",
		},
	});

	const [dayOptions, setDayOptions] = useState<number[]>([]);

	useEffect(() => {
		const monthIndex = months.indexOf(formState.birthdate.month);
		const parsedYear = parseInt(formState.birthdate.year);

		if (monthIndex >= 0 && !isNaN(parsedYear)) {
			const daysInMonth = getDaysInMonth(monthIndex, parsedYear);
			const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

			if (formState.birthdate.day && parseInt(formState.birthdate.day) > daysInMonth) {
				setFormState((prev) => ({
					...prev,
					birthdate: {
						...prev.birthdate,
						day: '',
					},
				}));
			}

			setDayOptions(newDays);
		} else {
			setDayOptions([]);
		}
	}, [formState.birthdate.month, formState.birthdate.year, formState.birthdate.day]);

	const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormState(prev => ({ ...prev, firstName: e.target.value }));
	}

	const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormState(prev => ({ ...prev, lastName: e.target.value }));
	}

	const handleBirthdateChange = (field: "day" | "month" | "year", value: string | number) => {
		setFormState((prev) => ({
			...prev,
			birthdate: {
				...prev.birthdate,
				[field]: String(value),
			},
		}));
	};

	return (
		<div className={styles.content}>
			<Heading />
			<FormSection
				title="Полное имя"
				subtitle="Пожалуйста, введите ваше имя и фамилию"
			>
				<div className={styles.formInputs}>
					<FormInput
						type="text"
						placeholder="Введите фамилию"
						value={formState.lastName}
						onChange={handleLastNameChange}
					/>
					<FormInput
						type="text"
						placeholder="Введите имя"
						value={formState.firstName}
						onChange={handleFirstNameChange}
					/>
				</div>
			</FormSection>
			<Divider />
			<FormSection
				title="Дата рождения"
				subtitle="Пожалуйста, введите день, месяц и год рождения"
				maxWidth={"100%"}
			>
				<div className={`${styles.formInputs} ${styles.birthdateFormInputs}`}>
					<FormDefaultDropdown
						placeholder="День"
						options={dayOptions.map(item => String(item))}
						value={formState.birthdate.day}
						onChange={(val) => handleBirthdateChange("day", val)}
					/>
					<FormDefaultDropdown
						placeholder="Месяц"
						options={months}
						value={formState.birthdate.month}
						onChange={(val) => handleBirthdateChange("month", val)}
					/>
					<FormDefaultDropdown
						placeholder="Год"
						options={years.map(item => String(item))}
						value={formState.birthdate.year}
						onChange={(val) => handleBirthdateChange("year", val)}
					/>
				</div>
			</FormSection>
			<Divider />
			<FormSection
				title="Электронная почта"
				subtitle="Это ваш зарегистрированный адрес электронной почты и пароль, если вы хотите изменить его, нажмите “Изменить”"
			>
				<div className={styles.formInputs}>
					<FormInput
						type="email"
						placeholder="Введите электронную почту"
						value={userInfo?.email || ""}
						onChange={handleLastNameChange}
						disabled
					/>
					<FormPasswordInput
						placeholder="Введите пароль"
						value={userInfo ? "********************" : formState.password}
						onChange={handleFirstNameChange}
						disabled
					/>
				</div>
			</FormSection>
		</div>
	);
}