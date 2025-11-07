// @ts-nocheck
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function ImageUpload({
  files, // New files (File objects)
  setFile, // Function to update new files state in parent
  existingImages = [], // Array of URLs for existing images
  setExistingImages, // Function to update existing images state in parent (by removing a URL)
  maxFiles = 5,
  maxSizeMB = 2,
  // isEditMode = false // This prop can be used for conditional UI if needed later
}) {
  const [crop, setCrop] = useState();
  const [imgSrc, setImgSrc] = useState('');
  const [currentFileForCrop, setCurrentFileForCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const currentTotalImages = (existingImages?.length || 0) + (files?.length || 0);

  const handleFile = (e) => {
    const selectedFilesInput = Array.from(e.target.files);
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    if (selectedFilesInput.length === 0) {
      return;
    }

    // If already cropping, prevent adding more files until current crop is handled
    if (showCropper) {
      toast.info("Please confirm or cancel the current crop before adding more images.");
      e.target.value = null; // Reset file input
      return;
    }

    // If max total images already met (considering files passed from parent and existing ones)
    if (currentTotalImages >= maxFiles) {
      toast.error(`You can upload a maximum of ${maxFiles} images.`);
      e.target.value = null;
      return;
    }

    // Handle single file for cropping
    if (selectedFilesInput.length === 1) {
      const file = selectedFilesInput[0];

      if (!validImageTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported image type.`);
        e.target.value = null;
        return;
      }
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > maxSizeMB) {
        toast.error(`${file.name} exceeds ${maxSizeMB}MB limit.`);
        e.target.value = null;
        return;
      }

      // Check if adding this one file would exceed total max
      if (currentTotalImages + 1 > maxFiles) {
        toast.error(`Adding this image would exceed the maximum of ${maxFiles} images.`);
        e.target.value = null;
        return;
      }

      setCurrentFileForCrop(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
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

    for (let file of selectedFilesInput) {
      if ((existingImages?.length || 0) + newFilesCount >= maxFiles) {
        toast.warn(`Cannot add ${file.name}. Maximum of ${maxFiles} images reached.`);
        break;
      }
      if (!validImageTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported image type.`);
        continue;
      }
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > maxSizeMB) {
        toast.error(`${file.name} exceeds ${maxSizeMB}MB limit.`);
        continue;
      }
      filteredFiles.push(file);
      newFilesCount++;
    }

    if (filteredFiles.length > 0) {
      const totalAfterAddingNew = (existingImages?.length || 0) + (files?.length || 0) + filteredFiles.length;
      if (totalAfterAddingNew > maxFiles) {
           const canAddCount = maxFiles - ((existingImages?.length || 0) + (files?.length || 0));
           toast.warn(`You can only add ${canAddCount} more image(s). Some files were not added.`);
           setFile([...(files || []), ...filteredFiles.slice(0, canAddCount)]);
      } else {
          setFile([...(files || []), ...filteredFiles]);
      }
    }
    e.target.value = null; // Reset file input for multiple files or if no single file was set for crop
  };

  const removeNewImage = (fileName) => {
    setFile(files.filter((file) => file.name !== fileName));
  };

  const removeExistingImage = (imageUrl) => {
    if (typeof setExistingImages === 'function') {
      setExistingImages(imageUrl);
    }
  };

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    if (width === 0 || height === 0) return; // Prevent error with empty image
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90, // Default crop width percentage
        },
        1, // Aspect ratio 1:1
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
  }, []);

  const handleCropConfirm = async () => {
    if (crop && currentFileForCrop && imgSrc && crop.width && crop.height) {
      try {
        const croppedImageBlob = await getCroppedImg(imgSrc, crop, currentFileForCrop.name);
        const croppedFile = new File([croppedImageBlob], currentFileForCrop.name, {
          type: croppedImageBlob.type,
          lastModified: Date.now(),
        });

        // Add the new cropped file to the parent's state
        setFile([...(files || []), croppedFile]);

        // Reset cropper states
        setShowCropper(false);
        setImgSrc('');
        setCurrentFileForCrop(null);
        setCrop(undefined);
        toast.success(`"${croppedFile.name}" cropped and added.`);
      } catch (e) {
        console.error("Cropping error:", e);
        toast.error("Error cropping image. Please try again.");
        // Optionally, reset cropper on error too
        setShowCropper(false);
        setImgSrc('');
        setCurrentFileForCrop(null);
        setCrop(undefined);
      }
    } else {
      toast.warn("Crop selection is not valid.");
    }
    // Reset file input to allow selecting the same file again
    const fileInput = document.querySelector('input[type="file"][name="files[]"]');
    if (fileInput) fileInput.value = null;
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImgSrc('');
    setCurrentFileForCrop(null);
    setCrop(undefined);
    toast.info("Image cropping cancelled.");
    // Reset file input
    const fileInput = document.querySelector('input[type="file"][name="files[]"]');
    if (fileInput) fileInput.value = null;
  };

  // Utility function to get cropped image (must be defined within component or imported)
  async function getCroppedImg(imageSrc, pixelCrop, fileName) {
    return new Promise((resolve, reject) => {
      const image = document.createElement('img'); // Use document.createElement
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');

        // Ensure the image has loaded and has dimensions
        if (image.naturalWidth === 0 || image.naturalHeight === 0 || !image.width || !image.height) {
          return reject(new Error('Image has no dimensions or has not loaded properly.'));
        }

        // Handle potential issues if pixelCrop dimensions are not set (though ReactCrop usually does)
        if (!pixelCrop || typeof pixelCrop.width !== 'number' || typeof pixelCrop.height !== 'number' || typeof pixelCrop.x !== 'number' || typeof pixelCrop.y !== 'number') {
          return reject(new Error('Invalid crop dimensions.'));
        }

        // Scale crop coordinates to natural image size
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = Math.floor(pixelCrop.width * scaleX);
        canvas.height = Math.floor(pixelCrop.height * scaleY);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Failed to get 2D context from canvas.'));
        }

        ctx.drawImage(
          image,
          pixelCrop.x * scaleX,
          pixelCrop.y * scaleY,
          pixelCrop.width * scaleX,
          pixelCrop.height * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );

        canvas.toBlob(blob => {
          if (!blob) {
            return reject(new Error('Canvas to Blob conversion failed.'));
          }
          // The 'name' property is not standard on Blob. File object is created later.
          resolve(blob);
        }, 'image/jpeg', 0.9); // Adjust type and quality as needed
      };
      image.onerror = (error) => {
        console.error("Image load error for cropping:", error);
        reject(new Error('Image failed to load for cropping.'));
      };
    });
  }

  return (
    <div>
      {showCropper && imgSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-xl w-full">
            <p className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">Crop Image</p>
            <div style={{ width: '100%', maxHeight: '60vh', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCrop(c)}
                aspect={1}
                minWidth={100} // Min crop size in px
                minHeight={100}
              >
                <img
                  src={imgSrc}
                  onLoad={onImageLoad}
                  alt="Crop preview"
                  style={{ display: 'block', maxHeight: '55vh', maxWidth: '100%', objectFit: 'contain' }}
                />
              </ReactCrop>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={handleCropConfirm}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Confirm Crop
              </button>
              <button
                type="button"
                onClick={handleCropCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`flex items-center px-3 ${showCropper ? 'hidden' : ''}`}> {/* Hide uploader when cropper is active */}
        <div className="rounded-lg bg-gray-50 dark:bg-slate-800 w-full">
          <div className="m-4">
            <div className="flex items-center justify-center w-full">
              <label className={`flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed border-gray-300 dark:border-gray-600 ${currentTotalImages >= maxFiles ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'}`}>
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 dark:text-neutral-light group-hover:text-gray-500 dark:group-hover:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 dark:text-neutral-light group-hover:text-gray-500 dark:group-hover:text-gray-300">
                    {currentTotalImages >= maxFiles ? "Max images reached" : (files?.length > 0 ? "Add more photos" : "Select a photo (or more)")}
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFile}
                  className="opacity-0"
                  multiple // Keep multiple to allow selection, logic handles 1 vs many
                  name="files[]" // Ensure this name is unique or handled if multiple inputs exist
                  accept="image/png, image/jpeg, image/gif"
                  disabled={currentTotalImages >= maxFiles || showCropper}
                />
              </label>
            </div>

            {/* Display Existing Images - No changes here, ensure it's outside the cropper conditional rendering */}
            {existingImages && existingImages.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Current Images:</p>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((url, idx) => (
                    <div key={`existing-${idx}`} className="overflow-hidden relative group">
                      <button
                        type="button"
                        onClick={() => removeExistingImage(url)}
                        className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                        aria-label="Remove existing image"
                      >
                        ✕
                      </button>
                      <div className="relative h-20 w-20 rounded-md border border-gray-200 dark:border-gray-600">
                        <Image src={url} layout="fill" alt="Existing Service Image" className="object-cover rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display New File Previews */}
            {files && files.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">New Images to Upload:</p>
                <div className="flex flex-wrap gap-2">
                  {files.map((file, idx) => (
                    <div key={`new-${idx}`} className="overflow-hidden relative group">
                      <button
                        type="button"
                        onClick={() => removeNewImage(file.name)}
                        className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                        aria-label="Remove new image"
                      >
                        ✕
                      </button>
                      <div className="relative h-20 w-20 rounded-md border border-gray-200 dark:border-gray-600">
                        <Image src={URL.createObjectURL(file)} layout="fill" alt="New Service Image" className="object-cover rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 dark:text-neutral-light mt-2 text-center">
              {currentTotalImages}/{maxFiles} images
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
