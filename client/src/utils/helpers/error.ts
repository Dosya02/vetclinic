export const getErrorMessage = (
  err: unknown,
  fallback = 'Что-то пошло не так',
): string => {
  if (typeof err === 'string') {
    return err;
  }
  if (err instanceof Error) {
    return err.message;
  }
  if (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof (
      err as any
    ).data === 'object'
  ) {
    const data = (
      err as { data?: { message?: string } }
    ).data;
    return data?.message || fallback;
  }
  return fallback;
};