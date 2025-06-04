import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { changeName } from "@store/reducers/species";

export const useSpeciesName = () => {
	const dispatch = useAppDispatch();
	const { name, nameErrorMessage } = useAppSelector(state => state.speciesReducer);

	const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(changeName(e.target.value));
	}

	const isValidName = (): boolean => {
		return !!name.trim();
	};

	return { name, nameErrorMessage, onNameChange, isValidName };
}