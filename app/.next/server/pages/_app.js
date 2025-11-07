(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9966:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(178);
/* harmony import */ var react_icons_fc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fc__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2603);
/* harmony import */ var _context_StateContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1701);
/* harmony import */ var _context_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9822);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3590);
/* harmony import */ var _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7211);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(401);
/* harmony import */ var _utils_envConfig__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_7__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__, firebase_auth__WEBPACK_IMPORTED_MODULE_9__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_7__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__, firebase_auth__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




 // Import the Button component






function AuthWrapper() {
    const [{ user  }, dispatch] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_5__/* .useStateProvider */ .C4)(); // Make sure you also get user if needed
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isEmailValid, setIsEmailValid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const closeModal = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        dispatch({
            type: _context_constants__WEBPACK_IMPORTED_MODULE_6__/* .reducerCases.TOGGLE_LOGIN_MODAL */ .J.TOGGLE_LOGIN_MODAL,
            showLoginModal: false
        });
    }, [
        dispatch
    ]);
    // Handle body overflow
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.documentElement.style.overflowY = "hidden";
        return ()=>{
            document.documentElement.style.overflowY = "auto";
        };
    }, []);
    // Validate email on change
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }, [
        email
    ]);
    const handleGoogleAuth = async ()=>{
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_9__.GoogleAuthProvider();
            const result = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_9__.signInWithPopup)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__/* .auth */ .I8, provider);
            const firebaseUser = result.user;
            if (firebaseUser) {
                const appUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName
                };
                dispatch({
                    type: _context_constants__WEBPACK_IMPORTED_MODULE_6__/* .reducerCases.SET_USER */ .J.SET_USER,
                    user: appUser
                }); // Dispatch user to context
                react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.success("Login Successful!");
                closeModal();
                const redirectUrl = sessionStorage.getItem("redirectUrl");
                if (redirectUrl) {
                    router.push(redirectUrl);
                    sessionStorage.removeItem("redirectUrl");
                } else {
                    router.push("/");
                }
            } else {
                throw new Error("No user data received from Google sign-in");
            }
        } catch (err) {
            console.error("Google login failed:", err);
            react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(err.message || "Google Sign-in failed.");
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleEmailLinkAuth = async ()=>{
        if (isSubmitting || !isEmailValid) return;
        setIsSubmitting(true);
        try {
            const actionCodeSettings = {
                url: window.location.origin,
                handleCodeInApp: true
            };
            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_9__.sendSignInLinkToEmail)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__/* .auth */ .I8, email, actionCodeSettings);
            window.localStorage.setItem("emailForSignIn", email);
            react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.success("Magic link sent! Check your inbox.");
            setEmail(""); // Clear email after successful send
        } catch (err) {
            console.error("Email-link login failed:", err);
            react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.error(err.message || "Failed to send magic link.");
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "fixed inset-0 z-[100]",
        onClick: closeModal,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "absolute inset-0 backdrop-blur-md bg-neutral-dark/30"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "relative z-[101] flex h-full w-full items-center justify-center p-4",
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-full max-w-md rounded-lg bg-neutral-light dark:bg-neutral-dark p-6 shadow-lg",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                            className: "mb-6 text-center text-2xl font-semibold text-neutral-dark dark:text-neutral-light",
                            children: [
                                "Sign in to ",
                                _utils_envConfig__WEBPACK_IMPORTED_MODULE_10__/* .envVars.REACT_APP_NAME */ .r.REACT_APP_NAME
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: handleGoogleAuth,
                            disabled: isSubmitting,
                            className: `mb-4 flex w-full items-center justify-center gap-2 rounded-md border py-3 transition text-neutral-dark dark:text-neutral-light ${isSubmitting ? "opacity-50 cursor-not-allowed border-neutral-medium/30 dark:border-neutral-medium" : "border-neutral-medium dark:border-neutral-medium hover:bg-secondary dark:hover:bg-neutral-medium"}`,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fc__WEBPACK_IMPORTED_MODULE_2__.FcGoogle, {
                                    className: "text-2xl"
                                }),
                                isSubmitting ? "Processing..." : "Continue with Google"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative my-4 text-center text-sm text-neutral-medium dark:text-neutral-light",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "bg-neutral-light dark:bg-neutral-dark px-2 relative z-[1]",
                                    children: "OR"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "absolute inset-0 top-[50%] h-[1px] bg-neutral-medium dark:bg-neutral-medium"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "email",
                                    placeholder: "Enter your email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value.trim()),
                                    autoFocus: true,
                                    className: `w-full rounded-md border p-3 focus:outline-none bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium ${email && !isEmailValid ? "border-error focus:ring-error" : "border-neutral-medium dark:border-neutral-medium focus:ring-success"} focus:ring-2`
                                }),
                                email && !isEmailValid && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "mt-1 text-sm text-error",
                                    children: "Please enter a valid email"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common_Button__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            variant: "filled",
                            size: "lg" // Using lg for p-3, text size will be larger but consistent
                            ,
                            onClick: handleEmailLinkAuth,
                            disabled: isSubmitting || !isEmailValid,
                            className: `w-full transition text-white dark:text-white ${!(isSubmitting || !isEmailValid) && "bg-primary hover:bg-violet-700" // Apply bg colors only if not disabled
                            } ${(isSubmitting || !isEmailValid) && "bg-primary/50" // Custom disabled background
                            }`,
                            children: isSubmitting ? "Sending..." : "Send Magic Link"
                        })
                    ]
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthWrapper);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8285:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function BaseLayout({ children , className ="" , containerClass =""  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `min-h-screen bg-neutral-light dark:bg-neutral-dark pt-[80px] ${className}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: `max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`,
            children: children
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(BaseLayout));


/***/ }),

/***/ 7623:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3208);
/* harmony import */ var _context_StateContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1701);
/* harmony import */ var _utils_envConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4698);







const socialLinks = [
    {
        name: "Github",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__.FiGithub, {}),
        link: "https://www.github.com"
    },
    {
        name: "Youtube",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__.FiYoutube, {}),
        link: "https://www.youtube.com/KishanSheth21/"
    },
    {
        name: "LinkedIn",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__.FiLinkedin, {}),
        link: "https://www.linkedin.com/in/koolkishan/"
    },
    {
        name: "Instagram",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__.FiInstagram, {}),
        link: "https://instagram.com/koolkishansheth"
    },
    {
        name: "Twitter",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__.FiTwitter, {}),
        link: "https://twitter.com/koolkishansheth"
    }
];
const data = [
    {
        headerName: "About",
        links: [
            // { name: "Press & News", link: "#" },
            // { name: "Partnership", link: "#" },
            {
                name: "Privacy Policy",
                link: "/privacy-policy"
            },
            {
                name: "Terms of Service",
                link: "/terms-of-service"
            }
        ]
    }
];
function Footer() {
    const [{ isDarkMode  }] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_5__/* .useStateProvider */ .C4)();
    const logoClassName = isDarkMode ? "text-neutral-light" : "text-primary-darker";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
        className: "w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-neutral-medium/30 bg-neutral-light dark:bg-neutral-dark dark:border-neutral-medium",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "h-10 flex items-center mb-4 md:mb-0",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Logo__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        className: logoClassName
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col md:flex-row items-center text-sm",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                            href: "/privacy-policy",
                            legacyBehavior: true,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                className: "text-neutral-dark hover:text-primary dark:text-neutral-light dark:hover:text-primary hover:underline",
                                children: "Privacy Policy"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "text-neutral-medium dark:text-neutral-medium mx-2 hidden md:inline",
                            children: "\xb7"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                            href: "/terms-of-service",
                            legacyBehavior: true,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                className: "text-neutral-dark hover:text-primary dark:text-neutral-light dark:hover:text-primary hover:underline mt-1 md:mt-0 md:ml-2",
                                children: "Terms of Service"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "text-neutral-medium dark:text-neutral-medium mx-2 hidden md:inline",
                            children: "\xb7"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-neutral-medium dark:text-neutral-light mt-1 md:mt-0 md:ml-2",
                            children: [
                                "\xa9 ",
                                new Date().getFullYear(),
                                " ",
                                _utils_envConfig__WEBPACK_IMPORTED_MODULE_6__/* .envVars.REACT_APP_NAME */ .r.REACT_APP_NAME,
                                ". All rights reserved."
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(Footer));


/***/ }),

/***/ 3208:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// The `className` prop will be used to pass Tailwind text color classes (e.g., "text-accent dark:text-primary")
function BridalFlockLogo({ className ="text-accent"  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: "240",
        height: "60",
        viewBox: "0 0 240 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        preserveAspectRatio: "xMidYMid meet",
        className: className,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M30 40C30 25 50 20 60 30C70 40 65 55 50 60C35 65 30 55 30 40Z",
                stroke: "currentColor",
                strokeWidth: "2",
                fill: "none"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M45 35L50 30L55 35",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M65 45L70 40L75 45",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M50 55L55 50L60 55",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                x: "120",
                y: "40",
                fontFamily: "'Playfair Display', serif",
                fontSize: "24",
                fontWeight: "700",
                fill: "currentColor",
                textAnchor: "middle",
                children: "Bridal"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                x: "120",
                y: "60",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "24",
                fontWeight: "600",
                fill: "currentColor",
                textAnchor: "middle",
                children: "Flock"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                className: "text-neutral-medium dark:text-neutral-light",
                children: [
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                        x: "120",
                        y: "75",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "10",
                        fill: "currentColor" // Inherits from the <g> tag's text-neutral-medium
                        ,
                        letterSpacing: "1",
                        textAnchor: "middle",
                        children: "Where wedding pros take flight"
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(BridalFlockLogo));


/***/ }),

/***/ 270:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3208);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useNavigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5641);
/* harmony import */ var _context_StateContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1701);
/* harmony import */ var _context_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9822);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(401);
/* harmony import */ var _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7211);
/* harmony import */ var _AvatarImage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5352);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _DarkModeToggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(406);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_7__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__]);
([firebase_auth__WEBPACK_IMPORTED_MODULE_7__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












function Navbar({ userId , isLoading , initialAuthChecked  }) {
    const { navigate , router  } = (0,_hooks_useNavigation__WEBPACK_IMPORTED_MODULE_4__/* .useNavigation */ .H)();
    const [navFixed, setNavFixed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [{ user , isSeller , isDarkMode  }, dispatch] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_5__/* .useStateProvider */ .C4)();
    const [isContextMenuVisible, setIsContextMenuVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showMobileAccountOptions, setShowMobileAccountOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Memoize dashboard path to avoid unnecessary recalculations
    const dashboardPath = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return user ? isSeller ? "/seller" : "/buyer" : "/buyer";
    }, [
        user,
        isSeller
    ]);
    const handleLogin = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        dispatch({
            type: _context_constants__WEBPACK_IMPORTED_MODULE_6__/* .reducerCases.TOGGLE_LOGIN_MODAL */ .J.TOGGLE_LOGIN_MODAL,
            showLoginModal: true
        });
    }, [
        dispatch
    ]);
    const handleOrdersNavigate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        navigate(isSeller ? "/seller/orders" : "/buyer/orders");
        setMobileMenuOpen(false);
    }, [
        isSeller,
        navigate
    ]);
    const handleModeSwitch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        dispatch({
            type: _context_constants__WEBPACK_IMPORTED_MODULE_6__/* .reducerCases.SWITCH_MODE */ .J.SWITCH_MODE
        });
        navigate(!isSeller ? "/seller" : "/buyer");
        setMobileMenuOpen(false);
    }, [
        dispatch,
        isSeller,
        navigate
    ]);
    const handleLogout = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_7__.signOut)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_8__/* .auth */ .I8); // Firebase sign out
        dispatch({
            type: _context_constants__WEBPACK_IMPORTED_MODULE_6__/* .reducerCases.SET_USER */ .J.SET_USER,
            user: undefined
        }); // Dispatch action to update global state
        setIsContextMenuVisible(false);
        setMobileMenuOpen(false);
        setShowMobileAccountOptions(false);
        navigate("/");
    }, [
        dispatch,
        navigate
    ]);
    const handleProfile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setIsContextMenuVisible(false);
        setMobileMenuOpen(false);
        setShowMobileAccountOptions(false);
        navigate("/profile");
    }, [
        navigate
    ]);
    const toggleContextMenu = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setIsContextMenuVisible((prev)=>!prev);
    }, []);
    const toggleMobileAccountOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setShowMobileAccountOptions((prev)=>!prev);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (router.pathname === "/") {
            const handleScroll = ()=>setNavFixed(window.pageYOffset > 0);
            window.addEventListener("scroll", handleScroll);
            return ()=>window.removeEventListener("scroll", handleScroll);
        } else {
            setNavFixed(true);
        }
    }, [
        router.pathname
    ]);
    // Updated color palette classes
    const primaryBtnClass = "text-primary-darker hover:text-primary dark:text-primary dark:hover:text-primary-darker font-medium";
    const accentBtnClass = "text-accent hover:text-pink-500 dark:text-accent dark:hover:text-pink-300 font-medium"; // Assuming pink-500 and pink-300 are desired hover shades for accent
    const ctaBtnClass = "bg-primary hover:bg-primary-darker text-white dark:text-white px-4 py-2 rounded-lg dark:bg-primary-darker dark:hover:bg-primary";
    const navbarClasses = `w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 top-0 z-30 transition-all duration-300 ${navFixed || user ? "fixed bg-neutral-light border-b border-neutral-medium/30 shadow-sm dark:bg-neutral-dark dark:border-neutral-medium" // Updated navbar background and border
     : "absolute bg-neutral-light/90 backdrop-blur-sm border-transparent dark:bg-neutral-dark/90 dark:border-transparent" // Updated navbar background for transparent state
    }`;
    let logoClassName;
    if (isDarkMode) {
        logoClassName = "text-neutral-light";
    } else {
        if (navFixed || user) {
            logoClassName = "text-primary-darker";
        } else {
            logoClassName = "text-accent";
        }
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
        className: navbarClasses,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "max-w-screen-xl mx-auto flex justify-between items-center w-full",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "shrink-0",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                            href: "/",
                            "aria-label": "Home",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Logo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                className: logoClassName
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: `lg:hidden ${primaryBtnClass}`,
                        onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                        "aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
                        children: mobileMenuOpen ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_10__.FiX, {
                            size: 24
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_10__.FiMenu, {
                            size: 24
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "hidden lg:flex items-center gap-8",
                        children: isLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: `text-sm ${primaryBtnClass}`,
                            children: "Authenticating..."
                        }) : initialAuthChecked && !isLoading && !user ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: handleLogin,
                            className: ctaBtnClass,
                            children: "Sign in"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            className: "flex gap-8 items-center",
                            children: [
                                isSeller && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: ()=>navigate("/seller/services/create"),
                                        className: primaryBtnClass,
                                        children: "Create Service"
                                    })
                                }),
                                user && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: ()=>navigate(dashboardPath),
                                        className: primaryBtnClass,
                                        children: "Dashboard"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: handleOrdersNavigate,
                                        className: primaryBtnClass,
                                        children: "Orders"
                                    })
                                }),
                                user && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: ()=>navigate("/messages"),
                                        className: primaryBtnClass,
                                        children: "Messages"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: "flex items-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DarkModeToggle__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {})
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            onClick: toggleContextMenu,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_AvatarImage__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                                src: user ? user.avatar : "",
                                                email: user ? user.email : "",
                                                size: 40,
                                                borderColor: "border-accent/50 dark:border-accent" // Updated avatar border
                                            })
                                        }),
                                        isContextMenuVisible && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                            className: "absolute right-0 mt-2 bg-neutral-light border border-neutral-medium/30 rounded shadow text-sm w-40 z-50 dark:bg-neutral-dark dark:border-neutral-medium",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        onClick: handleProfile,
                                                        className: "w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left",
                                                        children: "Profile"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        onClick: handleModeSwitch,
                                                        className: "w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left",
                                                        children: isSeller ? "Switch To Buyer" : "Switch To Seller"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        onClick: handleLogout,
                                                        className: "w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left",
                                                        children: "Logout"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            mobileMenuOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "lg:hidden absolute top-full left-0 right-0 bg-neutral-light shadow border-t border-neutral-medium/30 z-40 dark:bg-neutral-dark dark:border-neutral-medium",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "px-4 py-4 space-y-3",
                    children: isLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: `block text-center text-sm ${primaryBtnClass} py-2`,
                        children: "Authenticating..."
                    }) : initialAuthChecked && !isLoading && !user ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: handleLogin,
                        className: `w-full ${ctaBtnClass}`,
                        children: "Sign in"
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            isSeller && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>{
                                    navigate("/seller/services/create");
                                    setMobileMenuOpen(false);
                                },
                                className: `w-full text-left py-2 ${primaryBtnClass}`,
                                children: "Create Service"
                            }),
                            user && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>{
                                    navigate(dashboardPath);
                                    setMobileMenuOpen(false);
                                },
                                className: `w-full text-left py-2 ${primaryBtnClass}`,
                                children: "Dashboard"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: handleOrdersNavigate,
                                className: `w-full text-left py-2 ${primaryBtnClass}`,
                                children: "Orders"
                            }),
                            user && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>{
                                    navigate("/messages");
                                    setMobileMenuOpen(false);
                                },
                                className: `w-full text-left py-2 ${primaryBtnClass}`,
                                children: "Messages"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between items-center w-full py-2 border-t border-neutral-medium/30 dark:border-neutral-medium",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: `${primaryBtnClass} text-sm`,
                                        children: isDarkMode ? "Light Mode" : "Dark Mode"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DarkModeToggle__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {})
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "border-t border-neutral-medium/30 pt-4 dark:border-neutral-medium",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: toggleMobileAccountOptions,
                                        className: "w-full flex items-center gap-3 text-left",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_AvatarImage__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                                src: user ? user.avatar : "",
                                                email: user ? user.email : "",
                                                size: 40,
                                                borderColor: "border-accent/50 dark:border-accent" // Updated avatar border
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "font-medium text-neutral-dark dark:text-neutral-light",
                                                children: "My Account"
                                            })
                                        ]
                                    }),
                                    showMobileAccountOptions && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mt-3 space-y-2 pl-12 text-sm",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: handleProfile,
                                                className: "block w-full text-left py-2 hover:text-primary dark:hover:text-primary",
                                                children: "Profile"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: handleModeSwitch,
                                                className: "block w-full text-left py-2 hover:text-primary dark:hover:text-primary",
                                                children: isSeller ? "Switch To Buyer" : "Switch To Seller"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: handleLogout,
                                                className: "block w-full text-left py-2 hover:text-primary dark:hover:text-primary",
                                                children: "Logout"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(Navbar));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5857:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3590);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8819);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7623);
/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(270);
/* harmony import */ var _components_BaseLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8285);
/* harmony import */ var _context_StateContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1701);
/* harmony import */ var _context_StateReducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3188);
/* harmony import */ var _context_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9822);
/* harmony import */ var _hooks_useNavigation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5641);
/* harmony import */ var _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7211);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(401);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9611);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(9734);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_globals_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _components_AuthWrapper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9966);
/* harmony import */ var _utils_envConfig__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(4698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_2__, _components_Navbar__WEBPACK_IMPORTED_MODULE_6__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_12__, firebase_auth__WEBPACK_IMPORTED_MODULE_13__, _utils_api__WEBPACK_IMPORTED_MODULE_14__, _components_AuthWrapper__WEBPACK_IMPORTED_MODULE_16__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_2__, _components_Navbar__WEBPACK_IMPORTED_MODULE_6__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_12__, firebase_auth__WEBPACK_IMPORTED_MODULE_13__, _utils_api__WEBPACK_IMPORTED_MODULE_14__, _components_AuthWrapper__WEBPACK_IMPORTED_MODULE_16__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






// Components



// Context



// Hooks

// Firebase



// Styles

 // Added import

function App({ Component , pageProps  }) {
    // This App component itself cannot call useStateProvider directly
    // because StateProvider is rendered *by* this component.
    // We need a new component that is a child of StateProvider to access the state.
    // Let's create a small wrapper component for the main content that can access the state.
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_StateContext__WEBPACK_IMPORTED_MODULE_8__/* .StateProvider */ .X9, {
        initialState: _context_StateReducers__WEBPACK_IMPORTED_MODULE_9__/* .initialState */ .E,
        reducer: _context_StateReducers__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AppContent, {
            Component: Component,
            pageProps: pageProps
        })
    });
}
// New wrapper component
function AppContent({ Component , pageProps  }) {
    const [{ showLoginModal  }] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_8__/* .useStateProvider */ .C4)(); // Get showLoginModal here
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthSync, {
                children: (userId, isLoading, initialAuthChecked)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Layout, {
                        userId: userId,
                        isLoading: isLoading,
                        initialAuthChecked: initialAuthChecked,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        })
                    })
            }),
            showLoginModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AuthWrapper__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, {}),
            " "
        ]
    });
}
function AuthSync({ children  }) {
    const { router , navigateToRedirect , navigateWithRedirect  } = (0,_hooks_useNavigation__WEBPACK_IMPORTED_MODULE_11__/* .useNavigation */ .H)();
    const [, dispatch] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_8__/* .useStateProvider */ .C4)();
    const [userId, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [initialAuthChecked, setInitialAuthChecked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Set persistence
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_13__.setPersistence)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_12__/* .auth */ .I8, firebase_auth__WEBPACK_IMPORTED_MODULE_13__.browserLocalPersistence).catch((err)=>{
            console.error("Could not set persistence:", err);
            react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error("Failed to initialize authentication");
        });
    }, []);
    // Handle auth state changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_13__.onAuthStateChanged)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_12__/* .auth */ .I8, async (user)=>{
            try {
                if (user) {
                    setUserId(user.uid); // Keep this
                    try {
                        // Fetch additional user profile data from Firestore
                        const profileData = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_14__/* .getUserProfile */ .et)(user.uid);
                        // Merge Firebase Auth user object with Firestore profile data
                        // Firestore data takes precedence for custom fields
                        const mergedUserObject = {
                            ...user,
                            ...profileData
                        };
                        dispatch({
                            type: _context_constants__WEBPACK_IMPORTED_MODULE_10__/* .reducerCases.SET_USER */ .J.SET_USER,
                            user: mergedUserObject
                        });
                        // If the user has no username, redirect to profile creation
                        if (!profileData.userName) {
                            router.push("/profile?new=true");
                            return;
                        }
                    } catch (error) {
                        console.error("Failed to fetch user profile data:", error);
                        // If fetching profile data fails, dispatch the basic auth user object
                        // This allows the app to function with at least the auth details.
                        dispatch({
                            type: _context_constants__WEBPACK_IMPORTED_MODULE_10__/* .reducerCases.SET_USER */ .J.SET_USER,
                            user
                        });
                    // Optionally, you could dispatch a specific error state or show a non-blocking toast
                    // toast.error("Could not load full profile information.");
                    }
                    // Keep existing redirect logic
                    navigateToRedirect();
                } else {
                    // This part remains the same
                    dispatch({
                        type: _context_constants__WEBPACK_IMPORTED_MODULE_10__/* .reducerCases.CLEAR_USER */ .J.CLEAR_USER
                    });
                    setUserId(null);
                }
            } catch (error) {
                console.error("Auth state error:", error);
                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error("Authentication error");
            } finally{
                setIsLoading(false);
                setInitialAuthChecked(true);
            }
        });
        return ()=>unsubscribe();
    }, [
        dispatch,
        router,
        navigateToRedirect
    ]);
    // Handle email link sign-in - now safe for SSR
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // Only run on client side
        if (true) return;
        const handleEmailSignIn = async ()=>{
            try {
                if ((0,firebase_auth__WEBPACK_IMPORTED_MODULE_13__.isSignInWithEmailLink)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_12__/* .auth */ .I8, window.location.href)) {
                    setIsLoading(true);
                    const storedEmail = window.localStorage.getItem("emailForSignIn");
                    if (!storedEmail) {
                        react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error("Missing email. Please try again.");
                        return;
                    }
                    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_13__.signInWithEmailLink)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_12__/* .auth */ .I8, storedEmail, window.location.href);
                    window.localStorage.removeItem("emailForSignIn");
                    react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.success("Login Successful!");
                    dispatch({
                        type: _context_constants__WEBPACK_IMPORTED_MODULE_10__/* .reducerCases.TOGGLE_LOGIN_MODAL */ .J.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false
                    });
                    navigateToRedirect("/");
                }
            } catch (err) {
                console.error("Email sign-in error:", err);
                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error("Sign-in failed. Please try again.");
            } finally{
                setIsLoading(false);
            }
        };
        handleEmailSignIn();
    }, [
        dispatch,
        navigateToRedirect
    ]); // Updated dependencies
    return children(userId, isLoading, initialAuthChecked);
}
// Define public paths outside component to avoid recreating on each render
const PUBLIC_PATHS = [
    "/terms-of-service",
    "/privacy-policy"
];
function Layout({ children , userId , isLoading , initialAuthChecked  }) {
    const { navigate , navigateWithRedirect , router  } = (0,_hooks_useNavigation__WEBPACK_IMPORTED_MODULE_11__/* .useNavigation */ .H)();
    const [{ user  }, dispatch] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_8__/* .useStateProvider */ .C4)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (true) return; // Ensure client-side only
        const pathIsProtected = !PUBLIC_PATHS.includes(router.pathname) && router.pathname !== "/";
        // if user has no username, and is not on the profile page, redirect to the profile page
        if (initialAuthChecked && !isLoading && user && !user.userName && router.pathname !== "/profile") {
            navigate("/profile?new=true");
            return;
        }
        // Redirect unauthenticated users to the root page if they are on a protected path
        if (initialAuthChecked && !isLoading && !userId && pathIsProtected) {
            navigateWithRedirect("/");
            dispatch({
                type: _context_constants__WEBPACK_IMPORTED_MODULE_10__/* .reducerCases.TOGGLE_LOGIN_MODAL */ .J.TOGGLE_LOGIN_MODAL,
                showLoginModal: true
            });
        }
    }, [
        initialAuthChecked,
        isLoading,
        userId,
        user,
        dispatch,
        navigate,
        navigateWithRedirect,
        router.pathname
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_4___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "shortcut icon",
                        href: "/favicon.ico"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: _utils_envConfig__WEBPACK_IMPORTED_MODULE_17__/* .envVars.REACT_APP_NAME */ .r.REACT_APP_NAME
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative flex flex-col min-h-screen",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Navbar__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        userId: userId,
                        isLoading: isLoading,
                        initialAuthChecked: initialAuthChecked
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                        className: "flex-1",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_BaseLayout__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                            children: children
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Footer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_2__.ToastContainer, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                toastClassName: "text-sm"
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8819:
/***/ (() => {



/***/ }),

/***/ 9734:
/***/ (() => {



/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 580:
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 178:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fc");

/***/ }),

/***/ 2750:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fi");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3745:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ 401:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ 1208:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/database");;

/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ 8937:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/functions");;

/***/ }),

/***/ 3392:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/storage");;

/***/ }),

/***/ 3590:
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ }),

/***/ 406:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DarkModeToggle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var _context_StateContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1701);
/* harmony import */ var _context_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9822);




function DarkModeToggle({ buttonId  }) {
    const [{ isDarkMode  }, dispatch] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_2__/* .useStateProvider */ .C4)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const localPreference = localStorage.getItem("darkMode");
        let isInitiallyDark;
        if (localPreference) {
            isInitiallyDark = localPreference === "true";
        } else {
            isInitiallyDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        // Dispatch SET_DARK_MODE to sync context with initial finding
        dispatch({
            type: _context_constants__WEBPACK_IMPORTED_MODULE_3__/* .reducerCases.SET_DARK_MODE */ .J.SET_DARK_MODE,
            payload: isInitiallyDark
        });
        document.documentElement.classList.toggle("dark", isInitiallyDark);
    }, [
        dispatch
    ]); // Add dispatch to dependency array
    const toggleDarkMode = ()=>{
        const newMode = !isDarkMode; // Read from context's isDarkMode
        // Dispatch TOGGLE_DARK_MODE to update context
        // The reducer will flip the boolean state.
        dispatch({
            type: _context_constants__WEBPACK_IMPORTED_MODULE_3__/* .reducerCases.TOGGLE_DARK_MODE */ .J.TOGGLE_DARK_MODE
        });
        localStorage.setItem("darkMode", newMode.toString()); // newMode is already correct
        document.documentElement.classList.toggle("dark", newMode);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        id: buttonId,
        onClick: toggleDarkMode,
        "aria-label": isDarkMode ? "Switch to light mode" : "Switch to dark mode",
        className: "p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent",
        children: isDarkMode ? "\uD83C\uDF1E" : "\uD83C\uDF19"
    });
}


/***/ }),

/***/ 3188:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ initialState),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9822);

const initialState = {
    user: undefined,
    showLoginModal: false,
    isSeller: false,
    serviceData: undefined,
    hasOrdered: false,
    reloadReviews: false,
    isDarkMode: false
};
const reducer = (state, action)=>{
    switch(action.type){
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.SET_USER */ .J.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.CLEAR_USER */ .J.CLEAR_USER:
            return {
                ...state,
                user: undefined
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.TOGGLE_LOGIN_MODAL */ .J.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: action.showLoginModal
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.CLOSE_AUTH_MODAL */ .J.CLOSE_AUTH_MODAL:
            return {
                ...state,
                showLoginModal: false
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.SWITCH_MODE */ .J.SWITCH_MODE:
            return {
                ...state,
                isSeller: !state.isSeller
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.SET_SERVICE_DATA */ .J.SET_SERVICE_DATA:
            return {
                ...state,
                serviceData: action.serviceData
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.HAS_USER_ORDERED_SERVICE */ .J.HAS_USER_ORDERED_SERVICE:
            return {
                ...state,
                hasOrdered: action.hasOrdered
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.ADD_REVIEW */ .J.ADD_REVIEW:
            return {
                ...state,
                serviceData: {
                    ...state.serviceData,
                    reviews: [
                        ...state.serviceData.reviews,
                        action.newReview
                    ]
                }
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.TOGGLE_DARK_MODE */ .J.TOGGLE_DARK_MODE:
            return {
                ...state,
                isDarkMode: !state.isDarkMode
            };
        case _constants__WEBPACK_IMPORTED_MODULE_0__/* .reducerCases.SET_DARK_MODE */ .J.SET_DARK_MODE:
            return {
                ...state,
                isDarkMode: action.payload
            };
        default:
            return state;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reducer);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [636,675,664,698,211,907,611,434,641,416], () => (__webpack_exec__(5857)));
module.exports = __webpack_exports__;

})();