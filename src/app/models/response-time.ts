export interface ResponseTime {
  swipeUp: number;
  swipeDown: number;
  swipeSide: number;
}

export interface TrainingImagesResponse {
  imageId: string;
  time: number;
  isCorrect: boolean;
}
