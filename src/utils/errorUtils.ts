export function conflictError(message: string) {
  const error = new Error(message);
  (error as any).type = "conflict";
  return error;
}

export function notFoundError(message: string) {
  const error = new Error(message);
  (error as any).type = "not_found";
  return error;
}
