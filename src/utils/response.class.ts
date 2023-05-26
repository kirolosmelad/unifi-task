import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ErrorResponse {
  private statusCode: string;
  private message: string;
  private err?: any;

  constructor(statusCode: StatusCodes, message?: string, err?: any) {
    this.statusCode = getReasonPhrase(statusCode);
    this.message = message ?? "Unable to perform this action";
    this.err = err;
  }
}

export class SuccessResponse<T = any> {
  private message: string;
  private data?: T;

  constructor(statusCode: StatusCodes, data?: T) {
    this.message = getReasonPhrase(statusCode);
    this.data = data;
  }
}
