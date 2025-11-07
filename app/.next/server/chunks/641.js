"use strict";
exports.id = 641;
exports.ids = [641];
exports.modules = {

/***/ 5641:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ useNavigation)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);


/**
 * Custom hook for consistent navigation patterns across the app
 * Centralizes navigation logic and provides utility methods
 */ const useNavigation = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
    /**
   * Navigate to a new page with router.push
   * @param {string} path - The path to navigate to
   * @param {object} options - Optional Next.js router options
   */ const navigate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((path, options = {})=>{
        router.push(path, undefined, options);
    }, [
        router
    ]);
    /**
   * Replace current page in history with router.replace
   * @param {string} path - The path to navigate to
   * @param {object} options - Optional Next.js router options
   */ const replace = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((path, options = {})=>{
        router.replace(path, undefined, options);
    }, [
        router
    ]);
    /**
   * Navigate back to previous page
   */ const goBack = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        router.back();
    }, [
        router
    ]);
    /**
   * Store current path as redirect URL and navigate to destination
   * @param {string} destination - Where to redirect the user
   */ const navigateWithRedirect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((destination = "/")=>{
        if (false) {}
    }, [
        router
    ]);
    /**
   * Navigate to stored redirect URL or fallback
   * @param {string} fallback - Fallback path if no redirect URL stored
   */ const navigateToRedirect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((fallback = "/")=>{
        if (false) {}
    }, [
        router
    ]);
    return {
        navigate,
        replace,
        goBack,
        navigateWithRedirect,
        navigateToRedirect,
        router
    };
};


/***/ })

};
;