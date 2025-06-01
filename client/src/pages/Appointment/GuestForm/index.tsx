import { FC, FormEvent } from 'react';
import { Button, Input, Textarea } from '@components';

export const GuestForm: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <form
      className="c-appointment__form c-appointment__form--guest"
      onSubmit={handleSubmit}
    >
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