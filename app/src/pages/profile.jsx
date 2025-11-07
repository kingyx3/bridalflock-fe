import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { setUser } from "../utils/api"; // Removed updateUserAvatarApi
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react"; // Ensure useState is imported
import { ref, uploadBytes } from "firebase/storage"; // Removed getDownloadURL
import { storage } from "../utils/firebaseConfig";
import AvatarImage from "../components/AvatarImage";
import { toast } from "react-toastify";

function Profile() {
  const router = useRouter();
  const { new: newUser } = router.query;
  const [{ user }, dispatch] = useStateProvider();

  const [isLoaded, setIsLoaded] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(null); // Consolidated image state
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const userNameRef = useRef(null); // for scroll/focus on error
  const initializedRef = useRef(false); // Track if we've initialized from user data
  const [data, setData] = useState({
    userName: "",
    description: "",
  });

  useEffect(() => {
    if (user && !initializedRef.current) {
      // Only initialize once when user data first becomes available
      setData({
        userName: user?.userName || "",
        description: user?.description || "",
      });
      if (user?.avatar) {
        setAvatarSrc(user.avatar);
      }
      setIsLoaded(true);
      initializedRef.current = true;
    } else if (!user && initializedRef.current) {
      // Reset if user logs out
      initializedRef.current = false;
      setIsLoaded(false);
    }
  }, [user]);

  // Handle cleanup for object URLs
  useEffect(() => {
    return () => {
      if (avatarSrc && avatarSrc.startsWith('blob:')) {
        URL.revokeObjectURL(avatarSrc);
      }
    };
  }, [avatarSrc]);

  useEffect(() => {
    // Debounced check for changes to reduce flickering
    const timeoutId = setTimeout(() => {
      const hasFormChanged =
        data.userName !== (user?.userName || "") ||
        data.description !== (user?.description || "") ||
        (avatarSrc && avatarSrc.startsWith('blob:')); // Check if new image is selected

      setHasChanged(hasFormChanged);
    }, 100); // Small delay to debounce rapid state changes

    return () => clearTimeout(timeoutId);
  }, [data, user, avatarSrc]);

  const handleImageUploadAndSave = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"];
    if (!validImageTypes.includes(file.type)) {
      setErrorMessage("Please upload a valid image (JPEG, PNG, GIF, or WebP)");
      e.target.value = null;
      return;
    }
    setErrorMessage("");

    // Immediately show preview to user for better UX
    const previewUrl = URL.createObjectURL(file);
    setAvatarSrc(previewUrl);

    const toastId = toast.loading("Uploading avatar...");
    try {
      const imagePath = `users/${user?.uid}/avatar/0`;
      const imageRef = ref(storage, imagePath);
      
      await uploadBytes(imageRef, file);

      // Create cache-busted URL
      let newDisplayAvatarUrl;
      if (user?.avatar) {
        const url = new URL(user.avatar);
        url.searchParams.set('updated', Date.now());
        if (!url.searchParams.has('alt')) {
          url.searchParams.set('alt', 'media');
        }
        newDisplayAvatarUrl = url.toString();
      } else {
        newDisplayAvatarUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(`users/${user?.uid}/avatar/0`)}?alt=media&updated=${Date.now()}`;
      }

      // Update context with new URL
      dispatch({
        type: reducerCases.SET_USER,
        user: {
          ...user,
          avatar: newDisplayAvatarUrl,
        },
      });

      // Clean up preview URL and set final URL
      URL.revokeObjectURL(previewUrl);
      setAvatarSrc(newDisplayAvatarUrl);

      toast.update(toastId, { render: "Avatar updated successfully!", type: "success", isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error("Error uploading image:", error);
      // Revert to original avatar on error
      setAvatarSrc(user?.avatar || null);
      URL.revokeObjectURL(previewUrl);
      toast.update(toastId, { render: "Failed to update avatar. Please try again.", type: "error", isLoading: false, autoClose: 5000 });
    } finally {
      e.target.value = '';
    }
  };

  const handleFile = (e) => {
    handleImageUploadAndSave(e);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "userName" && errorMessage) {
      setErrorMessage("");
    }
  };

  // Removed uploadImageToFirebase function as its logic is now in handleImageUploadAndSave

  const setProfile = async () => {
    if (!hasChanged) {
      toast.info("No changes to save.");
      return;
    }

    if (!data.userName.trim()) {
      setErrorMessage("Username is required");
      userNameRef.current?.focus();
      userNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await setUser({ ...data });

      if (response.userNameError) {
        setErrorMessage("Username is already taken");
        userNameRef.current?.focus();
        setIsSubmitting(false);
        return;
      }

      dispatch({
        type: reducerCases.SET_USER,
        user: {
          ...user,
          ...data,
        },
      });

      toast.success("Profile updated successfully!");
      if (newUser) {
        router.push("/");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setErrorMessage("An error occurred while updating profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-neutral-dark flex items-center justify-center p-4 md:p-8">
      {isLoaded && (
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-primary-darker p-6 text-center"> {/* This gradient should be fine for dark mode too */}
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {user?.userName ? "Update Your Profile" : "Complete Your Profile"}
            </h2>
            <p className="mt-2 text-blue-100">
              {user?.userName
                ? "Make changes to your profile information"
                : "Let's get to know you better"}
            </p>
          </div>

          <div className="p-6 md:p-8">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-700 rounded-lg">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">{errorMessage}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex justify-center">
                <AvatarImage
                  src={avatarSrc}
                  email={user?.email}
                  editable={true}
                  onFileChange={handleFile}
                  size={160}
                />
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400">@</span>
                    </div>
                    <input
                      ref={userNameRef}
                      type="text"
                      name="userName"
                      id="userName"
                      value={data.userName}
                      onChange={handleChange}
                      autoComplete="username"
                      className="block w-full pl-8 pr-3 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-darker focus:border-primary-darker transition"
                      placeholder="yourusername"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user?.email || ""}
                    readOnly
                    autoComplete="email"
                    className="block w-full px-4 py-3 border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 rounded-lg focus:ring-0 focus:border-gray-300 cursor-not-allowed transition"
                    placeholder="your.email@example.com"
                  />
                </div>


                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    About You
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={data.description}
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full px-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-darker focus:border-primary-darker transition"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={setProfile}
                  disabled={isSubmitting || !hasChanged}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium text-white transition flex items-center justify-center ${
                    isSubmitting || !hasChanged
                      ? "bg-primary/70 dark:bg-primary-darker/50 text-white/70 dark:text-white/50 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-darker text-white dark:text-white shadow-md hover:shadow-lg dark:bg-primary-darker dark:hover:bg-primary"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </button>

                <button
                  onClick={() => router.push("/")}
                  disabled={!!newUser}
                  className={`flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                    newUser && "cursor-not-allowed opacity-50"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;