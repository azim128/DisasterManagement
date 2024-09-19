

/**
 * Sends a success response.
 * @param {object} res - The response object.
 * @param {number} [statusCode=200] - The HTTP status code (default is 200).
 * @param {object} [data={}] - The data to send in the response (default is an empty object).
 */
export const sendSuccessResponse = (res, statusCode = 200, data = {}) => {
    res.status(statusCode).json({
      success: true,
      data,
    });
  };
  
  /**
   * Sends an error response.
   * @param {object} res - The response object.
   * @param {number} [statusCode=500] - The HTTP status code (default is 500).
   * @param {string} [message='An error occurred'] - The error message (default is 'An error occurred').
   * @param {object} [errors={}] - Optional additional error details (default is an empty object).
   */
  export const sendErrorResponse = (res, statusCode = 500, message = 'An error occurred', errors = {}) => {
    res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  };
  