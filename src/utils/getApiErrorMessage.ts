import { isAxiosError } from 'axios';

export default function getApiErrorMessage(error: unknown) {
  let errorMessage = 'An unexpected error has occurred';
  if (isAxiosError(error)) {
    errorMessage =
      error.code === 'ECONNABORTED'
        ? 'A timeout has occurred'
        : error.status === 404
        ? 'Resource not found'
        : 'An unexpected error has occurred';
  }
  return errorMessage;
}
