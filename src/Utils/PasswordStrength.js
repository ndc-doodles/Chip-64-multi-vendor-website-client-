export const getPasswordStrength = (password) => {
  if (!password) return { label: "", score: 0 };

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) {
    return { label: "Weak", score: 1 };
  }

  if (score <= 4) {
    return { label: "Medium", score: 2 };
  }

  return { label: "Strong", score: 3 };
};