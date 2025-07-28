// /api/trigger.js
export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const sketch = req.body.sketch;

  const ghRes = await fetch("https://api.github.com/repos/ApplePair111/ArduinoWebIDE/actions/workflows/compile-arduino.yml/dispatches", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: "main",
      inputs: {
        sketch
      }
    })
  });

  if (ghRes.ok) {
    res.status(200).json({ ok: true });
  } else {
    const err = await ghRes.text();
    res.status(500).json({ error: err });
  }
}
