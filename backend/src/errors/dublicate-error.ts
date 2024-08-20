class DublicateError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
  }
}

export default DublicateError;
