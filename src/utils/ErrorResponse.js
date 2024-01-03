class ErrorResponse extends Error {
  constructor(message, status, stack) {
    super();
    this.status = status ?? 500;
    this.stack = stack;

    if (process.env.NODE_ENV === "development") {
      this.message = stack
        ? String(message) + "\nStack: " + String(stack)
        : String(message);
    } else {
      if (this.stack && this.status >= 500) {
        this.stack = this.message + "\n" + this.stack;
        this.message = "Internal Server Error " + this.errorId;
      } else {
        this.message = String(message);
      }
    }
  }
}

module.exports = ErrorResponse;