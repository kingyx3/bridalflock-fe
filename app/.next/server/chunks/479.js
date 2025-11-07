exports.id = 479;
exports.ids = [479];
exports.modules = {

/***/ 9198:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3590);
/* harmony import */ var react_image_crop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2606);
/* harmony import */ var react_image_crop_dist_ReactCrop_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2782);
/* harmony import */ var react_image_crop_dist_ReactCrop_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_image_crop_dist_ReactCrop_css__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_3__, react_image_crop__WEBPACK_IMPORTED_MODULE_4__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_3__, react_image_crop__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// @ts-nocheck






function ImageUpload({ files , setFile , existingImages =[] , setExistingImages , maxFiles =5 , maxSizeMB =2  }) {
    const [crop, setCrop] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    const [imgSrc, setImgSrc] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [currentFileForCrop, setCurrentFileForCrop] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [showCropper, setShowCropper] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const currentTotalImages = (existingImages?.length || 0) + (files?.length || 0);
    const handleFile = (e)=>{
        const selectedFilesInput = Array.from(e.target.files);
        const validImageTypes = [
            "image/gif",
            "image/jpeg",
            "image/png"
        ];
        if (selectedFilesInput.length === 0) {
            return;
        }
        // If already cropping, prevent adding more files until current crop is handled
        if (showCropper) {
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info("Please confirm or cancel the current crop before adding more images.");
            e.target.value = null; // Reset file input
            return;
        }
        // If max total images already met (considering files passed from parent and existing ones)
        if (currentTotalImages >= maxFiles) {
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(`You can upload a maximum of ${maxFiles} images.`);
            e.target.value = null;
            return;
        }
        // Handle single file for cropping
        if (selectedFilesInput.length === 1) {
            const file = selectedFilesInput[0];
            if (!validImageTypes.includes(file.type)) {
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(`${file.name} is not a supported image type.`);
                e.target.value = null;
                return;
            }
            const sizeInMB = file.size / (1024 * 1024);
            if (sizeInMB > maxSizeMB) {
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(`${file.name} exceeds ${maxSizeMB}MB limit.`);
                e.target.value = null;
                return;
            }
            // Check if adding this one file would exceed total max
            if (currentTotalImages + 1 > maxFiles) {
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(`Adding this image would exceed the maximum of ${maxFiles} images.`);
                e.target.value = null;
                return;
            }
            setCurrentFileForCrop(file);
            const reader = new FileReader();
            reader.addEventListener("load", ()=>{
                setImgSrc(reader.result?.toString() || "");
                setShowCropper(true);
                setCrop(undefined); // Reset crop for new image
            });
            reader.readAsDataURL(file);
            // Don't reset e.target.value here, it will be reset after crop handling
            return; // Return early to show cropper
        }
        // Handle multiple files (no cropping, direct add)
        const filteredFiles = [];
        let newFilesCount = files?.length || 0; // Current count of files already staged by parent
        for (let file of selectedFilesInput){
            if ((existingImages?.length || 0) + newFilesCount >= maxFiles) {
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.warn(`Cannot add ${file.name}. Maximum of ${maxFiles} images reached.`);
                break;
            }
            if (!validImageTypes.includes(file.type)) {
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(`${file.name} is not a supported image type.`);
                continue;
            }
            const sizeInMB = file.size / (1024 * 1024);
            if (sizeInMB > maxSizeMB) {
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(`${file.name} exceeds ${maxSizeMB}MB limit.`);
                continue;
            }
            filteredFiles.push(file);
            newFilesCount++;
        }
        if (filteredFiles.length > 0) {
            const totalAfterAddingNew = (existingImages?.length || 0) + (files?.length || 0) + filteredFiles.length;
            if (totalAfterAddingNew > maxFiles) {
                const canAddCount = maxFiles - ((existingImages?.length || 0) + (files?.length || 0));
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.warn(`You can only add ${canAddCount} more image(s). Some files were not added.`);
                setFile([
                    ...files || [],
                    ...filteredFiles.slice(0, canAddCount)
                ]);
            } else {
                setFile([
                    ...files || [],
                    ...filteredFiles
                ]);
            }
        }
        e.target.value = null; // Reset file input for multiple files or if no single file was set for crop
    };
    const removeNewImage = (fileName)=>{
        setFile(files.filter((file)=>file.name !== fileName));
    };
    const removeExistingImage = (imageUrl)=>{
        if (typeof setExistingImages === "function") {
            setExistingImages(imageUrl);
        }
    };
    const onImageLoad = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((e)=>{
        const { width , height  } = e.currentTarget;
        if (width === 0 || height === 0) return; // Prevent error with empty image
        const newCrop = (0,react_image_crop__WEBPACK_IMPORTED_MODULE_4__.centerCrop)((0,react_image_crop__WEBPACK_IMPORTED_MODULE_4__.makeAspectCrop)({
            unit: "%",
            width: 90
        }, 1, width, height), width, height);
        setCrop(newCrop);
    }, []);
    const handleCropConfirm = async ()=>{
        if (crop && currentFileForCrop && imgSrc && crop.width && crop.height) {
            try {
                const croppedImageBlob = await getCroppedImg(imgSrc, crop, currentFileForCrop.name);
                const croppedFile = new File([
                    croppedImageBlob
                ], currentFileForCrop.name, {
                    type: croppedImageBlob.type,
                    lastModified: Date.now()
                });
                // Add the new cropped file to the parent's state
                setFile([
                    ...files || [],
                    croppedFile
                ]);
                // Reset cropper states
                setShowCropper(false);
                setImgSrc("");
                setCurrentFileForCrop(null);
                setCrop(undefined);
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(`"${croppedFile.name}" cropped and added.`);
            } catch (e) {
                console.error("Cropping error:", e);
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Error cropping image. Please try again.");
                // Optionally, reset cropper on error too
                setShowCropper(false);
                setImgSrc("");
                setCurrentFileForCrop(null);
                setCrop(undefined);
            }
        } else {
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.warn("Crop selection is not valid.");
        }
        // Reset file input to allow selecting the same file again
        const fileInput = document.querySelector('input[type="file"][name="files[]"]');
        if (fileInput) fileInput.value = null;
    };
    const handleCropCancel = ()=>{
        setShowCropper(false);
        setImgSrc("");
        setCurrentFileForCrop(null);
        setCrop(undefined);
        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info("Image cropping cancelled.");
        // Reset file input
        const fileInput = document.querySelector('input[type="file"][name="files[]"]');
        if (fileInput) fileInput.value = null;
    };
    // Utility function to get cropped image (must be defined within component or imported)
    async function getCroppedImg(imageSrc, pixelCrop, fileName) {
        return new Promise((resolve, reject)=>{
            const image = document.createElement("img"); // Use document.createElement
            image.src = imageSrc;
            image.onload = ()=>{
                const canvas = document.createElement("canvas");
                // Ensure the image has loaded and has dimensions
                if (image.naturalWidth === 0 || image.naturalHeight === 0 || !image.width || !image.height) {
                    return reject(new Error("Image has no dimensions or has not loaded properly."));
                }
                // Handle potential issues if pixelCrop dimensions are not set (though ReactCrop usually does)
                if (!pixelCrop || typeof pixelCrop.width !== "number" || typeof pixelCrop.height !== "number" || typeof pixelCrop.x !== "number" || typeof pixelCrop.y !== "number") {
                    return reject(new Error("Invalid crop dimensions."));
                }
                // Scale crop coordinates to natural image size
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                canvas.width = Math.floor(pixelCrop.width * scaleX);
                canvas.height = Math.floor(pixelCrop.height * scaleY);
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    return reject(new Error("Failed to get 2D context from canvas."));
                }
                ctx.drawImage(image, pixelCrop.x * scaleX, pixelCrop.y * scaleY, pixelCrop.width * scaleX, pixelCrop.height * scaleY, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob)=>{
                    if (!blob) {
                        return reject(new Error("Canvas to Blob conversion failed."));
                    }
                    // The 'name' property is not standard on Blob. File object is created later.
                    resolve(blob);
                }, "image/jpeg", 0.9); // Adjust type and quality as needed
            };
            image.onerror = (error)=>{
                console.error("Image load error for cropping:", error);
                reject(new Error("Image failed to load for cropping."));
            };
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            showCropper && imgSrc && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-xl w-full",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-200",
                            children: "Crop Image"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                width: "100%",
                                maxHeight: "60vh",
                                overflow: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_image_crop__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                crop: crop,
                                onChange: (_, percentCrop)=>setCrop(percentCrop),
                                onComplete: (c)=>setCrop(c),
                                aspect: 1,
                                minWidth: 100,
                                minHeight: 100,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: imgSrc,
                                    onLoad: onImageLoad,
                                    alt: "Crop preview",
                                    style: {
                                        display: "block",
                                        maxHeight: "55vh",
                                        maxWidth: "100%",
                                        objectFit: "contain"
                                    }
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex justify-center gap-4 mt-6",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "button",
                                    onClick: handleCropConfirm,
                                    className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium",
                                    children: "Confirm Crop"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "button",
                                    onClick: handleCropCancel,
                                    className: "px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500",
                                    children: "Cancel"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `flex items-center px-3 ${showCropper ? "hidden" : ""}`,
                children: [
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "rounded-lg bg-gray-50 dark:bg-slate-800 w-full",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "m-4",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "flex items-center justify-center w-full",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                        className: `flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed border-gray-300 dark:border-gray-600 ${currentTotalImages >= maxFiles ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"}`,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex flex-col items-center justify-center pt-7",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        className: "w-12 h-12 text-gray-400 dark:text-neutral-light group-hover:text-gray-500 dark:group-hover:text-gray-300",
                                                        viewBox: "0 0 20 20",
                                                        fill: "currentColor",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                            fillRule: "evenodd",
                                                            d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",
                                                            clipRule: "evenodd"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: "pt-1 text-sm tracking-wider text-gray-400 dark:text-neutral-light group-hover:text-gray-500 dark:group-hover:text-gray-300",
                                                        children: currentTotalImages >= maxFiles ? "Max images reached" : files?.length > 0 ? "Add more photos" : "Select a photo (or more)"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "file",
                                                onChange: handleFile,
                                                className: "opacity-0",
                                                multiple: true,
                                                name: "files[]" // Ensure this name is unique or handled if multiple inputs exist
                                                ,
                                                accept: "image/png, image/jpeg, image/gif",
                                                disabled: currentTotalImages >= maxFiles || showCropper
                                            })
                                        ]
                                    })
                                }),
                                existingImages && existingImages.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-4",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1",
                                            children: "Current Images:"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: existingImages.map((url, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "overflow-hidden relative group",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "button",
                                                            onClick: ()=>removeExistingImage(url),
                                                            className: "absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600",
                                                            "aria-label": "Remove existing image",
                                                            children: "✕"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "relative h-20 w-20 rounded-md border border-gray-200 dark:border-gray-600",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                                src: url,
                                                                layout: "fill",
                                                                alt: "Existing Service Image",
                                                                className: "object-cover rounded-md"
                                                            })
                                                        })
                                                    ]
                                                }, `existing-${idx}`))
                                        })
                                    ]
                                }),
                                files && files.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-4",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1",
                                            children: "New Images to Upload:"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: files.map((file, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "overflow-hidden relative group",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "button",
                                                            onClick: ()=>removeNewImage(file.name),
                                                            className: "absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600",
                                                            "aria-label": "Remove new image",
                                                            children: "✕"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "relative h-20 w-20 rounded-md border border-gray-200 dark:border-gray-600",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                                src: URL.createObjectURL(file),
                                                                layout: "fill",
                                                                alt: "New Service Image",
                                                                className: "object-cover rounded-md"
                                                            })
                                                        })
                                                    ]
                                                }, `new-${idx}`))
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-sm text-gray-500 dark:text-neutral-light mt-2 text-center",
                                    children: [
                                        currentTotalImages,
                                        "/",
                                        maxFiles,
                                        " images"
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageUpload);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4507:
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
/* harmony import */ var _ImageUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9198);
/* harmony import */ var _utils_categories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7599);
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9611);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3590);
/* harmony import */ var _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3073);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ImageUpload__WEBPACK_IMPORTED_MODULE_2__, _utils_api_js__WEBPACK_IMPORTED_MODULE_4__, react_toastify__WEBPACK_IMPORTED_MODULE_5__]);
([_ImageUpload__WEBPACK_IMPORTED_MODULE_2__, _utils_api_js__WEBPACK_IMPORTED_MODULE_4__, react_toastify__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


 // Assuming ImageUpload handles new files and displays existing ones

 // For uploading new images


const inputClasses = "w-full px-4 py-3 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium focus:ring-primary focus:border-primary";
// Helper to get only the common field definitions that are not category or description (handled separately)
const otherCommonFields = _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .commonFields.filter */ .fo.filter((f)=>f.name !== "category" && f.name !== "description" && f.name !== "title");
const RenderField = ({ field , value , onChange , onDynamicChange , error  })=>{
    const { name , label , type , required , placeholder , options , helpText , ...props } = field; // Added ...props
    const fieldSpecificInputClasses = `${inputClasses} ${error ? "border-error" : ""}`;
    switch(type){
        case "text":
        case "number":
        case "integer":
        case "date":
            // Determine input type attribute and inputMode for numeric fields
            let inputTypeAttr = type;
            let inputModeAttr = props.inputMode; // Use existing inputMode if passed via props
            if (type === "integer") {
                inputTypeAttr = "text"; // Use text for better control with onKeyDown
                inputModeAttr = "numeric";
            } else if (type === "number") {
                inputTypeAttr = "text"; // Use text for better control with onKeyDown
                inputModeAttr = "decimal";
            }
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        htmlFor: name,
                        className: "block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light",
                        children: [
                            label,
                            required && "*"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: inputTypeAttr,
                        inputMode: inputModeAttr,
                        id: name,
                        name: name,
                        value: value || "",
                        onChange: onDynamicChange ? (e)=>onDynamicChange(name, e.target.value) : onChange,
                        onKeyDown: (e)=>{
                            if (type === "integer") {
                                if (!(e.key >= "0" && e.key <= "9" || e.key === "Backspace" || e.key === "Delete" || e.key === "Tab" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter" || e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                }
                            } else if (type === "number") {
                                // Allow numbers, one decimal point, backspace, delete, tab, arrows, enter
                                // Prevent 'e', 'E', '+', '-'
                                if ([
                                    "e",
                                    "E",
                                    "+",
                                    "-"
                                ].includes(e.key) || e.key === "." && (value || "").toString().includes(".")) {
                                    e.preventDefault();
                                } else if (!(e.key >= "0" && e.key <= "9" || e.key === "." || e.key === "Backspace" || e.key === "Delete" || e.key === "Tab" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter" || e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                }
                            }
                        },
                        placeholder: placeholder,
                        required: required,
                        className: fieldSpecificInputClasses,
                        ...props
                    }),
                    helpText && !error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-1 text-xs text-neutral-medium dark:text-neutral-light",
                        children: helpText
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-error text-xs mt-1",
                        children: error
                    })
                ]
            });
        case "textarea":
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        htmlFor: name,
                        className: "block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light",
                        children: [
                            label,
                            required && "*"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                        id: name,
                        name: name,
                        value: value || "",
                        onChange: onDynamicChange ? (e)=>onDynamicChange(name, e.target.value) : onChange,
                        placeholder: placeholder,
                        required: required,
                        rows: 4,
                        className: fieldSpecificInputClasses,
                        ...props
                    }),
                    helpText && !error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-1 text-xs text-neutral-medium dark:text-neutral-medium",
                        children: helpText
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-error text-xs mt-1",
                        children: error
                    })
                ]
            });
        case "select":
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        htmlFor: name,
                        className: "block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light",
                        children: [
                            label,
                            required && "*"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                        id: name,
                        name: name,
                        value: value || "",
                        onChange: onDynamicChange ? (e)=>onDynamicChange(name, e.target.value) : onChange,
                        required: required,
                        className: fieldSpecificInputClasses,
                        ...props,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                                value: "",
                                children: [
                                    "Select ",
                                    label.toLowerCase()
                                ]
                            }),
                            options?.map((opt)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                    value: opt.value,
                                    children: opt.label
                                }, opt.value))
                        ]
                    }),
                    helpText && !error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-1 text-xs text-neutral-medium dark:text-neutral-light",
                        children: helpText
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-error text-xs mt-1",
                        children: error
                    })
                ]
            });
        case "multi-select":
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: "block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light",
                        children: [
                            label,
                            required && "*"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `space-y-2 mt-2 p-2 rounded-md ${error ? "border border-error" : ""}`,
                        children: options?.map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                className: "flex items-center text-neutral-dark dark:text-neutral-light",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "checkbox",
                                        name: name,
                                        value: opt.value,
                                        checked: Array.isArray(value) && value.includes(opt.value),
                                        onChange: (e)=>{
                                            const currentValues = Array.isArray(value) ? [
                                                ...value
                                            ] : [];
                                            if (e.target.checked) {
                                                currentValues.push(opt.value);
                                            } else {
                                                const index = currentValues.indexOf(opt.value);
                                                if (index > -1) currentValues.splice(index, 1);
                                            }
                                            if (onDynamicChange) onDynamicChange(name, currentValues);
                                        },
                                        className: "h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2"
                                    }),
                                    opt.label
                                ]
                            }, opt.value))
                    }),
                    helpText && !error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-1 text-xs text-neutral-medium dark:text-neutral-light",
                        children: helpText
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-error text-xs mt-1",
                        children: error
                    })
                ]
            });
        case "toggle":
            // Assuming 'value' will be 'yes' or 'no'. Convert to boolean for the switch.
            const isChecked = value === "yes";
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        htmlFor: name,
                        className: "block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light",
                        children: [
                            label,
                            required && "*"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: "relative inline-flex items-center cursor-pointer",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "checkbox",
                                id: name,
                                name: name,
                                checked: isChecked,
                                onChange: (e)=>{
                                    // Convert boolean back to 'yes'/'no' string for onDynamicChange
                                    const stringValue = e.target.checked ? "yes" : "no";
                                    if (onDynamicChange) {
                                        onDynamicChange(name, stringValue);
                                    } else if (onChange) {
                                        const event = {
                                            target: {
                                                name,
                                                value: stringValue
                                            }
                                        };
                                        onChange(event);
                                    }
                                },
                                className: "sr-only peer" // Hide default checkbox
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: `w-11 h-6 bg-neutral-medium/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light dark:peer-focus:ring-accent rounded-full peer dark:bg-neutral-medium dark:border dark:border-neutral-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-medium/50 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${error ? "ring-2 ring-error" : ""}`
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "ml-3 text-sm font-medium text-neutral-dark dark:text-neutral-light",
                                children: isChecked ? "Yes" : "No"
                            })
                        ]
                    }),
                    helpText && !error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-1 text-xs text-neutral-medium dark:text-neutral-light",
                        children: helpText
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-error text-xs mt-1",
                        children: error
                    })
                ]
            });
        case "boolean":
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center mt-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "checkbox",
                        id: name,
                        name: name,
                        checked: !!value,
                        onChange: onDynamicChange ? (e)=>onDynamicChange(name, e.target.checked) : (e)=>onChange({
                                target: {
                                    name,
                                    value: e.target.checked
                                }
                            }),
                        className: "h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        htmlFor: name,
                        className: "text-sm font-medium text-neutral-dark dark:text-neutral-light",
                        children: label
                    }),
                    helpText && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "ml-2 text-xs text-neutral-medium dark:text-neutral-light",
                        children: helpText
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-error text-xs mt-1",
                        children: error
                    })
                ]
            });
        default:
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                children: [
                    "Unsupported field type: ",
                    type
                ]
            });
    }
};
const MultiStepServiceForm = (props)=>{
    // Destructure props, providing defaults for those not passed in create mode
    const { initialData ={} , onSubmit , isEditMode =false , // existingImageUrls = [], // This prop is no longer needed
    serviceId =null , user =null , setParentLoading =()=>{}  } = props;
    const [currentStep, setCurrentStep] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const totalSteps = 5; // Assuming 5 steps as before
    // Internal state for form data, initialized from initialData if in edit mode
    const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>{
        const baseData = initialData || {};
        if (baseData.tiers && Array.isArray(baseData.tiers)) {
            // Ensure initial tiers have IDs only once during initialization
            const tiersWithIds = baseData.tiers.map((tier)=>({
                    ...tier,
                    id: tier.id || `tier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                }));
            return {
                ...baseData,
                tiers: tiersWithIds
            };
        }
        return baseData;
    });
    const [newImageFiles, setNewImageFiles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // For files selected in ImageUpload
    const [currentExistingImages, setCurrentExistingImages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>{
        return initialData && initialData.images ? [
            ...initialData.images
        ] : [];
    });
    const [currentCategorySpecificFields, setCurrentCategorySpecificFields] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [customTierInclusion, setCustomTierInclusion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [stepErrors, setStepErrors] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [isSubmittingInternal, setIsSubmittingInternal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Update category-specific fields when category changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (formData.category) {
            const allFieldsForCategory = (0,_utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .getFieldsForCategory */ .Oc)(formData.category);
            const specificFields = allFieldsForCategory.filter((field)=>!_utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .commonFields.some */ .fo.some((commonField)=>commonField.name === field.name && commonField.name !== "title" && commonField.name !== "description" && commonField.name !== "category"));
            setCurrentCategorySpecificFields(specificFields);
        } else {
            setCurrentCategorySpecificFields([]);
        }
    }, [
        formData.category
    ]);
    const handleStepValidation = ()=>{
        let errors = {};
        // Keep existing validation logic, but ensure it uses `formData`
        switch(currentStep){
            case 1:
                if (!formData.title?.trim()) errors.title = "Service Title is required.";
                if (!formData.category) errors.category = "Category is required.";
                if (!formData.description?.trim()) errors.description = "Detailed Description is required.";
                // Validate images: at least one image required (either existing or new)
                if (currentExistingImages.length === 0 && newImageFiles.length === 0) {
                    errors.images = "At least one image is required for the service.";
                }
                _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .commonFields.forEach */ .fo.forEach((field)=>{
                    if (field.required) {
                        const value = formData[field.name];
                        if (field.type === "multi-select") {
                            if (!value || Array.isArray(value) && value.length === 0) {
                                errors[field.name] = `${field.label} is required.`;
                            }
                        } else if (field.type === "number") {
                            if (value === undefined || value === null || value === "") {
                                errors[field.name] = `${field.label} is required.`;
                            }
                        } else if (!value || typeof value === "string" && !value.trim()) {
                            errors[field.name] = `${field.label} is required.`;
                        }
                    }
                });
                break;
            case 2:
                errors = {};
                currentCategorySpecificFields.forEach((field)=>{
                    if (field.required) {
                        const value = formData[field.name];
                        if (field.type === "multi-select") {
                            if (!value || Array.isArray(value) && value.length === 0) {
                                errors[field.name] = `${field.label} is required.`;
                            }
                        } else if (field.type === "number") {
                            if (value === undefined || value === null || value === "") {
                                errors[field.name] = `${field.label} is required.`;
                            }
                        } else if (!value || typeof value === "string" && !value.trim()) {
                            errors[field.name] = `${field.label} is required.`;
                        }
                    }
                });
                break;
            case 3:
                errors = {};
                if (!formData.tiers || formData.tiers.length === 0) {
                    errors.tiers_general = "At least one service package (tier) is required.";
                } else {
                    formData.tiers.forEach((tier, tierIndex)=>{
                        _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.fieldsPerTier.forEach */ .Pf.fieldsPerTier.forEach((fieldDef)=>{
                            if (fieldDef.required) {
                                const value = tier[fieldDef.name];
                                // START REMOVED VALIDATION
                                // if (fieldDef.name === 'tierInclusions') {
                                //   if (!value || value.length === 0) {
                                //     errors[`tier_${tierIndex}_${fieldDef.name}`] = `Package ${tierIndex + 1}: At least one inclusion is required.`;
                                //   }
                                // } else
                                // END REMOVED VALIDATION
                                if (fieldDef.type === "number") {
                                    if (value === undefined || value === null || value === "") {
                                        errors[`tier_${tierIndex}_${fieldDef.name}`] = `Package ${tierIndex + 1}: ${fieldDef.label} is required.`;
                                    }
                                } else if (!value || typeof value === "string" && !value.trim()) {
                                    errors[`tier_${tierIndex}_${fieldDef.name}`] = `Package ${tierIndex + 1}: ${fieldDef.label} is required.`;
                                }
                            }
                        });
                    });
                }
                break;
            case 4:
                errors = {};
                (formData.addons || []).forEach((addon, addonIndex)=>{
                    if (addon.isCustom) {
                        if (!addon.addonName?.trim()) {
                            errors[`addon_${addonIndex}_addonName`] = `Add-on ${addonIndex + 1}: Custom name is required.`;
                        }
                    } else {
                        if (!addon.predefinedId) {
                            errors[`addon_${addonIndex}_predefinedId`] = `Add-on ${addonIndex + 1}: Predefined service selection is required.`;
                        }
                    }
                    // Common validation for price/description for both types of addons
                    _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .alaCarteAddonStructureConfig.fieldsPerAddon.forEach */ .Hr.fieldsPerAddon.forEach((fieldDef)=>{
                        // Skip addonName for predefined as it's derived
                        if (fieldDef.required && (addon.isCustom || fieldDef.name !== "addonName")) {
                            const value = addon[fieldDef.name];
                            if (fieldDef.type === "number") {
                                if (value === undefined || value === null || value === "") {
                                    errors[`addon_${addonIndex}_${fieldDef.name}`] = `Add-on ${addonIndex + 1}: ${fieldDef.label} is required.`;
                                }
                            } else if (!value || typeof value === "string" && !value.trim()) {
                                errors[`addon_${addonIndex}_${fieldDef.name}`] = `Add-on ${addonIndex + 1}: ${fieldDef.label} is required.`;
                            }
                        }
                    });
                });
                break;
            default:
                setStepErrors({});
                return true; // No validation or handled by proceeding
        }
        if (Object.keys(errors).length > 0) {
            setStepErrors(errors);
            return false;
        }
        setStepErrors({});
        return true;
    };
    const nextStep = ()=>{
        if (!handleStepValidation()) {
            return;
        }
        setStepErrors({}); // Clear errors before proceeding
        setCurrentStep((prev)=>Math.min(prev + 1, totalSteps));
    };
    const prevStep = ()=>{
        setStepErrors({}); // Clear errors when going back
        setCurrentStep((prev)=>Math.max(prev - 1, 1));
    };
    // Update from `data` to `formData` for all handlers
    const handleChange = (e)=>{
        const { name , value , type , checked  } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
    };
    const handleDynamicFieldChange = (fieldName, fieldValue)=>{
        setFormData((prev)=>({
                ...prev,
                [fieldName]: fieldValue
            }));
    };
    const addTier = ()=>{
        if ((formData.tiers?.length || 0) < _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.maxTiers */ .Pf.maxTiers) {
            const newTierId = `tier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            setFormData((prev)=>({
                    ...prev,
                    tiers: [
                        ...prev.tiers || [],
                        {
                            id: newTierId,
                            tierName: _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.defaultTierNames */ .Pf.defaultTierNames[prev.tiers?.length || 0] || `Package ${(prev.tiers?.length || 0) + 1}`,
                            tierPrice: "",
                            tierDurationHours: "",
                            tierDescription: "",
                            tierInclusions: []
                        }
                    ]
                }));
        }
    };
    const removeTier = (index)=>{
        setFormData((prev)=>({
                ...prev,
                tiers: prev.tiers.filter((_, i)=>i !== index)
            }));
    };
    const handleTierChange = (tierIndex, fieldName, value)=>{
        setFormData((prev)=>{
            const newTiers = prev.tiers.map((tier, i)=>{
                if (i === tierIndex) {
                    let processedValue = value;
                    const fieldDefinition = _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.fieldsPerTier.find */ .Pf.fieldsPerTier.find((f)=>f.name === fieldName);
                    if (fieldDefinition && fieldDefinition.type === "number") {
                        // Convert to number, ensuring empty string becomes null or undefined if appropriate,
                        // or parseFloat for actual numbers.
                        // If value is an empty string or cannot be parsed, it might become NaN.
                        // Consider how to handle empty numeric fields (e.g., treat as 0, null, or prevent submission via validation)
                        processedValue = value === "" ? "" : parseFloat(value); // Keep empty string as is for validation, parse otherwise
                        if (isNaN(processedValue) && value !== "") {
                            processedValue = value; // Fallback to original value if parsing fails for non-empty string (e.g. text in number field)
                        // Validation should catch this.
                        }
                    }
                    return {
                        ...tier,
                        [fieldName]: processedValue
                    };
                }
                return tier;
            });
            return {
                ...prev,
                tiers: newTiers
            };
        });
    };
    const handleTierInclusionChange = (tierIndex, inclusionId, isChecked)=>{
        setFormData((prev)=>({
                ...prev,
                tiers: prev.tiers.map((tier, i)=>{
                    if (i === tierIndex) {
                        const newInclusions = [
                            ...tier.tierInclusions || []
                        ];
                        const selectedInclusion = _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .predefinedInclusions.find */ .OW.find((pi)=>pi.id === inclusionId);
                        if (isChecked) {
                            if (selectedInclusion && !newInclusions.find((inc)=>inc.id === inclusionId && inc.isPredefined)) {
                                newInclusions.push({
                                    id: inclusionId,
                                    label: selectedInclusion.label,
                                    isPredefined: true
                                });
                            }
                        } else {
                            const itemIndex = newInclusions.findIndex((inc)=>inc.id === inclusionId && inc.isPredefined);
                            if (itemIndex > -1) newInclusions.splice(itemIndex, 1);
                        }
                        return {
                            ...tier,
                            tierInclusions: newInclusions
                        };
                    }
                    return tier;
                })
            }));
    };
    const addCustomTierInclusion = (tierIndex)=>{
        if (customTierInclusion.trim()) {
            setFormData((prev)=>({
                    ...prev,
                    tiers: prev.tiers.map((tier, i)=>{
                        if (i === tierIndex) {
                            // Prevent duplicate custom inclusions by label
                            if (!(tier.tierInclusions || []).some((inc)=>inc.label === customTierInclusion.trim() && !inc.isPredefined)) {
                                return {
                                    ...tier,
                                    tierInclusions: [
                                        ...tier.tierInclusions || [],
                                        {
                                            id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                            label: customTierInclusion.trim(),
                                            isPredefined: false
                                        }
                                    ]
                                };
                            }
                        }
                        return tier;
                    })
                }));
            setCustomTierInclusion(""); // Clear input after adding
        }
    };
    const removeTierInclusion = (tierIndex, inclusionIdToRemove)=>{
        setFormData((prev)=>({
                ...prev,
                tiers: prev.tiers.map((tier, i)=>{
                    if (i === tierIndex) {
                        return {
                            ...tier,
                            tierInclusions: (tier.tierInclusions || []).filter((inc)=>inc.id !== inclusionIdToRemove)
                        };
                    }
                    return tier;
                })
            }));
    };
    const addAddon = ()=>{
        setFormData((prev)=>({
                ...prev,
                addons: [
                    ...prev.addons || [],
                    {
                        addonName: "",
                        addonPrice: "",
                        addonDescription: "",
                        isCustom: true,
                        predefinedId: null // Ensure predefinedId is null for new custom
                    }
                ]
            }));
    };
    const removeAddon = (index)=>{
        setFormData((prev)=>({
                ...prev,
                addons: prev.addons.filter((_, i)=>i !== index)
            }));
    };
    const handleAddonChange = (addonIndex, fieldName, value, isPredefinedSelection = false)=>{
        setFormData((prev)=>({
                ...prev,
                addons: prev.addons.map((addon, i)=>{
                    if (i === addonIndex) {
                        if (isPredefinedSelection) {
                            const selectedPredefined = _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .predefinedAddons.find */ .RQ.find((pa)=>pa.id === value);
                            return {
                                ...addon,
                                addonName: selectedPredefined ? selectedPredefined.label : "",
                                predefinedId: value || null,
                                isCustom: !selectedPredefined,
                                addonPrice: selectedPredefined ? selectedPredefined.defaultPrice || "" : "",
                                addonDescription: selectedPredefined ? selectedPredefined.defaultDescription || "" : ""
                            };
                        }
                        return {
                            ...addon,
                            [fieldName]: value
                        };
                    }
                    return addon;
                })
            }));
    };
    const handleAddonCustomNameToggle = (addonIndex, newIsCustomState)=>{
        setFormData((prev)=>({
                ...prev,
                addons: prev.addons.map((addon, i)=>{
                    if (i === addonIndex) {
                        const resetAddon = {
                            ...addon,
                            isCustom: newIsCustomState,
                            predefinedId: newIsCustomState ? null : addon.predefinedId,
                            addonName: newIsCustomState ? "" : addon.predefinedId ? _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .predefinedAddons.find */ .RQ.find((pa)=>pa.id === addon.predefinedId)?.label || "" : "",
                            addonPrice: "",
                            addonDescription: ""
                        };
                        return resetAddon;
                    }
                    return addon;
                })
            }));
    };
    // Image handling for edit mode in Step 1
    const handleImageFilesChange = (files)=>{
        setNewImageFiles(files); // Update state for new image files
    };
    const handleRemoveExistingImage = (imageUrlToRemove)=>{
        setCurrentExistingImages((prev)=>prev.filter((url)=>url !== imageUrlToRemove));
    };
    const finalFormSubmit = async ()=>{
        if (!handleStepValidation()) {
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("Please ensure all required fields are filled correctly.");
            return;
        }
        setIsSubmittingInternal(true);
        setParentLoading(true);
        // Add check for user and user.uid
        if (!props.user || !props.user.uid) {
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("User information is missing. Cannot submit the form.");
            setIsSubmittingInternal(false);
            setParentLoading(false);
            return;
        }
        let finalImageUrls = [
            ...currentExistingImages
        ];
        if (newImageFiles.length > 0) {
            try {
                // Ensure serviceId and user.uid are available for image path generation
                // The check above ensures props.user.uid exists.
                if (!serviceId && !isEditMode) {
                // Or, if serviceId is generated client-side for create mode, use that.
                // This part depends on how serviceId is handled in create flow.
                // For now, let's assume image upload might need a temporary ID or user ID path.
                // The parent [serviceId].jsx handles this for edit by passing serviceId.
                // For create, the create.jsx page should handle it.
                // This component is generic, so it relies on parent providing necessary IDs.
                }
                const uploadedNewImageUrls = await (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_4__/* .uploadServiceImages */ .eC)(newImageFiles, props.user.uid); // Use props.user.uid
                finalImageUrls = [
                    ...finalImageUrls,
                    ...uploadedNewImageUrls
                ];
            } catch (uploadError) {
                console.error("Error uploading new images:", uploadError);
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("Failed to upload new images. " + (uploadError.message || ""));
                setIsSubmittingInternal(false);
                setParentLoading(false);
                return;
            }
        }
        // Prepare final data payload
        let finalPayload = {
            ...formData,
            images: finalImageUrls
        };
        // Ensure numeric fields in tiers are numbers
        // Helper function to parse numeric fields based on type
        const parseNumericField = (value, fieldDef)=>{
            if (value === "" || value === null || value === undefined) {
                return fieldDef.required ? fieldDef.type === "integer" ? 0 : 0.0 : null; // Default for required empty, else null
            }
            let parsedValue = fieldDef.type === "integer" ? parseInt(value, 10) : parseFloat(value);
            if (isNaN(parsedValue)) {
                console.warn(`Field ${fieldDef.name} with value "${value}" was NaN after parse. Setting to null or 0 based on requirement.`);
                return fieldDef.required ? fieldDef.type === "integer" ? 0 : 0.0 : null;
            }
            return parsedValue;
        };
        if (finalPayload.tiers && Array.isArray(finalPayload.tiers)) {
            finalPayload.tiers = finalPayload.tiers.map((tier)=>{
                const processedTier = {
                    ...tier
                };
                _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.fieldsPerTier.forEach */ .Pf.fieldsPerTier.forEach((fieldDef)=>{
                    if ((fieldDef.type === "number" || fieldDef.type === "integer") && processedTier[fieldDef.name] !== undefined) {
                        processedTier[fieldDef.name] = parseNumericField(processedTier[fieldDef.name], fieldDef);
                    }
                });
                return processedTier;
            });
        }
        if (finalPayload.addons && Array.isArray(finalPayload.addons)) {
            finalPayload.addons = finalPayload.addons.map((addon)=>{
                const processedAddon = {
                    ...addon
                };
                _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .alaCarteAddonStructureConfig.fieldsPerAddon.forEach */ .Hr.fieldsPerAddon.forEach((fieldDef)=>{
                    if ((fieldDef.type === "number" || fieldDef.type === "integer") && processedAddon[fieldDef.name] !== undefined) {
                        processedAddon[fieldDef.name] = parseNumericField(processedAddon[fieldDef.name], fieldDef);
                    }
                });
                return processedAddon;
            });
        }
        // Ensure numeric fields in category-specific and common fields are parsed
        const allFieldsForCategory = formData.category ? (0,_utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .getFieldsForCategory */ .Oc)(formData.category) : _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .commonFields */ .fo;
        allFieldsForCategory.forEach((fieldDef)=>{
            if ((fieldDef.type === "number" || fieldDef.type === "integer") && finalPayload[fieldDef.name] !== undefined) {
                finalPayload[fieldDef.name] = parseNumericField(finalPayload[fieldDef.name], fieldDef);
            }
        });
        // Call the onSubmit passed from parent (e.g., handleFormSubmit in [serviceId].jsx)
        await onSubmit(finalPayload);
        setIsSubmittingInternal(false);
        setParentLoading(false);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 py-2 bg-neutral-light dark:bg-neutral-dark rounded-lg shadow",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm font-medium text-center text-neutral-dark dark:text-neutral-light",
                        children: [
                            "Step ",
                            currentStep,
                            " of ",
                            totalSteps
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mt-1 w-full bg-neutral-medium/30 rounded-full h-2.5 dark:bg-neutral-medium/50",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "bg-primary h-2.5 rounded-full",
                            style: {
                                width: `${currentStep / totalSteps * 100}%`
                            }
                        })
                    })
                ]
            }),
            props.error && !Object.keys(stepErrors).length && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "p-4 bg-error/20 dark:bg-red-900/30 border-l-4 border-error dark:border-error rounded-lg",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "text-sm font-medium text-red-600 dark:text-red-200",
                    children: props.error
                })
            }),
            currentStep === 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                        children: "Step 1: Core Details"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RenderField, {
                            field: _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .commonFields.find */ .fo.find((f)=>f.name === "title"),
                            value: formData.title,
                            onDynamicChange: handleDynamicFieldChange,
                            error: stepErrors.title
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                htmlFor: "category",
                                className: "block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light",
                                children: "Category*"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-xs text-neutral-medium dark:text-neutral-light mb-2",
                                children: "Select the category that best describes your service. This will help us tailor the next steps for you."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                id: "category",
                                name: "category",
                                value: formData.category || "",
                                onChange: handleChange,
                                required: true,
                                className: `w-full px-4 py-3 border rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light focus:ring-primary focus:border-primary ${stepErrors.category ? "border-error" : "border-neutral-medium/50 dark:border-neutral-medium"}`,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                        value: "",
                                        children: "Select a category"
                                    }),
                                    _utils_categories__WEBPACK_IMPORTED_MODULE_3__/* .categories.map */ .b.map((cat)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: cat.name,
                                            children: cat.name
                                        }, cat.name))
                                ]
                            }),
                            stepErrors.category && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-error text-xs mt-1",
                                children: stepErrors.category
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RenderField, {
                            field: _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .commonFields.find */ .fo.find((f)=>f.name === "description"),
                            value: formData.description,
                            onDynamicChange: handleDynamicFieldChange,
                            error: stepErrors.description
                        })
                    }),
                    otherCommonFields.map((field)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RenderField, {
                                field: field,
                                value: formData[field.name],
                                onDynamicChange: handleDynamicFieldChange,
                                error: stepErrors[field.name]
                            })
                        }, `common-${field.name}`)),
                    isEditMode && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RenderField, {
                            field: {
                                name: "disabled",
                                label: "Disable this service (will be hidden from listings)",
                                type: "boolean"
                            },
                            value: formData.disabled,
                            onDynamicChange: handleDynamicFieldChange,
                            error: stepErrors.disabled
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: "block text-sm font-medium mb-1 text-neutral-dark dark:text-neutral-light",
                                children: "Images*"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ImageUpload__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                files: newImageFiles,
                                setFile: handleImageFilesChange,
                                existingImages: currentExistingImages,
                                setExistingImages: handleRemoveExistingImage,
                                maxFiles: 5,
                                maxSizeMB: 2,
                                isEditMode: isEditMode
                            }),
                            stepErrors.images && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-error text-xs mt-1",
                                children: stepErrors.images
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "mt-1 text-xs text-neutral-medium dark:text-neutral-light",
                                children: "Upload images for your service. Max 5 images, 2MB each."
                            })
                        ]
                    }),
                    Object.keys(stepErrors).length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "p-3 bg-error/10 border border-error/30 rounded-md mt-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-sm text-error font-medium",
                            children: "Please correct the errors above before proceeding."
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "flex justify-center",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: nextStep,
                            className: "bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm",
                            children: "Next"
                        })
                    })
                ]
            }),
            currentStep === 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                        className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                        children: [
                            "Step 2: ",
                            formData.category ? `${formData.category} Specifics` : "Category Specifics"
                        ]
                    }),
                    !formData.category ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-accent-orange/80 dark:text-accent-orange/90 text-sm p-3 bg-accent-orange/10 dark:bg-accent-orange/20 rounded-md border border-accent-orange/30",
                        children: "Please select a category in Step 1 first."
                    }) : currentCategorySpecificFields.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 border border-neutral-medium/30 dark:border-neutral-medium/50 rounded-lg bg-neutral-light/50 dark:bg-neutral-dark/30 space-y-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                                className: "text-md font-semibold text-neutral-dark dark:text-neutral-light border-b border-neutral-medium/30 pb-2",
                                children: [
                                    "Specifics for ",
                                    formData.category
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "space-y-4",
                                children: currentCategorySpecificFields.map((field)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RenderField, {
                                            field: field,
                                            value: formData[field.name],
                                            onDynamicChange: handleDynamicFieldChange,
                                            error: stepErrors[field.name]
                                        })
                                    }, `specific-${field.name}`))
                            })
                        ]
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-neutral-dark dark:text-neutral-light text-sm p-3 bg-sky-100/70 dark:bg-sky-800/30 rounded-md border border-sky-300/50 dark:border-sky-600/50",
                        children: "No specific fields for this category. You can proceed to the next step."
                    }),
                    Object.keys(stepErrors).length > 0 && !stepErrors.tiers_general && !stepErrors.images && !stepErrors.title && !stepErrors.category && !stepErrors.description && !_utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .commonFields.some */ .fo.some((cf)=>stepErrors[cf.name]) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "p-3 bg-error/10 border border-error/30 rounded-md mt-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-sm text-error font-medium",
                            children: "Please correct the errors above before proceeding."
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-center mt-6 space-x-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: prevStep,
                                className: "bg-neutral-medium hover:bg-neutral-dark text-white px-4 py-2 rounded-lg text-sm",
                                children: "Previous"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: nextStep,
                                className: "bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm",
                                disabled: !formData.category && currentCategorySpecificFields.length === 0,
                                children: "Next"
                            })
                        ]
                    })
                ]
            }),
            currentStep === 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                                children: "Step 3: Service Packages (Tiers)"
                            }),
                            (formData.tiers?.length || 0) < _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.maxTiers */ .Pf.maxTiers && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "button",
                                onClick: addTier,
                                className: "bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm",
                                children: "Add Package Tier"
                            })
                        ]
                    }),
                    stepErrors.tiers_general && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "p-3 bg-error/10 border border-error/30 rounded-md mb-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-sm text-error font-medium",
                            children: stepErrors.tiers_general
                        })
                    }),
                    (formData.tiers || []).map((tier, tierIndex)=>// Use tier.id for the key if available, otherwise fall back to tierIndex.
                        // This is important because tier.id is now being generated.
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "p-4 border border-neutral-medium/30 dark:border-neutral-medium/40 rounded-xl shadow-sm bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-between items-center pb-2 border-b border-neutral-medium/20 dark:border-neutral-medium/30",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                            className: "text-lg font-semibold text-primary dark:text-primary-light",
                                            children: tier.tierName || `Package Tier ${tierIndex + 1}`
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            type: "button",
                                            onClick: ()=>removeTier(tierIndex),
                                            className: "text-error hover:text-red-700 dark:hover:text-red-400 text-sm font-medium",
                                            children: "Remove Tier"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5",
                                    children: _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.fieldsPerTier.filter */ .Pf.fieldsPerTier.filter((f)=>f.name !== "tierInclusions").map((fieldDef)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RenderField, {
                                                field: fieldDef,
                                                value: tier[fieldDef.name],
                                                onDynamicChange: (name, val)=>handleTierChange(tierIndex, name, val),
                                                error: stepErrors[`tier_${tierIndex}_${fieldDef.name}`]
                                            })
                                        }, fieldDef.name))
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-3 pt-3 border-t border-neutral-medium/20 dark:border-neutral-medium/30",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                            className: "block text-sm font-medium text-neutral-dark dark:text-neutral-light",
                                            children: [
                                                _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.fieldsPerTier.find */ .Pf.fieldsPerTier.find((f)=>f.name === "tierInclusions")?.label || "Inclusions",
                                                _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .tierStructureConfig.fieldsPerTier.find */ .Pf.fieldsPerTier.find((f)=>f.name === "tierInclusions")?.required && "*"
                                            ]
                                        }),
                                        stepErrors[`tier_${tierIndex}_tierInclusions`] && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-error text-xs mb-1",
                                            children: stepErrors[`tier_${tierIndex}_tierInclusions`]
                                        }),
                                        _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .predefinedInclusions.length */ .OW.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `p-3 border rounded-md bg-neutral-light/20 dark:bg-neutral-dark/10 ${stepErrors[`tier_${tierIndex}_tierInclusions`] ? "border-error" : "border-neutral-medium/20 dark:border-neutral-medium/30"}`,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "text-xs font-medium text-neutral-dark dark:text-neutral-light mb-2",
                                                    children: "Choose from predefined features:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2",
                                                    children: _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .predefinedInclusions.map */ .OW.map((incOption)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                            className: "flex items-center text-sm text-neutral-dark dark:text-neutral-light",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                    type: "checkbox",
                                                                    checked: (tier.tierInclusions || []).some((i)=>i.id === incOption.id && i.isPredefined),
                                                                    onChange: (e)=>handleTierInclusionChange(tierIndex, incOption.id, e.target.checked),
                                                                    className: "h-4 w-4 text-primary border-neutral-medium/50 rounded focus:ring-primary mr-2"
                                                                }),
                                                                incOption.label
                                                            ]
                                                        }, incOption.id))
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "pt-2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "text-xs font-medium text-neutral-dark dark:text-neutral-light mb-1",
                                                    children: "Or add your own custom features for this tier:"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex flex-wrap sm:flex-nowrap gap-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "text",
                                                            value: customTierInclusion,
                                                            onChange: (e)=>setCustomTierInclusion(e.target.value),
                                                            placeholder: "Type custom feature and click Add",
                                                            className: `flex-1 ${inputClasses} text-sm`
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                            type: "button",
                                                            onClick: ()=>addCustomTierInclusion(tierIndex),
                                                            className: "bg-accent hover:bg-pink-500 dark:hover:bg-pink-300 text-white px-3 py-2 rounded-lg text-sm shrink-0",
                                                            children: "Add Custom"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        (tier.tierInclusions || []).length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "pt-2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "text-xs font-semibold text-neutral-dark dark:text-neutral-light mb-1",
                                                    children: "Current inclusions for this tier:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                    className: "list-disc list-inside pl-1 space-y-1 text-sm text-neutral-dark dark:text-neutral-light bg-neutral-light/30 dark:bg-neutral-dark/20 p-3 rounded-md",
                                                    children: (tier.tierInclusions || []).map((inclusion)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                            className: "flex justify-between items-center py-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    children: [
                                                                        inclusion.label,
                                                                        " ",
                                                                        !inclusion.isPredefined && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: "text-xs text-accent dark:text-pink-400",
                                                                            children: "(Custom)"
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                    type: "button",
                                                                    onClick: ()=>removeTierInclusion(tierIndex, inclusion.id),
                                                                    className: "text-error hover:text-red-700 dark:hover:text-red-400 text-xs font-medium ml-2",
                                                                    children: "Remove"
                                                                })
                                                            ]
                                                        }, inclusion.id))
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }, tier.id || tierIndex)),
                    Object.keys(stepErrors).length > 0 && !stepErrors.tiers_general && Object.keys(stepErrors).some((k)=>k.startsWith("tier_")) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "p-3 bg-error/10 border border-error/30 rounded-md mt-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-sm text-error font-medium",
                            children: "Please correct the errors in the tiers above before proceeding."
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-center mt-6 space-x-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: prevStep,
                                className: "bg-neutral-medium hover:bg-neutral-dark text-white px-4 py-2 rounded-lg text-sm",
                                children: "Previous"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: nextStep,
                                className: "bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm",
                                children: "Next"
                            })
                        ]
                    })
                ]
            }),
            currentStep === 4 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "space-y-6 p-6 bg-neutral-light dark:bg-neutral-dark shadow rounded-lg",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                                children: "Step 4: Optional Add-ons"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "button",
                                onClick: addAddon,
                                className: "bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm",
                                children: "Add Add-on"
                            })
                        ]
                    }),
                    (formData.addons || []).map((addon, addonIndex)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "p-4 border border-neutral-medium/30 dark:border-neutral-medium/40 rounded-xl shadow-sm bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-between items-center pb-2 border-b border-neutral-medium/20 dark:border-neutral-medium/30",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                            className: "text-lg font-semibold text-primary dark:text-primary-light",
                                            children: [
                                                "Add-on ",
                                                addonIndex + 1,
                                                addon.addonName && !addon.isCustom ? `: ${addon.addonName}` : ""
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            type: "button",
                                            onClick: ()=>removeAddon(addonIndex),
                                            className: "text-error hover:text-red-700 dark:hover:text-red-400 text-sm font-medium",
                                            children: "Remove Add-on"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            className: "block text-sm font-medium text-neutral-dark dark:text-neutral-light",
                                            children: "Add-on Type:"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-x-4 gap-y-2 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                    htmlFor: `predefinedType-${addonIndex}`,
                                                    className: "flex items-center text-sm text-neutral-dark dark:text-neutral-light cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "radio",
                                                            id: `predefinedType-${addonIndex}`,
                                                            name: `addonType-${addonIndex}`,
                                                            checked: !addon.isCustom,
                                                            onChange: ()=>handleAddonCustomNameToggle(addonIndex, false),
                                                            className: "h-4 w-4 text-primary border-neutral-medium/50 focus:ring-primary mr-1.5"
                                                        }),
                                                        "Predefined Service"
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                    htmlFor: `customType-${addonIndex}`,
                                                    className: "flex items-center text-sm text-neutral-dark dark:text-neutral-light cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "radio",
                                                            id: `customType-${addonIndex}`,
                                                            name: `addonType-${addonIndex}`,
                                                            checked: addon.isCustom || false,
                                                            onChange: ()=>handleAddonCustomNameToggle(addonIndex, true),
                                                            className: "h-4 w-4 text-primary border-neutral-medium/50 focus:ring-primary mr-1.5"
                                                        }),
                                                        "Custom Service"
                                                    ]
                                                })
                                            ]
                                        }),
                                        stepErrors[`addon_${addonIndex}_addonName`] && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-error text-xs mt-1",
                                            children: stepErrors[`addon_${addonIndex}_addonName`]
                                        }),
                                        stepErrors[`addon_${addonIndex}_predefinedId`] && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-error text-xs mt-1",
                                            children: stepErrors[`addon_${addonIndex}_predefinedId`]
                                        }),
                                        addon.isCustom || false ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    htmlFor: `customAddonName-${addonIndex}`,
                                                    className: "block text-xs font-medium text-neutral-dark dark:text-neutral-light mb-1",
                                                    children: "Custom Add-on Name*"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "text",
                                                    id: `customAddonName-${addonIndex}`,
                                                    placeholder: "Enter custom add-on name",
                                                    value: addon.addonName || "",
                                                    onChange: (e)=>handleAddonChange(addonIndex, "addonName", e.target.value),
                                                    className: `${inputClasses} text-sm ${stepErrors[`addon_${addonIndex}_addonName`] ? "border-error" : ""}`
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    htmlFor: `predefinedAddonName-${addonIndex}`,
                                                    className: "block text-xs font-medium text-neutral-dark dark:text-neutral-light mb-1",
                                                    children: "Select Predefined Add-on*"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                    id: `predefinedAddonName-${addonIndex}`,
                                                    value: addon.predefinedId || "",
                                                    onChange: (e)=>handleAddonChange(addonIndex, "predefinedId", e.target.value, true),
                                                    className: `${inputClasses} text-sm ${stepErrors[`addon_${addonIndex}_predefinedId`] ? "border-error" : ""}`,
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                            value: "",
                                                            children: "Choose a service..."
                                                        }),
                                                        _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .predefinedAddons.map */ .RQ.map((pa)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                value: pa.id,
                                                                children: pa.label
                                                            }, pa.id))
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-2",
                                    children: _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .alaCarteAddonStructureConfig.fieldsPerAddon.map */ .Hr.fieldsPerAddon.map((fieldDef)=>{
                                        if (fieldDef.name === "addonName" && !addon.isCustom) return null; // Don't render name field for predefined if it's handled by select
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RenderField, {
                                                field: fieldDef,
                                                value: addon[fieldDef.name],
                                                onDynamicChange: (name, val)=>handleAddonChange(addonIndex, name, val),
                                                error: stepErrors[`addon_${addonIndex}_${fieldDef.name}`]
                                            })
                                        }, fieldDef.name);
                                    })
                                })
                            ]
                        }, addonIndex)),
                    Object.keys(stepErrors).length > 0 && Object.keys(stepErrors).some((k)=>k.startsWith("addon_")) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "p-3 bg-error/10 border border-error/30 rounded-md mt-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-sm text-error font-medium",
                            children: "Please correct the errors in the add-ons above before proceeding."
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-center mt-6 space-x-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: prevStep,
                                className: "bg-neutral-medium hover:bg-neutral-dark text-white px-4 py-2 rounded-lg text-sm",
                                children: "Previous"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: nextStep,
                                className: "bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded-lg text-sm",
                                children: "Next"
                            })
                        ]
                    })
                ]
            }),
            currentStep === 5 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "space-y-8 p-6 bg-neutral-light dark:bg-neutral-dark shadow-xl rounded-lg",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                        className: "text-3xl font-bold text-neutral-darker dark:text-neutral-lighter mb-8 text-center",
                        children: [
                            "Step 5 of ",
                            totalSteps,
                            ": Review your service"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-4 bg-white dark:bg-neutral-dark/40 shadow-md",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between items-center mb-3 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                                        children: "Core details"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        onClick: ()=>setCurrentStep(1),
                                        className: "text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors",
                                        children: "Edit"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                className: "font-semibold text-neutral-dark/90 dark:text-neutral-light/90",
                                                children: "Service title:"
                                            }),
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                                children: formData.title || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "text-neutral-medium",
                                                    children: "Not set"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                className: "font-semibold text-neutral-dark/90 dark:text-neutral-light/90",
                                                children: "Service category:"
                                            }),
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                                children: formData.category || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "text-neutral-medium",
                                                    children: "Not set"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                        className: "font-semibold text-neutral-dark/90 dark:text-neutral-light/90 block mb-1",
                                        children: "Description:"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-sm whitespace-pre-wrap p-3 bg-neutral-light/50 dark:bg-neutral-dark/20 rounded-md border border-neutral-medium/20 dark:border-neutral-medium/40 text-neutral-dark/70 dark:text-neutral-light/70",
                                        children: formData.description || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "text-neutral-medium",
                                            children: "No description provided."
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-2",
                                children: otherCommonFields.map((field)=>{
                                    let displayValue = formData[field.name];
                                    const label = field.label.endsWith("*") ? field.label.slice(0, -1) : field.label; // Remove trailing asterisk for display
                                    if (field.name === "availableDays" && Array.isArray(displayValue)) {
                                        displayValue = displayValue.map((value)=>{
                                            const option = field.options.find((opt)=>opt.value === value);
                                            return option ? option.label : value;
                                        }).join(", ") || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "text-neutral-medium",
                                            children: "Not specified"
                                        });
                                    } else if (field.name === "availableOnPublicHolidays" && typeof displayValue === "string") {
                                        // Display 'Yes' or 'No' based on the toggle value
                                        displayValue = displayValue === "yes" ? "Yes" : displayValue === "no" ? "No" : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "text-neutral-medium",
                                            children: "Not specified"
                                        });
                                    } else if (Array.isArray(displayValue)) {
                                        displayValue = displayValue.join(", ") || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "text-neutral-medium",
                                            children: "Not specified"
                                        });
                                    } else {
                                        displayValue = displayValue || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "text-neutral-medium",
                                            children: "Not set"
                                        });
                                    }
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                className: "font-semibold text-neutral-dark/90 dark:text-neutral-light/90",
                                                children: [
                                                    label,
                                                    ":"
                                                ]
                                            }),
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                                children: displayValue
                                            })
                                        ]
                                    }, `review-common-${field.name}`);
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                        className: "font-semibold text-neutral-dark/90 dark:text-neutral-light/90",
                                        children: "Status:"
                                    }),
                                    " ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                        children: formData.disabled ? "Disabled (Hidden from listings)" : "Enabled (Visible in listings)"
                                    })
                                ]
                            })
                        ]
                    }),
                    formData.category && currentCategorySpecificFields.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-4 bg-white dark:bg-neutral-dark/40 shadow-md",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between items-center mb-3 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                        className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                                        children: [
                                            formData.category,
                                            " specifics"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        onClick: ()=>setCurrentStep(2),
                                        className: "text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors",
                                        children: "Edit"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3",
                                children: currentCategorySpecificFields.map((field)=>{
                                    const label = field.label.endsWith("*") ? field.label.slice(0, -1) : field.label;
                                    let displayValue = formData[field.name];
                                    if (Array.isArray(displayValue)) {
                                        displayValue = displayValue.join(", ") || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "text-neutral-medium",
                                            children: "Not specified"
                                        });
                                    } else {
                                        displayValue = displayValue || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "text-neutral-medium",
                                            children: "Not set"
                                        });
                                    }
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                className: "font-semibold text-neutral-dark/90 dark:text-neutral-light/90",
                                                children: [
                                                    label,
                                                    ":"
                                                ]
                                            }),
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                                children: displayValue
                                            })
                                        ]
                                    }, `review-specific-${field.name}`);
                                })
                            })
                        ]
                    }),
                    (formData.tiers || []).length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-5 bg-white dark:bg-neutral-dark/40 shadow-md",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between items-center mb-4 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                                        children: "Service packages (Tiers)"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        onClick: ()=>setCurrentStep(3),
                                        className: "text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors",
                                        children: "Edit"
                                    })
                                ]
                            }),
                            (formData.tiers || []).map((tier, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "p-4 rounded-lg border border-neutral-medium/20 dark:border-neutral-medium/40 bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-2 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-lg font-semibold text-primary dark:text-primary-light",
                                            children: tier.tierName || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "text-neutral-medium",
                                                children: "Unnamed Package Tier"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                            className: "font-medium text-neutral-dark/80 dark:text-neutral-light/80",
                                                            children: "Price:"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                                            children: [
                                                                "$",
                                                                tier.tierPrice !== undefined && tier.tierPrice !== null && tier.tierPrice !== "" ? tier.tierPrice : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                    className: "text-neutral-medium",
                                                                    children: "N/A"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                            className: "font-medium text-neutral-dark/80 dark:text-neutral-light/80",
                                                            children: "Duration:"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                                            children: [
                                                                tier.tierDurationHours || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                    className: "text-neutral-medium",
                                                                    children: "N/A"
                                                                }),
                                                                " hours"
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                    className: "font-medium text-sm text-neutral-dark/80 dark:text-neutral-light/80 block mb-0.5",
                                                    children: "Description:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "text-xs p-2 bg-neutral-light/50 dark:bg-neutral-dark/10 rounded border border-neutral-medium/10 dark:border-neutral-medium/30 text-neutral-dark/70 dark:text-neutral-light/70",
                                                    children: tier.tierDescription || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "text-neutral-medium",
                                                        children: "No description"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                    className: "font-medium text-sm text-neutral-dark/80 dark:text-neutral-light/80",
                                                    children: "Inclusions:"
                                                }),
                                                tier.tierInclusions && tier.tierInclusions.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                    className: "list-disc list-inside pl-4 text-sm space-y-0.5 mt-1 text-neutral-dark/70 dark:text-neutral-light/70",
                                                    children: (tier.tierInclusions || []).map((inc)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                                            children: [
                                                                inc.label,
                                                                " ",
                                                                !inc.isPredefined && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "text-xs text-accent dark:text-pink-400",
                                                                    children: "(Custom)"
                                                                })
                                                            ]
                                                        }, inc.id))
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "text-sm text-neutral-medium pl-4",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        children: "No inclusions for this tier."
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }, `review-tier-${tier.id || index}`))
                        ]
                    }),
                    (formData.addons || []).length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-6 border border-neutral-medium/40 dark:border-neutral-medium/60 rounded-xl space-y-5 bg-white dark:bg-neutral-dark/40 shadow-md",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between items-center mb-4 pb-3 border-b border-neutral-medium/30 dark:border-neutral-medium/50",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "text-xl font-semibold text-neutral-dark dark:text-neutral-light",
                                        children: "Optional add-ons"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        onClick: ()=>setCurrentStep(4),
                                        className: "text-sm text-primary-dark dark:text-primary-light hover:underline font-medium px-3 py-1 rounded-md hover:bg-primary/10 dark:hover:bg-primary-dark/20 transition-colors",
                                        children: "Edit"
                                    })
                                ]
                            }),
                            (formData.addons || []).map((addon, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "p-4 rounded-lg border border-neutral-medium/20 dark:border-neutral-medium/40 bg-neutral-light/30 dark:bg-neutral-dark/20 space-y-2 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-lg font-semibold text-primary dark:text-primary-light",
                                            children: addon.addonName || addon.predefinedId && _utils_serviceFieldDefinitions__WEBPACK_IMPORTED_MODULE_6__/* .predefinedAddons.find */ .RQ.find((pa)=>pa.id === addon.predefinedId)?.label || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "text-neutral-medium",
                                                children: "Unnamed Add-on"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                        className: "font-medium text-neutral-dark/80 dark:text-neutral-light/80",
                                                        children: "Price:"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-neutral-dark/70 dark:text-neutral-light/70",
                                                        children: [
                                                            " $",
                                                            addon.addonPrice !== undefined && addon.addonPrice !== null && addon.addonPrice !== "" ? addon.addonPrice : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                className: "text-neutral-medium",
                                                                children: "N/A"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                    className: "font-medium text-sm text-neutral-dark/80 dark:text-neutral-light/80 block mb-0.5",
                                                    children: "Description:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "text-xs p-2 bg-neutral-light/50 dark:bg-neutral-dark/10 rounded border border-neutral-medium/10 dark:border-neutral-medium/30 text-neutral-dark/70 dark:text-neutral-light/70",
                                                    children: addon.addonDescription || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "text-neutral-medium",
                                                        children: "No description"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }, `review-addon-${index}`))
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-center mt-10 pt-8 border-t border-neutral-medium/30 dark:border-neutral-medium/50 space-x-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: prevStep,
                                className: "bg-neutral-500 hover:bg-neutral-600 dark:bg-neutral-600 dark:hover:bg-neutral-700 text-white px-8 py-3 rounded-lg text-base font-semibold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50",
                                children: "Previous"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: finalFormSubmit,
                                disabled: isSubmittingInternal,
                                className: `px-10 py-3 text-base font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isSubmittingInternal ? "bg-neutral-400 dark:bg-neutral-500 text-neutral-100 dark:text-neutral-300 cursor-not-allowed" : "bg-primary hover:bg-primary-dark text-white dark:bg-primary-dark dark:hover:bg-primary-darker dark:text-neutral-light focus:ring-primary"}`,
                                children: isSubmittingInternal ? isEditMode ? "Saving Changes..." : "Publishing Service..." : isEditMode ? "Save Changes" : "Publish Service"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultiStepServiceForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C4": () => (/* binding */ useStateProvider),
/* harmony export */   "X9": () => (/* binding */ StateProvider)
/* harmony export */ });
/* unused harmony export StateContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const StateContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const StateProvider = ({ initialState , reducer , children  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StateContext.Provider, {
        value: (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, initialState),
        children: children
    });
const useStateProvider = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(StateContext);


/***/ }),

/***/ 2782:
/***/ (() => {



/***/ }),

/***/ 3073:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hr": () => (/* binding */ alaCarteAddonStructureConfig),
/* harmony export */   "OW": () => (/* binding */ predefinedInclusions),
/* harmony export */   "Oc": () => (/* binding */ getFieldsForCategory),
/* harmony export */   "Pf": () => (/* binding */ tierStructureConfig),
/* harmony export */   "RQ": () => (/* binding */ predefinedAddons),
/* harmony export */   "fo": () => (/* binding */ commonFields)
/* harmony export */ });
/* unused harmony exports languageOptions, experienceYearOptions, contactMethodOptions, deliveryFormatOptions, weddingServiceFields */
// 1. Predefined Options for Picklists
const languageOptions = [
    {
        value: "english",
        label: "English"
    },
    {
        value: "mandarin",
        label: "Mandarin Chinese"
    },
    {
        value: "malay",
        label: "Malay"
    },
    {
        value: "tamil",
        label: "Tamil"
    },
    {
        value: "hindi",
        label: "Hindi"
    }
];
const experienceYearOptions = [
    {
        value: "0-1",
        label: "Less than 1 year"
    },
    {
        value: "1-3",
        label: "1-3 years"
    },
    {
        value: "3-5",
        label: "3-5 years"
    },
    {
        value: "5-10",
        label: "5-10 years"
    },
    {
        value: "10+",
        label: "10+ years"
    }
];
const contactMethodOptions = [
    {
        value: "platform_chat",
        label: "Platform Chat Only"
    },
    {
        value: "email",
        label: "Email (Shared after booking)"
    },
    {
        value: "phone",
        label: "Phone (Shared after booking)"
    }
];
// Removed contactMethodOptions
const deliveryFormatOptions = [
    {
        value: "online_gallery",
        label: "Online Gallery"
    },
    {
        value: "usb_drive",
        label: "USB Drive"
    },
    {
        value: "digital_download",
        label: "Digital Download Link"
    }
];
const yesNoAddonOptions = [
    {
        value: "yes",
        label: "Yes"
    },
    {
        value: "no",
        label: "No"
    },
    {
        value: "addon",
        label: "Available as Add-on"
    } // Indicates the feature can be offered as a paid extra
];
// 2. Common Fields Definition
const commonFields = [
    {
        name: "title",
        label: "Title",
        type: "text",
        required: true,
        placeholder: "e.g., Full Day Wedding Photography Service"
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        placeholder: "Describe your service, approach, and what makes you unique."
    },
    {
        name: "languagesSpoken",
        label: "Languages Spoken",
        type: "multi-select",
        required: true,
        options: languageOptions
    },
    {
        name: "experienceYears",
        label: "Years of Experience",
        type: "select",
        required: true,
        options: experienceYearOptions
    },
    {
        name: "cancellationPolicy",
        label: "Cancellation Policy",
        type: "select",
        required: true,
        options: [
            {
                value: "flexible_7_day",
                label: "Flexible (Full refund if canceled within 7 days)"
            },
            {
                value: "standard_30_day",
                label: "Standard (Full refund if canceled within 30 days)"
            },
            {
                value: "strict_90_day",
                label: "Strict (Full refund if canceled within 90 days)"
            }
        ]
    },
    // { name: 'contactMethod', label: 'Preferred Contact Method (Post-Booking)', type: 'select', required: false, options: contactMethodOptions }, // Removed
    {
        name: "availableDays",
        label: "Available Days of the Week",
        type: "multi-select",
        required: true,
        options: [
            {
                value: "monday",
                label: "Monday"
            },
            {
                value: "tuesday",
                label: "Tuesday"
            },
            {
                value: "wednesday",
                label: "Wednesday"
            },
            {
                value: "thursday",
                label: "Thursday"
            },
            {
                value: "friday",
                label: "Friday"
            },
            {
                value: "saturday",
                label: "Saturday"
            },
            {
                value: "sunday",
                label: "Sunday"
            }
        ],
        helpText: "Select the regular days your service is typically available. Specify public holiday availability separately below."
    },
    {
        name: "availableOnPublicHolidays",
        label: "Available on Singapore Public Holidays?",
        type: "toggle",
        required: true,
        // Options are removed as it's a toggle now
        helpText: "Specify if your service can be booked on Singapore public holidays."
    }
];
// 3. Category-Specific Fields (Illustrative - expand based on user's full list)
// These are fields *in addition* to commonFields.
const weddingServiceFields = {
    "Wedding Photographer": [
        {
            name: "numberOfPhotographers",
            label: "Number of Photographers",
            type: "integer",
            required: false,
            placeholder: "e.g., 1 or 2",
            min: 1
        },
        {
            name: "photoDeliveryTime",
            label: "Photo Delivery Time",
            type: "text",
            required: false,
            placeholder: "e.g., 4-6 weeks"
        },
        {
            name: "numberOfEditedPhotos",
            label: "Number of Edited Photos",
            type: "text",
            required: false,
            placeholder: "e.g., Approx. 500"
        },
        {
            name: "rawPhotosIncluded",
            label: "Raw Photos Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "deliveryFormat",
            label: "Photo Delivery Format",
            type: "multi-select",
            required: false,
            options: deliveryFormatOptions
        }
    ],
    "Wedding Videographer": [
        {
            name: "numberOfVideographers",
            label: "Number of Videographers",
            type: "integer",
            required: false,
            placeholder: "e.g., 1 or 2",
            min: 1
        },
        {
            name: "videoLengthEstimate",
            label: "Estimated Video Length",
            type: "text",
            required: false,
            placeholder: "e.g., 3-5 min highlight, 20 min feature"
        },
        {
            name: "sameDayEdit",
            label: "Same Day Edit Available?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "droneUsage",
            label: "Drone Usage Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "videoDeliveryTime",
            label: "Video Delivery Time",
            type: "text",
            required: false,
            placeholder: "e.g., 6-8 weeks"
        }
    ],
    "Bridal Makeup Artist": [
        {
            name: "trialMakeupIncluded",
            label: "Trial Makeup Session Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "touchUpService",
            label: "On-site Touch-up Service?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "brandsUsed",
            label: "Brands of Makeup Used",
            type: "text",
            required: false,
            placeholder: "e.g., MAC, Dior, NARS (Optional)"
        },
        {
            name: "additionalPaxMakeup",
            label: "Makeup for Additional Pax (e.g., Bridesmaids)?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Wedding Emcee": [
        {
            name: "hostingStyle",
            label: "Hosting Style",
            type: "text",
            required: false,
            placeholder: "e.g., Bilingual, Humorous, Formal"
        },
        {
            name: "programConsultation",
            label: "Program Consultation Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "scriptWriting",
            label: "Script Writing Assistance?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Wedding Band": [
        {
            name: "bandSize",
            label: "Number of Musicians/Vocalists",
            type: "text",
            required: false,
            placeholder: "e.g., 2-piece, 5-piece"
        },
        {
            name: "musicGenres",
            label: "Music Genres Offered",
            type: "text",
            required: false,
            placeholder: "e.g., Pop, Jazz, Ballads"
        },
        {
            name: "soundSystemProvided",
            label: "Sound System Provided?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Wedding Decorator": [
        {
            name: "decorThemeConsultation",
            label: "Theme Consultation Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "packageOptions",
            label: "Available Decor Package Options",
            type: "textarea",
            required: false,
            placeholder: "e.g., Stage setup, Floral arrangements, Aisle decor. Describe basic packages or customization options."
        },
        {
            name: "setupTearDownIncluded",
            label: "Setup & Teardown Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "ROM Solemnizer": [
        {
            name: "solemnizationStyle",
            label: "Solemnization Style",
            type: "text",
            required: false,
            placeholder: "e.g., Modern, Traditional, Bilingual"
        },
        {
            name: "scriptCustomization",
            label: "Vow/Script Customization Offered?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "preMeeting",
            label: "Pre-Solemnization Meeting?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Wedding Planner": [
        {
            name: "planningScope",
            label: "Scope of Planning Services",
            type: "multi-select",
            required: false,
            options: [
                {
                    value: "full",
                    label: "Full Planning"
                },
                {
                    value: "partial",
                    label: "Partial Planning"
                },
                {
                    value: "day_of",
                    label: "Day-of Coordination"
                }
            ]
        },
        {
            name: "vendorCoordination",
            label: "Vendor Coordination Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "budgetManagement",
            label: "Budget Management Assistance?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Photo Booth Services": [
        {
            name: "boothType",
            label: "Type of Photo Booth",
            type: "text",
            required: false,
            placeholder: "e.g., Open-air, Enclosed, Mirror Booth"
        },
        {
            name: "propsIncluded",
            label: "Props Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "instantPrints",
            label: "Instant Prints Available?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "customBackdrop",
            label: "Custom Backdrop Option?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Live Painter": [
        {
            name: "paintingStyle",
            label: "Painting Style",
            type: "text",
            required: false,
            placeholder: "e.g., Impressionistic, Realistic, Caricature"
        },
        {
            name: "canvasSize",
            label: "Typical Canvas Size",
            type: "text",
            required: false,
            placeholder: "e.g., 16x20 inches"
        },
        {
            name: "paintingCompletionTime",
            label: "On-site Painting Completion Time",
            type: "text",
            required: false,
            placeholder: "e.g., Completed during event, or studio touch-up"
        }
    ],
    "Florist": [
        {
            name: "floralArrangementTypes",
            label: "Types of Arrangements Offered",
            type: "textarea",
            required: false,
            placeholder: "e.g., Bridal bouquet, Corsages, Table centerpieces, Arch decor"
        },
        {
            name: "flowerTypes",
            label: "Commonly Used Flower Types",
            type: "text",
            required: false,
            placeholder: "e.g., Roses, Lilies, Orchids (Optional)"
        },
        {
            name: "deliveryAndSetup",
            label: "Delivery and Setup Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Gown Rental": [
        {
            name: "gownStyles",
            label: "Available Gown Styles",
            type: "textarea",
            required: false,
            placeholder: "e.g., A-line, Ballgown, Mermaid, Cheongsam"
        },
        {
            name: "alterationIncluded",
            label: "Basic Alteration Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "rentalDuration",
            label: "Standard Rental Duration",
            type: "text",
            required: false,
            placeholder: "e.g., 3 days, 5 days"
        },
        {
            name: "accessoriesIncluded",
            label: "Accessories Included (Veil, Petticoat)?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ],
    "Suit Tailor": [
        {
            name: "suitTypes",
            label: "Types of Suits Offered",
            type: "textarea",
            required: false,
            placeholder: "e.g., 2-piece, 3-piece, Tuxedo, Bespoke, Made-to-Measure"
        },
        {
            name: "fabricOptions",
            label: "Fabric Options Available",
            type: "text",
            required: false,
            placeholder: "e.g., Wool, Linen, Cotton blends (Optional)"
        },
        {
            name: "fittingsRequired",
            label: "Number of Fittings Typically Required",
            type: "integer",
            required: false,
            placeholder: "e.g., 2-3",
            min: 0
        },
        {
            name: "leadTime",
            label: "Typical Lead Time for Suit Completion",
            type: "text",
            required: false,
            placeholder: "e.g., 4-8 weeks"
        }
    ],
    "Catering Services": [
        {
            name: "cuisineTypes",
            label: "Cuisine Types Offered",
            type: "textarea",
            required: false,
            placeholder: "e.g., Chinese, Western, International Buffet, Halal options"
        },
        {
            name: "menuCustomization",
            label: "Menu Customization Available?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "foodTasting",
            label: "Food Tasting Session Provided?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "staffingIncluded",
            label: "Service Staff Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        },
        {
            name: "tablewareSetup",
            label: "Tableware and Setup Included?",
            type: "select",
            required: false,
            options: yesNoAddonOptions
        }
    ]
};
// 4. Predefined Inclusions (for Hybrid Model)
const predefinedInclusions = [
    {
        id: "consultation_pre",
        label: "Pre-Event Consultation"
    },
    {
        id: "high_res_photos",
        label: "High-Resolution Edited Photos"
    },
    {
        id: "online_gallery",
        label: "Online Gallery (Client Access)"
    },
    {
        id: "timeline_planning",
        label: "Timeline Planning Assistance"
    }
];
// 5. Predefined Add-ons (for Hybrid Model)
// defaultPrice and defaultDescription are optional and can be used to pre-fill add-on details in the form.
const predefinedAddons = [
    {
        id: "extra_hour_service",
        label: "Additional Hour of Service",
        defaultPrice: "100",
        defaultDescription: "One extra hour of on-site service."
    },
    {
        id: "raw_footage_access",
        label: "Raw Footage/Photos Access",
        defaultPrice: "150",
        defaultDescription: "Access to all unedited (RAW) footage or photos."
    },
    {
        id: "express_delivery",
        label: "Express Delivery of Final Product",
        defaultPrice: "200",
        defaultDescription: "Final product delivered in half the standard time."
    },
    {
        id: "second_photographer",
        label: "Second Photographer/Assistant",
        defaultPrice: "300",
        defaultDescription: "Ensures more coverage and different angles."
    }
];
// 6. Tier & Add-on Structure Configuration (Conceptual constants for form logic guidance)
const tierStructureConfig = {
    maxTiers: 3,
    defaultTierNames: [
        "Basic",
        "Standard",
        "Premium"
    ],
    fieldsPerTier: [
        {
            name: "tierName",
            label: "Package Name",
            type: "text",
            required: true
        },
        {
            name: "tierPrice",
            label: "Price",
            type: "number",
            required: true
        },
        {
            name: "tierDurationHours",
            label: "Duration in this Package (Hours)",
            type: "number",
            required: false
        },
        {
            name: "tierDescription",
            label: "Description of this Package",
            type: "textarea",
            required: false
        },
        {
            name: "tierInclusions",
            label: "What's Included in this Package",
            type: "hybridList",
            predefinedOptions: predefinedInclusions,
            required: false
        }
    ]
};
const alaCarteAddonStructureConfig = {
    fieldsPerAddon: [
        // For custom addons, name is text. For predefined, it's selected.
        {
            name: "addonName",
            label: "Add-on Service/Item",
            type: "hybridInput",
            predefinedOptions: predefinedAddons,
            required: true
        },
        {
            name: "addonPrice",
            label: "Price for this Add-on",
            type: "number",
            required: true
        },
        {
            name: "addonDescription",
            label: "Brief Description of Add-on",
            type: "textarea",
            required: false
        }
    ]
};
// Helper function to get all fields for a category (common + specific).
// If a category name is not found in weddingServiceFields, it defaults to returning only commonFields.
const getFieldsForCategory = (categoryName)=>{
    const categorySpecificFields = weddingServiceFields[categoryName] || [];
    if (!weddingServiceFields[categoryName] && categoryName) {
        console.warn(`No specific fields defined for category: "${categoryName}". Returning common fields only.`);
    }
    return [
        ...commonFields,
        ...categorySpecificFields
    ];
};


/***/ })

};
;