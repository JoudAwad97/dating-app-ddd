import { ImageStatus } from './enums/image.enum';

export interface ImageProps {
  url: string;
  profileId: string;
  status: ImageStatus;
}

export interface ImageCreateProps {
  url: string;
  profileId: string;
  status: ImageStatus;
}
