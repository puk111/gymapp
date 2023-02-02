export async function createUser(email, password, password2, name) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, password2, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "error");
  }
  return data;
}
