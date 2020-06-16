import { TRAINING_ACTION_TYPE } from '../constants';

export interface TrainingStep {
  actionType: TRAINING_ACTION_TYPE;
  category: string;
  orderNumber: number;
  duration?: number;
  imageType?: number;
  imageTypeName?: string;
  quantity?: number;
}
