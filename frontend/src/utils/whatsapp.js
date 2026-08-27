const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export function openWhatsApp(message) {
  if (!WHATSAPP_NUMBER) {
    console.error(
      "VITE_WHATSAPP_NUMBER is missing from your .env file."
    );
    return;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank");
}