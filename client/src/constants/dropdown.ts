export const DROPDOWN_VARIANT = {
  DEFAULT: 'default',
  BOLD: 'bold',
  IMAGE: 'image',
  COMPACT: 'compact',
  LABEL: 'label',
} as const;

export type DropdownVariantType = ValueOf<typeof DROPDOWN_VARIANT>;

export interface DropdownOption {
  value: string;
  label: string;
  imageUrl?: string;
}