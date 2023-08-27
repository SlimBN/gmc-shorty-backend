// Define a function to create and return an error object
export const handleError = (status, message) => {
    // Create a new Error instance
    const error = new Error();
    
    // Set the status code and error message
    error.status = status;
    error.message = message;
    
    // Return the error object
    return error;
    
};
