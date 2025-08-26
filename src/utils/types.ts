export type MinifiedFile = {
  name: string;
  mediaLink: string;
  size: string;
  updated: string;
};

export type ImageFile = MinifiedFile & {
  fullImageName: string;
  fullImageLink: string;
}