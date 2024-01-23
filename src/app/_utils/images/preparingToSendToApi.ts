import { promises } from "dns";
import { compressImage, convertBlobToBase64 } from "../manipulatingImage";

export async function returnImageThatMustBeSent(img:File):Promise<string> {
    if (img instanceof File) {
      const compressedImage: any = await compressImage(img);
      const base64Image = await convertBlobToBase64(compressedImage);
      return base64Image as string;
    } else {
      return img;
    }
}