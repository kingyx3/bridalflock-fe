"use strict";
exports.id = 416;
exports.ids = [416];
exports.modules = {

/***/ 2603:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);



const Button = ({ variant ="filled" , size ="md" , disabled =false , onClick , children , className =""  })=>{
    const baseStyles = "font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-primary-darker dark:focus:ring-primary"; // Added dark mode focus ring
    const variantStyles = {
        filled: `bg-primary-darker hover:bg-primary-darkest text-white dark:bg-primary-darker dark:hover:bg-primary-darkest dark:text-slate-800`,
        outline: `border border-primary-darker text-primary-darker hover:bg-primary-darker hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-slate-800`
    };
    const sizeStyles = {
        sm: "px-3 py-3 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-3 text-lg"
    };
    const disabledStyles = "opacity-50 cursor-not-allowed";
    const combinedClassName = [
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled ? disabledStyles : "",
        className
    ].filter(Boolean).join(" ");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        type: "button",
        className: combinedClassName,
        onClick: onClick,
        disabled: disabled,
        children: children
    });
};
Button.propTypes = {
    variant: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf([
        "filled",
        "outline"
    ]),
    size: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf([
        "sm",
        "md",
        "lg"
    ]),
    disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    onClick: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node.isRequired),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(Button));


/***/ }),

/***/ 9822:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ reducerCases)
/* harmony export */ });
const reducerCases = {
    SET_USER: "SET_USER",
    CLEAR_USER: "CLEAR_USER",
    TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
    CLOSE_AUTH_MODAL: "CLOSE_AUTH_MODAL",
    SET_SELLER: "SET_SELLER",
    SWITCH_MODE: "SWITCH_MODE",
    SET_SERVICE_DATA: "SET_SERVICE_DATA",
    HAS_USER_ORDERED_SERVICE: "HAS_USER_ORDERED_SERVICE",
    ADD_REVIEW: "ADD_REVIEW",
    TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
    SET_DARK_MODE: "SET_DARK_MODE"
};


/***/ })

};
;