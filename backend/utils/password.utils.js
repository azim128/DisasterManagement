import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcryptjs.
 * @param {string} password The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} plainTextPassword The plain text password to check.
 * @param {string} hashedPassword The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */

async function verifyPassword(plainTextPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Failed to verify password");
  }
}

export { hashPassword, verifyPassword };
