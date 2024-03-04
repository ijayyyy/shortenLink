export type UrlPayloadType = {
  originalLink: string;
  name?: string;
  userId: string;
  customUrlCode: string;
  barcodeData: string;
};

export type UrlType = {
  id?: string;
  urlCode: string;
  originalLink: string;
  visitCount: number;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  userId: string;
  customUrlCode: string;
  barcodeData: string;
};
