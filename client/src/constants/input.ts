export const INPUT_VARIANT = {
  DEFAULT: 'default',
  ROUNDED: 'rounded',
  LABEL: 'label',
} as const;

export type InputVariantType = ValueOf<typeof INPUT_VARIANT>;