import { NitroModules } from 'react-native-nitro-modules';
import type { FileBase64Native } from './FileBase64Native.nitro';

const FileBase64NativeHybridObject =
  NitroModules.createHybridObject<FileBase64Native>('FileBase64Native');

export const encodeFile = async (path: string): Promise<string> => {
  return FileBase64NativeHybridObject.encode(path);
};
