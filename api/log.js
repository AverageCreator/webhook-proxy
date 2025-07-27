export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { content } = req.body;
  if (!content) return res.status(400).send("Missing content");

  try {
    const webhookURL = "https://discord.com/api/webhooks/1398095259790999624/cEBFYTsfDfveYVclwoq22tXCoJMie0WErkaH0vN_2DbU-JYsp3C6szzFPFPQPKKPbu6D";
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).send(`Discord error: ${err}`);
    }

    return res.status(200).send("OK");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
}
