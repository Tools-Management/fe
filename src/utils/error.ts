// src/utils/error.ts
export class ResponseError extends Error {
    public readonly success = false;
    public readonly status: number;
    public readonly message: string;
    public readonly error?: string;
    public readonly code?: string;
  
    constructor(
      message: string,
      status: number,
      error?: string,
      code?: string
    ) {
      super(message);
      this.name = 'ResponseError';
      this.status = status;
      this.message = message;
      this.error = error;
      this.code = code;
    }
  
    toJSON() {
      return {
        success: this.success,
        message: this.message,
        ...(this.error && { error: this.error }),
        ...(this.code && { code: this.code }),
      };
    }
  }