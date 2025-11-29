import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStateProvider } from "../../../context/StateContext";
import { getService, editService, uploadServiceImagesAPI } from "../../../utils/api.js"; // Corrected API import
import MultiStepServiceForm from "../../../components/Services/MultiStepServiceForm"; // Import MultiStepServiceForm
import { toast } from "react-toastify";
// import { validateServiceInput } from "../../../utils/validators"; // Validator needs to be updated for new model

// Initial state aligned with MultiStepServiceForm and new data model
const initialDataState = {
  title: "",
  category: "",
  subCategory: "",
  description: "",
  searchTags: [],
  images: [],
  serviceType: "online",
  location: null,
  deliveryDays: "",
  tiers: [],
  addons: [],
  disabled: false,
  // Fields from serviceFieldDefinitions based on category might be populated here or handled by form
};

function EditServicePage() {
  const [{ user }] = useStateProvider();
  const router = useRouter();
  const { serviceId, groupIndex } = router.query; // Get groupIndex

  const [data, setData] = useState(initialDataState);
  const [loading, setLoading] = useState(true);
  const [formKey, setFormKey] = useState(Date.now());

  useEffect(() => {
    if (serviceId && user?.uid) {
      const fetchServiceData = async () => {
        setLoading(true);
        try {
          const serviceDetails = await getService(serviceId);
          if (serviceDetails) {
            if(serviceDetails.userId !== user.uid) {
              toast.error("You are not authorized to edit this service.");
              router.push("/seller/services");
              return;
            }

            const populatedData = {
              ...initialDataState,
              title: serviceDetails.title || "",
              category: serviceDetails.category || "",
              subCategory: serviceDetails.subCategory || "",
              description: serviceDetails.description || "",
              searchTags: serviceDetails.searchTags || [],
              images: serviceDetails.images || [],
              serviceType: serviceDetails.serviceType || "online",
              location: serviceDetails.location || null,
              deliveryDays: serviceDetails.deliveryDays || "",
              tiers: serviceDetails.tiers || [],
              addons: serviceDetails.addons || [],
              disabled: serviceDetails.disabled || false,
            };

            for (const key in serviceDetails) {
                if (Object.prototype.hasOwnProperty.call(serviceDetails, key) && !Object.prototype.hasOwnProperty.call(populatedData, key)) {
                    populatedData[key] = serviceDetails[key];
                }
            }

            setData(populatedData);
            setFormKey(Date.now());
          } else {
            toast.error("Service not found.");
            router.push("/seller/services");
          }
        } catch (error) {
          console.error("Error fetching service details:", error);
          toast.error("Failed to load service data. " + (error.message || ""));
          router.push("/seller/services");
        } finally {
          setLoading(false);
        }
      };
      fetchServiceData();
    } else if (!serviceId) {
        toast.error("Service ID not provided.");
        router.push("/seller/services");
        setLoading(false);
    }
  }, [serviceId, router, user?.uid, groupIndex]); // Added groupIndex to ensure it's available, though not directly used in fetch here


  const handleFormSubmit = async (formDataFromForm) => {
    setLoading(true);

    if (groupIndex === undefined || groupIndex === null) {
      toast.error("Group index is missing. Cannot update service.");
      setLoading(false);
      return;
    }

    // TODO: Update or implement validation for the new formDataFromForm structure
    // const {isValid, errors} = validateServiceInput(formDataFromForm);
    // if (!isValid) {
    //   Object.values(errors).forEach(err => toast.error(err));
    //   setLoading(false);
    //   return;
    // }

    try {
      // Assuming MultiStepServiceForm handles image uploads internally or prepares them.
      // It should provide a final `images` array of URLs in `formDataFromForm`.
      const finalImageUrls = formDataFromForm.images || [];

      const payload = { ...formDataFromForm, images: finalImageUrls };

      delete payload.currentStep; // Remove form-specific temp fields

      await editService({ serviceId, ...payload, groupIndex: parseInt(String(groupIndex), 10) });
      toast.success("Service updated successfully!");
      router.push("/seller/services");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service. " + (error.message || "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  // Initial loading state before any data is fetched or if critical IDs are missing
  if ((loading && !data.title && (!data.images || data.images.length === 0) && data.category === "") || !serviceId || !user?.uid) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl dark:text-white">Loading service details or waiting for user info...</div>
      </div>
    );
  }

  // If not loading, but still no essential data (e.g., fetch failed, or service not found)
  if (!loading && (!data.title || data.category === "")) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="text-xl text-red-500 dark:text-red-400">Service not found or failed to load.</div>
            <button onClick={() => router.push("/seller/services")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to My Services
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Edit Your Service</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Update the details of your service listing.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
          {/* Render MultiStepServiceForm only when data is loaded and valid */}
          { !loading && data.title && data.category && (
            <MultiStepServiceForm
              key={formKey}
              initialData={data} // data.images is now the source of truth
              onSubmit={handleFormSubmit}
              isEditMode={true}
              // existingImageUrls prop removed
              serviceId={serviceId}
              user={user}
              setParentLoading={setLoading}
            />
          )}
          {loading && <div className="text-center dark:text-white py-10">Loading form...</div>}
        </div>
      </div>
    </div>
  );
}

export default EditServicePage;
