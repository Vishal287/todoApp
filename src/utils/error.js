export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something want wrong",
    success = false,
    errors = [],
  ) {
    super(message),
      (this.message = message),
      (this.statusCode = statusCode),
      (this.success = success),
      (this.errors = errors);
  }
}
