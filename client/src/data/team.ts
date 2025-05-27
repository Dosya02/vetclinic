import { DoctorModel } from '@models';
import { DoctorImg1, DoctorImg2, DoctorImg3 } from '@images';

export const team: DoctorModel[] = [
  {
    email: 'maksim.lavrov@mail.ru',
    firstName: 'Максим',
    lastName: 'Лавров',
    avatarUrl: DoctorImg1,
    position: 'Ветеринарный врач, хирург, ортопед, невролог',
  },
  {
    email: 'alla.pugacheva@mail.ru',
    firstName: 'Алла',
    lastName: 'Пугачева',
    avatarUrl: DoctorImg2,
    position: 'Ветеринарный врач, анестезиолог, онколог',
  },
  {
    email: 'anton.lvovich@mail.ru',
    firstName: 'Антон',
    lastName: 'Львович',
    avatarUrl: DoctorImg3,
    position: 'Ветеринарный врач, хирург, эктозотолог, врач интенсивной терапии',
  },
];