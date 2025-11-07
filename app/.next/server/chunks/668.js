"use strict";
exports.id = 668;
exports.ids = [668];
exports.modules = {

/***/ 7668:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1208);
/* harmony import */ var _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7211);
/* harmony import */ var _utils_chatApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5130);
/* harmony import */ var _MessageList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6266);
/* harmony import */ var _MessageInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4270);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_database__WEBPACK_IMPORTED_MODULE_2__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__, _utils_chatApi__WEBPACK_IMPORTED_MODULE_4__]);
([firebase_database__WEBPACK_IMPORTED_MODULE_2__, _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__, _utils_chatApi__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




 // Added addMessage as sendMessageApi


// Modified ChatWindow props: added isPageDisplay
const ChatWindow = ({ chatId , currentUserUid , onClose , isPageDisplay =false  })=>{
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [chatMetadata, setChatMetadata] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [isLoadingMetadata, setIsLoadingMetadata] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [isLoadingMessages, setIsLoadingMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [chatPartnerName, setChatPartnerName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("Chat");
    const [sendMessageError, setSendMessageError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""); // Optional: For displaying send errors in ChatWindow
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!chatId || !currentUserUid) {
            setError("Missing chat ID or user information.");
            setMessages([]);
            setChatMetadata(null);
            setIsLoading(false);
            setIsLoadingMetadata(false);
            setIsLoadingMessages(false);
            return;
        }
        // Reset state for new chat
        setError("");
        setMessages([]);
        setChatMetadata(null);
        setChatPartnerName("Chat");
        setIsLoading(true);
        setIsLoadingMetadata(true);
        setIsLoadingMessages(true);
        let metadataRef;
        // messagesQueryRef will be handled by getMessages from chatApi
        // let messagesQueryRef;
        try {
            metadataRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.ref)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_3__/* .database */ .Fs, `chats/${chatId}/metadata`);
        // messagesQueryRef = query(dbRef(database, `chats/${chatId}/messages`), orderByChild('timestamp')); // Handled by chatApi.getMessages
        } catch (e) {
            console.error("Error creating Firebase references:", e);
            setError("Invalid chat ID format or issue creating chat reference.");
            setIsLoading(false);
            setIsLoadingMetadata(false);
            setIsLoadingMetadata(false); // Keep this for metadata
            setIsLoadingMessages(false); // Keep this for messages initial state
            return;
        }
        const metadataListener = (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.onValue)(metadataRef, (snapshot)=>{
            if (snapshot.exists()) {
                const meta = snapshot.val();
                setChatMetadata(meta);
                if (meta.buyerId && meta.vendorId) {
                    setChatPartnerName(currentUserUid === meta.buyerId ? "Chat with Vendor" : "Chat with Buyer");
                }
            } else {
                setError("Chat details not found or access denied.");
                setChatMetadata(null);
            }
            setIsLoadingMetadata(false);
        }, (err)=>{
            console.error("Error fetching chat metadata:", err);
            setError("Failed to load chat details.");
            setChatMetadata(null);
            setIsLoadingMetadata(false);
        });
        // Use getMessages from chatApi for messages
        const unsubscribeMessages = (0,_utils_chatApi__WEBPACK_IMPORTED_MODULE_4__/* .getMessages */ ._U)(chatId, (loadedMessages, err)=>{
            if (err) {
                console.error("Error fetching messages via chatApi:", err);
                setError("Failed to load messages.");
                setMessages([]); // Clear messages on error
            } else {
                setMessages(loadedMessages);
            }
            setIsLoadingMessages(false);
        });
        return ()=>{
            if (metadataRef) {
                (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.off)(metadataRef, "value", metadataListener);
            }
            if (unsubscribeMessages && typeof unsubscribeMessages === "function") {
                unsubscribeMessages(); // Call the unsubscribe function returned by getMessages
            }
        };
    }, [
        chatId,
        currentUserUid
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isLoadingMetadata && !isLoadingMessages) {
            setIsLoading(false);
        }
    }, [
        isLoadingMetadata,
        isLoadingMessages
    ]);
    // useEffect for marking messages as read
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!messages || messages.length === 0 || !currentUserUid || !chatId || !chatMetadata) {
            return;
        }
        // Ensure current user is part of this chat based on metadata before trying to update read status
        const isCurrentUserBuyer = chatMetadata.buyerId === currentUserUid;
        const isCurrentUserVendor = chatMetadata.vendorId === currentUserUid;
        if (!isCurrentUserBuyer && !isCurrentUserVendor) {
            // console.warn("Mark as read: Current user is not a participant in this chat according to metadata.");
            return;
        }
        messages.forEach((message)=>{
            if (message.recipientId === currentUserUid && !message.isRead) {
                // Use markAsRead from chatApi
                (0,_utils_chatApi__WEBPACK_IMPORTED_MODULE_4__/* .markAsRead */ .zJ)(chatId, message.id, currentUserUid).then(()=>{
                // console.log(`Message ${message.id} marked as read via chatApi.`);
                // No need to update local state here, as getMessages listener will handle it
                }).catch((error)=>{
                    console.error(`Failed to mark message ${message.id} as read via chatApi:`, error);
                });
            }
        });
    }, [
        messages,
        currentUserUid,
        chatId,
        chatMetadata
    ]); // Added chatMetadata to dependencies
    const handleSendMessageInWindow = async (messageData)=>{
        if (!chatId) {
            console.error("ChatWindow: chatId is missing, cannot send message.");
            setSendMessageError("Chat ID is missing. Cannot send message."); // Update error state
            throw new Error("Chat ID is missing."); // Throw error to be caught by MessageInput if needed
        }
        setSendMessageError(""); // Clear previous errors
        try {
            await (0,_utils_chatApi__WEBPACK_IMPORTED_MODULE_4__/* .addMessage */ .Hz)(chatId, messageData.text, messageData.senderId, messageData.recipientId);
        // console.log("Message sent successfully from ChatWindow.");
        // MessageInput clears its own text. UI updates for sent status can be handled here or in MessageInput.
        } catch (error) {
            console.error("Error sending message from ChatWindow:", error);
            setSendMessageError(error.message || "Failed to send message."); // Update error state
            throw error; // Re-throw error to be caught by MessageInput
        }
    };
    const isChatReadOnly = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!chatMetadata || !chatMetadata.orderCompletedAt) return false;
        const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
        return Date.now() > chatMetadata.orderCompletedAt + twoDaysInMillis;
    }, [
        chatMetadata
    ]);
    const canDisplayChatContent = !isLoading && chatMetadata && !error;
    // Modified BaseContainer
    const BaseContainer = ({ children , titleOverride , headerBg ="bg-gray-700"  })=>{
        const containerClasses = isPageDisplay ? "w-full h-full bg-neutral-light dark:bg-neutral-dark flex flex-col border border-neutral-medium/30 dark:border-neutral-medium" // Page display styles
         : "fixed bottom-4 right-4 w-96 h-[500px] bg-neutral-light dark:bg-neutral-dark shadow-xl rounded-lg flex flex-col border border-neutral-medium/30 dark:border-neutral-medium z-50"; // Original pop-up styles
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: containerClasses,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                    className: `${headerBg === "bg-red-600" ? "bg-red-700 text-white" : "bg-neutral-dark text-neutral-light"} p-3 flex justify-between items-center ${isPageDisplay ? "rounded-t-lg" : "rounded-t-lg"}`,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: "font-semibold text-lg",
                            children: titleOverride || chatPartnerName
                        }),
                        (!isPageDisplay || isPageDisplay && onClose) && onClose && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: onClose,
                            className: "text-neutral-medium hover:text-neutral-light text-2xl leading-none focus:outline-none",
                            children: "\xd7"
                        })
                    ]
                }),
                children
            ]
        });
    };
    if (!chatId || !currentUserUid) {
        // For page display, we might want a different "empty" state or rely on the parent page to handle this.
        // For now, it will use BaseContainer which will adapt.
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BaseContainer, {
            titleOverride: "Chat Window",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-neutral-dark dark:text-neutral-light text-center",
                        children: "No chat selected. Please select a chat to view messages."
                    }),
                    onClose && !isPageDisplay && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: onClose,
                        className: "mt-4 px-4 py-2 bg-neutral-medium/30 text-neutral-dark dark:bg-neutral-medium dark:text-neutral-light rounded hover:bg-neutral-medium/50 dark:hover:bg-neutral-medium/70",
                        children: "Close"
                    })
                ]
            })
        });
    }
    if (isLoading) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BaseContainer, {
            titleOverride: "Loading Chat...",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-3"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-neutral-dark dark:text-neutral-light",
                        children: "Loading chat..."
                    })
                ]
            })
        });
    }
    if (error && !chatMetadata) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BaseContainer, {
            titleOverride: "Chat Error",
            headerBg: "bg-red-600",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark text-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-red-700 dark:text-error",
                        children: error
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-sm text-neutral-medium dark:text-neutral-light mt-1",
                        children: "Please try again or select a different chat."
                    }),
                    onClose && !isPageDisplay && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: onClose,
                        className: "mt-4 px-4 py-2 bg-primary text-primary-darker dark:bg-primary-darker dark:text-white rounded hover:bg-primary-darker dark:hover:bg-primary",
                        children: "Close"
                    })
                ]
            })
        });
    }
    // If metadata is null but there's no specific error string, and not loading.
    // This could mean the chat simply doesn't exist or access was denied quietly.
    if (!chatMetadata && !isLoading && !error) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BaseContainer, {
            titleOverride: "Chat Unavailable",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-grow flex flex-col justify-center items-center p-4 bg-neutral-light dark:bg-neutral-dark text-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-neutral-dark dark:text-neutral-light",
                        children: "Chat data is not available for this selection."
                    }),
                    onClose && !isPageDisplay && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: onClose,
                        className: "mt-4 px-4 py-2 bg-primary text-primary-darker dark:bg-primary-darker dark:text-white rounded hover:bg-primary-darker dark:hover:bg-primary",
                        children: "Close"
                    })
                ]
            })
        });
    }
    // Main content rendering when chat is available
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(BaseContainer, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_MessageList__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                messages: messages,
                currentUserUid: currentUserUid
            }),
            error && chatMetadata && isLoadingMessages && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "p-2 text-center text-xs text-red-700 dark:text-error bg-error/20 dark:bg-red-800/30 border-t border-neutral-medium/30 dark:border-neutral-medium",
                children: [
                    "Error loading messages: ",
                    error
                ]
            }),
            chatMetadata && (isChatReadOnly() ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "p-3 text-center text-sm text-amber-700 dark:text-warning bg-warning/20 dark:bg-amber-800/30 border-t border-amber-300 dark:border-amber-700",
                children: "This chat is read-only. Messaging is closed for this order (2 days after completion)."
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_MessageInput__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                chatId: chatId,
                currentUserUid: currentUserUid,
                chatMetadata: chatMetadata,
                onSendMessage: handleSendMessageInWindow
            })),
            sendMessageError && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "p-2 text-center text-xs text-red-700 dark:text-error bg-error/20 dark:bg-red-800/30 border-t border-neutral-medium/30 dark:border-neutral-medium",
                children: [
                    "Error sending: ",
                    sendMessageError
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatWindow);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// Removed: ref, push, serverTimestamp from firebase/database
// Removed: database from '../../utils/firebaseConfig'
// No direct Firebase imports needed if onSendMessage handles everything.
const MessageInput = ({ chatId , currentUserUid , chatMetadata , onSendMessage  })=>{
    const [inputText, setInputText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isSending, setIsSending] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handleSendMessage = async (e)=>{
        e.preventDefault();
        if (!inputText.trim()) {
            setError("Message cannot be empty.");
            return;
        }
        // Client-side validation for contact details
        // Regexps should match those in database rules
        const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
        const phoneRegex = /\b\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/i;
        if (emailRegex.test(inputText)) {
            setError("Sharing email addresses is not allowed.");
            return;
        }
        if (phoneRegex.test(inputText)) {
            setError("Sharing phone numbers is not allowed.");
            return;
        }
        // Client-side validation for 2-day rule
        if (!chatMetadata) {
            setError("Chat information is not available. Cannot send message.");
            // This case should ideally be prevented by ChatWindow not rendering MessageInput if metadata is missing
            return;
        }
        if (chatMetadata.orderCompletedAt) {
            const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
            if (Date.now() > chatMetadata.orderCompletedAt + twoDaysInMillis) {
                setError("Messaging is closed for this order (2 days after completion).");
                return;
            }
        }
        // If orderCompletedAt is null/undefined, messaging is allowed.
        setIsSending(true);
        setError("");
        // Determine recipientId
        if (!chatMetadata || !chatMetadata.buyerId || !chatMetadata.vendorId) {
            setError("Chat metadata is incomplete. Cannot determine recipient.");
            setIsSending(false);
            return;
        }
        const recipientId = chatMetadata.buyerId === currentUserUid ? chatMetadata.vendorId : chatMetadata.buyerId;
        if (recipientId === currentUserUid) {
            setError("Recipient cannot be the same as the sender.");
            // This case should ideally not happen if chatMetadata is correctly structured
            // and currentUserUid is one of the participants.
            setIsSending(false);
            return;
        }
        // Construct only the data needed by onSendMessage callback
        const messagePayload = {
            senderId: currentUserUid,
            recipientId: recipientId,
            text: inputText.trim()
        };
        try {
            if (!onSendMessage) {
                setError("Cannot send message: Send handler is missing.");
                setIsSending(false);
                return;
            }
            // Call the passed-in handler
            await onSendMessage(messagePayload);
            setInputText("");
        } catch (err) {
            console.error("Error sending message via onSendMessage:", err);
            // The parent component (ChatWindow) should handle specific errors from the API call.
            // MessageInput can display a generic error or one passed back from the parent if desired.
            setError(err.message || "Failed to send message. Please try again.");
        } finally{
            setIsSending(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        onSubmit: handleSendMessage,
        className: "p-3 border-t border-neutral-medium/30 dark:border-neutral-medium bg-neutral-light dark:bg-neutral-dark",
        children: [
            " ",
            error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-red-700 dark:text-error text-xs mb-2 px-1",
                children: error
            }),
            " ",
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "text",
                        value: inputText,
                        onChange: (e)=>{
                            setInputText(e.target.value);
                            if (error) setError(""); // Clear error when user starts typing
                        },
                        placeholder: "Type your message...",
                        className: "flex-grow w-full px-3 py-2 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg shadow-sm bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-light/70 dark:disabled:bg-neutral-dark/70",
                        disabled: isSending,
                        onKeyPress: (e)=>{
                            if (e.key === "Enter" && !e.shiftKey) {
                                handleSendMessage(e);
                            }
                        }
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "submit",
                        disabled: isSending || !inputText.trim(),
                        className: "inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-darker text-primary-darker dark:text-white dark:bg-primary-darker dark:hover:bg-primary font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed" // Enhanced disabled state
                        ,
                        children: isSending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                    className: "animate-spin -ml-1 mr-2 h-5 w-5 text-primary-darker dark:text-white",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                                            className: "opacity-25",
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        })
                                    ]
                                }),
                                "Sending..."
                            ]
                        }) : "Send"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageInput);


/***/ }),

/***/ 6266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const MessageList = ({ messages , currentUserUid  })=>{
    const messagesEndRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        scrollToBottom();
    }, [
        messages
    ]); // Dependency array ensures this runs when messages change
    if (!messages || messages.length === 0) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex-grow p-4 overflow-y-auto flex justify-center items-center bg-neutral-light dark:bg-neutral-dark",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-neutral-medium dark:text-neutral-light italic",
                children: "No messages yet. Start the conversation!"
            })
        });
    }
    const formatTimestamp = (timestamp)=>{
        if (!timestamp) return "";
        // Check if timestamp is a number (Firebase RTDB server timestamp) or a Firestore Timestamp object
        const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-grow p-4 overflow-y-auto space-y-3 bg-neutral-light dark:bg-neutral-dark",
        children: [
            " ",
            messages.map((msg)=>{
                if (!msg || !msg.id) {
                    console.warn("Invalid message object:", msg);
                    return null;
                }
                const isCurrentUser = msg.senderId === currentUserUid;
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `flex ${isCurrentUser ? "justify-end" : "justify-start"}`,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `max-w-xs sm:max-w-sm md:max-w-md px-3 py-2 rounded-lg shadow-md ${isCurrentUser ? "bg-primary text-primary-darker dark:bg-primary-darker dark:text-white" // Darker blue for better contrast
                         : "bg-neutral-light border border-neutral-medium/40 text-neutral-dark dark:bg-neutral-medium dark:text-neutral-light dark:border-neutral-dark"}`,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-sm break-words",
                                children: msg.text
                            }),
                            " ",
                            msg.timestamp && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: `text-xs mt-1 ${isCurrentUser ? "text-primary-darker opacity-70 dark:text-white dark:opacity-70" : "text-neutral-medium opacity-70 dark:text-neutral-light dark:opacity-70"} text-right`,
                                children: formatTimestamp(msg.timestamp)
                            })
                        ]
                    })
                }, msg.id);
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                ref: messagesEndRef
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageList);


/***/ })

};
;