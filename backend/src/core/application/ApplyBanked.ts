export function applyBank(available: number, request: number) {
  if (request <= 0) throw new Error("Amount must be > 0");
  if (request > available) throw new Error("Amount exceeds available banked");
  return request;
}
