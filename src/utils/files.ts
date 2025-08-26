import { MinifiedFile } from "./types";

export const mergeSmallImages = (imagesFiles: MinifiedFile[]): MinifiedFile[] => {
  const smallImages = imagesFiles.filter(file =>
    file.name.includes('_small_image'),
  );
  const fullImages = imagesFiles.filter(
    file => !file.name.includes('_small_image'),
  );

  const images = smallImages.map(image => {
    const fullImage = fullImages.find(fullImagefile =>
      image.name.includes(fullImagefile.name.split('.')[0]),
        );
        return {
          name: image.name,
          mediaLink: image.mediaLink,
          size: image.size,
          updated: image.updated,
          fullImageName: fullImage ? fullImage.name : null,
          fullImageLink: fullImage ? fullImage.mediaLink : null,
        };
      });
      return images;
};