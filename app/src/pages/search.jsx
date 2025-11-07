import SearchGridItem from "../components/Search/SearchGridItem";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { searchServices } from "../utils/api";

function Search() {
  const router = useRouter();
  const { category, q } = router.query; // q is the search term
  const [services, setServices] = useState(undefined);

  // Helper function to get today's date in SGT as YYYY-MM-DD string
  const getTodaySGTString = () => {
    const today = new Date();
    const sgtDate = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
    const year = sgtDate.getFullYear();
    const month = (sgtDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = sgtDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todaySGT = getTodaySGTString();

  // Initialize searchDate with today's date in SGT
  const [searchDate, setSearchDate] = useState(todaySGT);

  useEffect(() => {
    const getData = async () => {
      try {
        // Pass category, searchTerm (q), and serviceDate to searchServices
        const data = await searchServices({ category, searchTerm: q, serviceDate: searchDate });
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setServices([]); // Set to empty array on error to avoid crash
      }
    };
    // Trigger search if category or searchTerm is present, or if searchDate changes
    if (category || q || searchDate) {
      getData();
    } else if (!category && !q && !searchDate && services === undefined) {
      // Initial load with no params, maybe set services to empty or handle as needed
      setServices([]);
    }
  }, [category, q, searchDate]); // Add searchDate to dependency array

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-24 mb-24 mt-8">
      {/* Search Term Display */}
      {q && (
        <h3 className="text-2xl sm:text-3xl md:text-4xl mb-2 dark:text-gray-100">
          Results for <strong>{q}</strong>
        </h3>
      )}
      {/* Category Display */}
      {category && (
        <p className="text-lg sm:text-xl mb-4 dark:text-gray-300">
          In category: <strong>{category}</strong>
        </p>
      )}

      {/* Date Filter Input */}
      <div className="my-4">
        <label htmlFor="searchDate" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">
          Filter by date:
        </label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={handleDateChange}
          min={todaySGT} // Set the minimum selectable date to today
          className="px-4 py-2 border border-neutral-medium/50 dark:border-neutral-medium rounded-lg bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Services Display */}
      {services === undefined && <p className="dark:text-gray-300">Loading services...</p>}
      {services && (
        <div>
          <div className="my-4">
            <span className="text-[#74767e] dark:text-gray-400 font-medium text-sm sm:text-base">
              {services.length} service{services.length !== 1 ? 's' : ''} available
            </span>
          </div>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {services.map((service) => (
                <SearchGridItem
                  service={service}
                  key={service.id}
                  searchDate={searchDate}
                />
              ))}
            </div>
          ) : (
            <p className="dark:text-gray-300">No services found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
