export async function loginApi({ email, password }) {
  const res = await fetch(
    "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, isEmployee: true }),
    }
  );
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}
