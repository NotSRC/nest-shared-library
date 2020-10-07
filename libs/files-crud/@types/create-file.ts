export interface CreateFile {
  name: string;
  size: number;
  url: string;
  mimetype: string;
  isRemoved?: boolean;
}
