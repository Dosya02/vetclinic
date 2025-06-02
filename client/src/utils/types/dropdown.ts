import { DROPDOWN_VARIANT } from '@constants';

export type DropdownVariantType = ValueOf<typeof DROPDOWN_VARIANT>;

export interface DropdownOption {
  value: string;
  label: string;
  imageUrl?: string;
}