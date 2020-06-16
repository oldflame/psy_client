import { Training } from '../models/trainings';
import { IMAGE_TYPE_OPTIONS, TRAINING_ACTION_TYPE } from '../constants';
import * as _ from 'lodash';
import { TrainingStep } from '../models/training-step';
import { Image } from '../models/image';

export class TrainingsMapper {

  static mapTrainingDataForUI(training: Training): Training {
    let steps: TrainingStep[] = [];

    training.imageData.forEach((config) => {
      config.imageTypeName = this.getImageTypeNameByValue(config.imageType);
      config.actionType = TRAINING_ACTION_TYPE.IMAGE;
    });

    training.questionData.forEach(
      (config) => (config.actionType = TRAINING_ACTION_TYPE.QUESTION)
    );

    steps = _.sortBy(
      _.concat(training.imageData, training.questionData),
      (config) => parseInt(config.orderNumber, 10)
    );

    training.steps = steps;
    return training;
  }

  private static getImageTypeNameByValue(value: number): string {
    const imageType = _.find(IMAGE_TYPE_OPTIONS, { value });
    return imageType ? imageType.viewValue : "";
  }
}
