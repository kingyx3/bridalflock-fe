import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Details from './Details';
import '@testing-library/jest-dom';

// Mock useStateProvider
const mockUseStateProvider = jest.fn();
jest.mock('../../context/StateContext', () => ({
  useStateProvider: () => mockUseStateProvider(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, objectFit, priority, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />; // objectFit and priority are omitted
  },
}));

// Mock child components
const MockAddReview = () => <div>Mocked AddReview</div>;
MockAddReview.displayName = 'MockAddReview';
jest.mock('../../components/Services/AddReview', () => MockAddReview);

const MockReviews = () => <div>Mocked Reviews</div>;
MockReviews.displayName = 'MockReviews';
jest.mock('../../components/Services/Reviews', () => MockReviews);

const MockUserAvatar = ({ user, size }) => `UserAvatar[${user?.fullName || 'No User'}-${size}]`;
MockUserAvatar.displayName = 'MockUserAvatar';
jest.mock('../UserAvatar', () => MockUserAvatar);

const MockStarRating = ({ rating }) => `StarRating[${rating}]`;
MockStarRating.displayName = 'MockStarRating';
jest.mock('../StarRating', () => MockStarRating);

describe('Details Component', () => {
  const baseServiceData = {
    title: 'Test Service Title',
    description: 'Main service description.',
    images: ['image1.jpg', 'image2.jpg'],
    reviewsCount: 10,
    ratingSum: 45, // Average 4.5
    averageRating: 4.5, // Used in "About the Seller"
    totalReviews: 5,    // Used in "About the Seller"
  };

  const createdByData = {
    fullName: 'Test Seller Name',
    userName: 'testseller',
    description: 'Seller description.',
  };

  beforeEach(() => {
    // Reset mocks before each test
    mockUseStateProvider.mockReset();
  });

  test('Test Case 1: Renders correctly with complete data', () => {
    mockUseStateProvider.mockReturnValue([{ serviceData: { ...baseServiceData, createdBy: createdByData } }]);
    render(<Details reviewEligibility={true} />);

    // Check service title
    expect(screen.getByText('Test Service Title')).toBeInTheDocument();

    // Check seller info in the top section
    // To distinguish from "About the Seller" section, we can grab the parent div of the first UserAvatar
    const topSellerInfoSection = screen.getByText('UserAvatar[Test Seller Name-30]').closest('.flex.items-center.gap-2.flex-wrap');
    expect(within(topSellerInfoSection).getByText('Test Seller Name')).toBeInTheDocument();
    expect(within(topSellerInfoSection).getByText('@testseller')).toBeInTheDocument();
    expect(within(topSellerInfoSection).getByText('StarRating[4.5]')).toBeInTheDocument();


    // Check main image (alt text is "Service")
    expect(screen.getByAltText('Service')).toHaveAttribute('src', 'image1.jpg');

    // Check thumbnails (alt text is "service thumbnail")
    // There should be 2 thumbnails if images.length > 1
    expect(screen.getAllByAltText('service thumbnail')).toHaveLength(2);

    // Check service description
    expect(screen.getByText('Main service description.')).toBeInTheDocument();

    // Check "About the Seller" section
    const aboutSellerSection = screen.getByText('About the Seller').closest('div');
    expect(within(aboutSellerSection).getByText('Test Seller Name')).toBeInTheDocument();
    expect(within(aboutSellerSection).getByText('@testseller')).toBeInTheDocument();
    expect(within(aboutSellerSection).getByText('Seller description.')).toBeInTheDocument();
    expect(within(aboutSellerSection).getByText('UserAvatar[Test Seller Name-100]')).toBeInTheDocument();
    expect(within(aboutSellerSection).getByText('StarRating[4.5]')).toBeInTheDocument(); // About seller

    // Check other rendered mocks
    expect(screen.getByText('Mocked Reviews')).toBeInTheDocument();
    expect(screen.getByText('Mocked AddReview')).toBeInTheDocument();
  });

  test('Test Case 2: Renders fallback text when createdBy is null', () => {
    mockUseStateProvider.mockReturnValue([{ serviceData: { ...baseServiceData, createdBy: null } }]);
    render(<Details reviewEligibility={true} />);

    expect(screen.getByText('Test Service Title')).toBeInTheDocument();

    // Check for fallback text for seller info
    const topSellerInfoSection = screen.getByText('UserAvatar[No User-30]').closest('.flex.items-center.gap-2.flex-wrap');
    expect(within(topSellerInfoSection).getByText('Seller Name Not Available')).toBeInTheDocument();
    // There will be two "N/A", one for username in top section, one for username in "About the seller"
    expect(screen.getAllByText('@N/A')).toHaveLength(2); // This is fine as getAllByText is used

    // Check UserAvatar mock receives null/undefined effectively
    expect(screen.getByText('UserAvatar[No User-30]')).toBeInTheDocument();
    expect(screen.getByText('UserAvatar[No User-100]')).toBeInTheDocument();

    // Check "About the Seller" section for fallbacks
    const aboutSellerSection = screen.getByText('About the Seller').closest('div');
    expect(within(aboutSellerSection).getByText('Seller Name Not Available')).toBeInTheDocument();
    // Fallback for description in "About the Seller" section
    expect(within(aboutSellerSection).getByText('No description provided.')).toBeInTheDocument();
  });

  test('Test Case 3: Renders fallback for incomplete createdBy data', () => {
    mockUseStateProvider.mockReturnValue([{
      serviceData: {
        ...baseServiceData,
        createdBy: { fullName: 'Partial Seller' } // userName and description are missing
      }
    }]);
    render(<Details reviewEligibility={true} />);

    expect(screen.getByText('Test Service Title')).toBeInTheDocument();

    // Check for partial seller info
    const topSellerInfoSection = screen.getByText('UserAvatar[Partial Seller-30]').closest('.flex.items-center.gap-2.flex-wrap');
    expect(within(topSellerInfoSection).getByText('Partial Seller')).toBeInTheDocument(); // Full name should be rendered
    expect(screen.getAllByText('@N/A')).toHaveLength(2); // Fallback for userName

    // Check UserAvatar mock
    expect(screen.getByText('UserAvatar[Partial Seller-30]')).toBeInTheDocument();
    expect(screen.getByText('UserAvatar[Partial Seller-100]')).toBeInTheDocument();

    // Check "About the Seller" section
    const aboutSellerSection = screen.getByText('About the Seller').closest('div');
    expect(within(aboutSellerSection).getByText('Partial Seller')).toBeInTheDocument();
    expect(within(aboutSellerSection).getByText('No description provided.')).toBeInTheDocument(); // Fallback for description
  });

  test('Test Case 4: Renders no image when images array is empty', () => {
    mockUseStateProvider.mockReturnValue([{ serviceData: { ...baseServiceData, images: [], createdBy: createdByData } }]);
    render(<Details reviewEligibility={true} />);

    expect(screen.getByText('Test Service Title')).toBeInTheDocument();

    // Main image should not be rendered
    expect(screen.queryByAltText('Service')).not.toBeInTheDocument();

    // Thumbnails should not be rendered
    expect(screen.queryByAltText('service thumbnail')).not.toBeInTheDocument();
  });

  test('Test Case 5: Renders nothing (or wrapper) if serviceData is null', () => {
    mockUseStateProvider.mockReturnValue([{ serviceData: null }]);
    const { container } = render(<Details reviewEligibility={true} />);

    // The component itself is wrapped in {serviceData && (...)}
    // So, if serviceData is null, the inner content of Details should not render.
    // The component will return <> {null} </>, so container.firstChild should be null or not exist.
    // Or check that title, etc., are not present.
    expect(screen.queryByText('Test Service Title')).not.toBeInTheDocument();
    expect(screen.queryByText('About this service')).not.toBeInTheDocument();
    expect(screen.queryByText('About the Seller')).not.toBeInTheDocument();
    // Check that the container is empty or only contains comments (if any from React structure)
    expect(container.firstChild).toBeNull(); // Or use .toBeEmptyDOMElement() if it's a direct child
  });

  describe('Seller Rating Display in "About the Seller" section', () => {
    const getAboutSellerSection = () => screen.getByText('About the Seller').closest('div');

    test('Test Case SELLER-RATING-1: averageRating is a valid numeric string (e.g., "3.7")', () => {
      mockUseStateProvider.mockReturnValue([{
        serviceData: { ...baseServiceData, createdBy: createdByData, averageRating: "3.7", totalReviews: 15 }
      }]);
      render(<Details reviewEligibility={true} />);
      const aboutSellerSection = getAboutSellerSection();
      expect(within(aboutSellerSection).getByText('StarRating[3.7]')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('3.7')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('(15 reviews)')).toBeInTheDocument();
    });

    test('Test Case SELLER-RATING-2: averageRating is the string "0"', () => {
      mockUseStateProvider.mockReturnValue([{
        serviceData: { ...baseServiceData, createdBy: createdByData, averageRating: "0", totalReviews: 0 }
      }]);
      render(<Details reviewEligibility={true} />);
      const aboutSellerSection = getAboutSellerSection();
      expect(within(aboutSellerSection).getByText('StarRating[0]')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('0.0')).toBeInTheDocument(); // Our fix ensures .toFixed(1)
      expect(within(aboutSellerSection).getByText('(0 reviews)')).toBeInTheDocument();
    });

    test('Test Case SELLER-RATING-3: averageRating is the string "5" (integer string)', () => {
      mockUseStateProvider.mockReturnValue([{
        serviceData: { ...baseServiceData, createdBy: createdByData, averageRating: "5", totalReviews: 20 }
      }]);
      render(<Details reviewEligibility={true} />);
      const aboutSellerSection = getAboutSellerSection();
      expect(within(aboutSellerSection).getByText('StarRating[5]')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('5.0')).toBeInTheDocument(); // .toFixed(1)
      expect(within(aboutSellerSection).getByText('(20 reviews)')).toBeInTheDocument();
    });

    test('Test Case SELLER-RATING-4: averageRating is an invalid string (e.g., "not-a-number")', () => {
      mockUseStateProvider.mockReturnValue([{
        serviceData: { ...baseServiceData, createdBy: createdByData, averageRating: "not-a-number", totalReviews: 3 }
      }]);
      render(<Details reviewEligibility={true} />);
      const aboutSellerSection = getAboutSellerSection();
      expect(within(aboutSellerSection).getByText('StarRating[0]')).toBeInTheDocument(); // Defaults to 0 for StarRating
      expect(within(aboutSellerSection).getByText('N/A')).toBeInTheDocument(); // Displays N/A
      expect(within(aboutSellerSection).getByText('(3 reviews)')).toBeInTheDocument();
    });

    test('Test Case SELLER-RATING-5: averageRating is undefined', () => {
      mockUseStateProvider.mockReturnValue([{
        serviceData: { ...baseServiceData, createdBy: createdByData, averageRating: undefined, totalReviews: 2 }
      }]);
      render(<Details reviewEligibility={true} />);
      const aboutSellerSection = getAboutSellerSection();
      expect(within(aboutSellerSection).getByText('StarRating[0]')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('N/A')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('(2 reviews)')).toBeInTheDocument();
    });

    test('Test Case SELLER-RATING-6: averageRating is null', () => {
      // Note: parseFloat(null) is 0. So this will behave like averageRating: "0"
      // This is acceptable as null is not expected from the API (which sends "0" string)
      // but good to document the behavior.
      mockUseStateProvider.mockReturnValue([{
        serviceData: { ...baseServiceData, createdBy: createdByData, averageRating: null, totalReviews: 1 }
      }]);
      render(<Details reviewEligibility={true} />);
      const aboutSellerSection = getAboutSellerSection();
      // parseFloat(null) results in NaN, so displaySellerRating becomes "N/A"
      expect(within(aboutSellerSection).getByText('StarRating[0]')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('N/A')).toBeInTheDocument();
      expect(within(aboutSellerSection).getByText('(1 reviews)')).toBeInTheDocument();
    });
  });
});
