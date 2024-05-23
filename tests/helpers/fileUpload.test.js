import { v2 as cloudinary } from "cloudinary";

import { cloudinaryConfig } from "../../env";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config(cloudinaryConfig);

describe("Test on fileUpload", () => {
  test("should upload the file to clouddinary", async () => {
    const imageUrl =
      "https://dasacounseling.weebly.com/uploads/5/6/1/4/56149545/2263864_orig.jpg";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "image.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const urlSplited = url.split("/");
    const imageId = urlSplited.at(-1).split(".")[0];

    await cloudinary.api.delete_resources(["react-journal-app/" + imageId], {
      resource_type: "image",
    });
  });

  test("should return null", async () => {
    const file = new File([], "image.jpg");

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
