export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/upload/image`,
    {
      method: "POST",
      headers: {
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));

    throw new Error(
      body.error || `Upload failed: ${response.status}`
    );
  }

  return response.json();
}