import cloudinary from "../lib/cloudinary.js";

export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({
      error: "Image is required",
    });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ideamerch/products",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);

    res.status(500).json({
      error: "Failed to upload image",
    });
  }
}