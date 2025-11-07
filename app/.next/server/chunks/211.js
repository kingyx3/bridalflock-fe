"use strict";
exports.id = 211;
exports.ids = [211];
exports.modules = {

/***/ 7211:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fs": () => (/* binding */ database),
/* harmony export */   "I8": () => (/* binding */ auth),
/* harmony export */   "db": () => (/* binding */ db),
/* harmony export */   "tO": () => (/* binding */ storage),
/* harmony export */   "wk": () => (/* binding */ functions)
/* harmony export */ });
/* unused harmony export app */
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3392);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1208);
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8937);
/* harmony import */ var _envConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__, firebase_database__WEBPACK_IMPORTED_MODULE_4__, firebase_functions__WEBPACK_IMPORTED_MODULE_5__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__, firebase_database__WEBPACK_IMPORTED_MODULE_4__, firebase_functions__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const firebaseConfig = {
    apiKey: _envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_FB_apiKey */ .r.REACT_APP_FB_apiKey,
    authDomain: _envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_FB_authDomain */ .r.REACT_APP_FB_authDomain,
    databaseURL: _envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_FB_databaseURL */ .r.REACT_APP_FB_databaseURL,
    projectId: _envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_FB_projectId */ .r.REACT_APP_FB_projectId,
    storageBucket: _envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_FB_storageBucket */ .r.REACT_APP_FB_storageBucket,
    messagingSenderId: _envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_FB_messagingSenderId */ .r.REACT_APP_FB_messagingSenderId,
    appId: _envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_FB_appId */ .r.REACT_APP_FB_appId
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);
const database = (0,firebase_database__WEBPACK_IMPORTED_MODULE_4__.getDatabase)(app);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);
const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage)(app);
const functions = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_5__.getFunctions)(app, "asia-southeast1");


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;