import type { HybridObject } from 'react-native-nitro-modules';

export interface FileBase64Native
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  encode(path: string): Promise<string>;
}
