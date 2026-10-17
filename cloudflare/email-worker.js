// Cloudflare Email Worker for patrick@atlantawholesaleled.com
// Stores every incoming email in the Hit map inbox, then forwards it to Gmail as before.
export default {
  async email(message, env, ctx) {
    const raw = await new Response(message.raw).text();
    try {
      await fetch("https://byqzgilixiyvcxcszjrv.supabase.co/functions/v1/awl-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "inbound",
          secret: "18a081667633e3b5b6d648fa02b06c39816b4ad2d6ac6353",
          raw,
          from: message.from,
          to: message.to,
        }),
      });
    } catch (e) {
      // never block delivery if the inbox is unreachable
    }
    await message.forward("futureledsigns1810@gmail.com");
  },
};
