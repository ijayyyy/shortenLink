export type UrlPayloadType = {
  originalLink: string;
  name?: string;
  customUrlCode: string;
};

export type UrlType = {
  id?: string;
  urlCode: string;
  originalLink: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
  userId: string;
  barcodeData: string;
};
