import { type FlagShape } from '../design';

export interface Flag {
  key: string;
  name: string;
  shape: FlagShape;
  design: string;
  clrs: string[];
}
