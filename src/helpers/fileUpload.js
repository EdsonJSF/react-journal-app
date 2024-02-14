import { cloudUrl } from "../../env";

export const fileUpload = async (file) => {
  if (!file) throw new Error("File doesn't exist");

  const formData = new FormData();
  formData.append("upload_preset", "react-journal-app");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if (!resp.ok) throw new Error("Error sending file");

    const respData = await resp.json();

    return respData.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
