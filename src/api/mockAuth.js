export const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password123") {
        resolve({ success: true, message: "Login Successful!" });
      } else {
        reject({ success: false, message: "Invalid email or password." });
      }
    }, 1000);
  });
};
