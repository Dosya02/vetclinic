import { FC, FormEvent } from 'react';
import { Button, Dropdown, Input, Textarea } from '@components';
import { DoctorImg1, DoctorImg2, DoctorImg3 } from '@images';

const dropdownOptions1 = [
  { name: 'Option 1' },
  { name: 'Option 2' },
  { name: 'Option 3' },
  { name: 'Option 4' },
];

const dropdownOptions2 = [
  { name: 'Option 1', imageUrl: DoctorImg1 },
  { name: 'Option 2', imageUrl: DoctorImg2 },
  { name: 'Option 3', imageUrl: DoctorImg3 },
];

const dropdownOptions3 = [
  { name: 'rus' },
  { name: 'kaz' },
  { name: 'eng' },
];

export const AnonymForm: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  
  return (
    <form
      className="c-appointment__form c-appointment__form--anonym"
      onSubmit={handleSubmit}
    >
      <Dropdown
        type="default"
        options={dropdownOptions1}
        value={{ name: '' }}
        placeholder="Тип"
      />
      <Dropdown
        type="with-image"
        options={dropdownOptions2}
        value={{ name: '' }}
        placeholder="Тип"
      />
      <Dropdown
        type="compact"
        options={dropdownOptions3}
        value={{ name: '' }}
        placeholder="Тип"
      />
      <Input
        placeholder="Введите ФИО"
        type="appointment-with-label"
        label="ФИО"
        value="Сапарбаев Жандос"
        onChange={() => {
        }}
        errorMessage=""
      />
      <Input
        placeholder="Имя питомца"
        type="appointment"
        value=""
        onChange={() => {
        }}
        errorMessage=""
      />
      <Input
        placeholder="Выберите услугу"
        type="appointment-with-label"
        label="Услуга"
        value="Врач на дом"
        onChange={() => {
        }}
        errorMessage=""
      />
      <Input
        placeholder="Введите свой адрес"
        type="appointment-with-label"
        label="Адрес"
        value=""
        onChange={() => {
        }}
        errorMessage=""
      />
      <Input
        placeholder="Выберите врача"
        type="appointment-with-label"
        label="Врач"
        value="Лавров М."
        onChange={() => {
        }}
        errorMessage=""
      />
      <Input
        placeholder="Введите ФИО"
        type="appointment-with-label"
        label="Дата и время"
        value="04.25.24 13:00"
        onChange={() => {
        }}
        errorMessage=""
      />
      <Textarea
        value=""
        onChange={() => {
        }}
        placeholder="Напишите свой комментарий"
      />
      <Button
        className="c-appointment__form-button"
        text="Записаться"
        type="submit"
      />
    </form>
  );
};