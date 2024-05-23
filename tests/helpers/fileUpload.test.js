import { fileUpload } from "../../src/helpers/fileUpload";

describe("Test on fileUpload", () => {
  test("should upload the file to clouddinary", async () => {
    const imageUrl = "https://dasacounseling.weebly.com/uploads/5/6/1/4/56149545/2263864_orig.jpg";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "image.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");
  });
});
