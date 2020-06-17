export enum GENDER {
  MALE = 'M',
  FEMALE = 'F',
  OTHERS = 'O',
  UNDISCLOSED = 'N/A',
}

export enum RACE {
  AMERICAN_INDIAN,
  ASIAN,
  BLACK_AFRICAN_AMERICAN,
  NATIVE_HAWAIIAN_PACIFIC_ISLANDER,
  WHITE,
}

export enum ETHNICITY {
  HISPANIC,
  NOT_HISPANIC,
}

export const AUTH_API = {
  LOGIN: '/api/user/login',
  REGISTER: '/api/user/register',
};

export const TRAINING_API = {
  GET_ONGOING_TRAINING: "/api/account/user/training/ongoing",
  START_TRAINING_SESSION: "/api/account/user/trainingSession/start",
  END_TRAINING_SESSION: "/api/account/user/trainingSession/end",
  FIND_TRAINING_BY_ID: "/api/account/trainings/{trainingId}",
  UPDATE_TRAINING_RESPONSE: "/api/account/user/trainingSession/response/{sessionId}",
  GET_QUESTIONS_BY_CATEGORY: "/api/account/questions/{questioncategory}",
  GET_IMAGES_BY_CATEGORY: "/api/account/images/sampleByCategory/{categoryId}/{type}/{count}",
  FIND_SESSION_BY_ID: "/api/account/user/trainingSession/{sessionId}"
}

export enum HTTP_RESPONSE_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export const IMAGE_INTENSITY_OPTIONS = [
  {
    viewValue: '5 - Very High',
    value: 5,
  },
  {
    viewValue: '4 - High',
    value: 4,
  },
  {
    viewValue: '3 - Normal',
    value: 3,
  },
  {
    viewValue: '2 - Low',
    value: 2,
  },
  {
    viewValue: '1 - Very Low',
    value: 1,
  },
];

export const IMAGE_TYPE_OPTIONS = [
  {
    viewValue: 'Positive',
    value: 1,
  },
  {
    viewValue: 'Neutral',
    value: 0,
  },
  {
    viewValue: 'Negative',
    value: -1,
  },
];

export const GENDER_TYPES = [
  {
    value: GENDER.UNDISCLOSED,
    viewValue: 'Do not wish to say',
  },
  {
    value: GENDER.FEMALE,
    viewValue: 'Female',
  },
  {
    value: GENDER.MALE,
    viewValue: 'Male',
  },
  {
    value: GENDER.OTHERS,
    viewValue: 'Others',
  },
];

export const RACE_TYPES = [
  {
    value: -1,
    viewValue: 'Do not wish to say',
  },
  {
    value: RACE.AMERICAN_INDIAN,
    viewValue: 'American Indian or Alaska Native',
  },
  {
    value: RACE.ASIAN,
    viewValue: 'Asian',
  },
  {
    value: RACE.BLACK_AFRICAN_AMERICAN,
    viewValue: 'Black or African American',
  },
  {
    value: RACE.NATIVE_HAWAIIAN_PACIFIC_ISLANDER,
    viewValue: 'Native Hawaiian',
  },
  {
    value: RACE.WHITE,
    viewValue: 'White',
  },
];

export const ETHNICITY_TYPES = [
  {
    value: -1,
    viewValue: 'Do not wish to say',
  },
  {
    value: ETHNICITY.HISPANIC,
    viewValue: 'Hispanic or Latino',
  },
  {
    value: ETHNICITY.NOT_HISPANIC,
    viewValue: 'Not Hispanic or Latino',
  },
];

export const DATE_PICKER_FORMAT = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const LOTTIE_ASSETS = {
  CORRECT_RESPONSE: "https://assets9.lottiefiles.com/packages/lf20_56Jc5o.json",
  INCORRECT_RESPONSE: "https://assets2.lottiefiles.com/packages/lf20_ed9D2z.json",
  NO_RESPONSE: "https://assets1.lottiefiles.com/temp/lf20_9gY9Yf.json"
}

export const WELCOME_SLIDES_COUNT = 5;

export enum SWIPE_ACTION {
  UP, DOWN, LEFT, RIGHT
}

export enum TRAINING_ACTION_TYPE {
  IMAGE,
  QUESTION,
}