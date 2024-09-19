import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/variable.config.js";

/**
 * Generates a JWT token for a user.
 * @param {Object} payload - The payload to be encoded in the token.
 * @returns {string} The generated JWT token.
 */

function generateToken(payload) {
  try {
    const token = jwt.sign({ id: payload }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
}

/**
 * Verifies a JWT token.
 * @param {string} token - The token to verify.
 * @returns {Object} The decoded payload if the token is valid.
 * @throws {Error} If the token is invalid or expired.
 */

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid or expired token");
  }
}

/**
 * Extracts the token from the authorization header.
 * @param {string} authHeader - The authorization header.
 * @returns {string|null} The extracted token or null if not found.
 */
function extractTokenFromHeader(authHeader) {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return authHeader;
}

export { extractTokenFromHeader, generateToken, verifyToken };
