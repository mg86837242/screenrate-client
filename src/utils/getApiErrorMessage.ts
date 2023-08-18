import { isAxiosError } from 'axios';

// `axios` snippet: https://rb.gy/5pmyk (source: google "axios react typescript example") => NB there's an error in the article - in catch block, use `e.status` instead
// `isAxiosError()` snippet: https://bobbyhadz.com/blog/typescript-http-request-axios
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
