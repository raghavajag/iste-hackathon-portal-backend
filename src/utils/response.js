class Response {
  constructor(message, data, status = 200) {
    this.message = message ?? "ok";
    this.data = data ?? null;
    this.status = status;
  }
}

function handleResponse(
  customResponse,
  res
) {
  const { message, data, status, success } = customResponse;

  res.status(status);

  res.message = message;

  res.json({ message, data, success: success ?? true });
}
module.exports = { Response, handleResponse };