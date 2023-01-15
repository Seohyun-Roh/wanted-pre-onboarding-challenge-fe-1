export const validateEmail = (email: string) => {
  const regex = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/

  return regex.test(email)
}
