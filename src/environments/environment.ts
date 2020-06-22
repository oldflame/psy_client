// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST: 'http://localhost:7000',
  firebase: {
    apiKey: "AIzaSyAIr6Ius7VTJoXUYSy3QsEI6uG_wADFj8I",
    authDomain: "psych-client.firebaseapp.com",
    databaseURL: "https://psych-client.firebaseio.com",
    projectId: "psych-client",
    storageBucket: "psych-client.appspot.com",
    messagingSenderId: "821531052885",
    appId: "1:821531052885:web:6e77ed0973f156c85ffddc",
    measurementId: "G-JFPNGSXZ95"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
