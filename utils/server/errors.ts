export class AppError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

export class UpstreamError extends AppError {
  constructor(public kind: 'auth' | 'blocked' | 'network') {
    super(kind === 'auth' ? 401 : 503, kind, kind === 'auth'
      ? 'Your Duolingo connection has expired. Connect a new token.'
      : 'Duolingo is temporarily unavailable. Please try again later.');
  }
}
