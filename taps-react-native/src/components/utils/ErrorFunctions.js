export const handleError = (message, setError) => {
  setError(message);
  setTimeout(() => setError(null), 3000);
}