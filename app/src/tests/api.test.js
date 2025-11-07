import { getSellerOrders, getBuyerOrders } from '../utils/api';
import { auth, db } from '../utils/firebaseConfig';
import { collection, query as originalQuery, where as originalWhere, getDocs, doc, getDoc } from 'firebase/firestore';

// Store calls to where()
let whereArgsStack = [];
let queryArgsStack = [];

jest.mock('../utils/firebaseConfig', () => ({
  auth: {
    currentUser: {
      uid: 'test-user-id',
    },
  },
  db: {}, // Mock db object
}));

jest.mock('firebase/firestore', () => {
  const actualFirestore = jest.requireActual('firebase/firestore'); // Get actuals for fallbacks or unmocked parts
  return {
    ...actualFirestore, // Spread actuals to ensure all exports are available
    collection: jest.fn((db, path) => ({ path })), // Mock collection to return an object with path
    query: jest.fn((collectionRef, ...constraints) => {
      // Store the path and constraints used in the query call
      queryArgsStack.push({ path: collectionRef.path, constraints });
      // Return a mock query object that can be passed to getDocs
      return {
        _original_path_for_mock: collectionRef.path,
        _original_constraints_for_mock: constraints,
      };
    }),
    where: jest.fn((fieldPath, opStr, value) => {
      const whereCall = { fieldPath, opStr, value };
      whereArgsStack.push(whereCall);
      return { type: 'where', fieldPath, opStr, value, _original_where_call_for_mock: whereCall };
    }),
    doc: jest.fn((db, path, ...pathSegments) => { // Mock doc to return an object with path
      // The path for doc is constructed from its arguments, e.g. doc(db, 'users', userId) -> 'users/userId'
      const fullPath = [path, ...pathSegments].join('/');
      return { path: fullPath };
    }),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    Timestamp: {
      fromDate: jest.fn(date => date),
    },
    limit: jest.fn(limit => ({ type: 'limit', limit, _original_limit_call_for_mock: limit })),
  };
});


describe('Order fetching functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    whereArgsStack = [];
    queryArgsStack = [];

    getDoc.mockResolvedValue({ exists: () => false, data: () => ({}) });
    getDocs.mockImplementation(async (queryMock) => {
      let relevantOrders = [];
      let relevantServices = [];
      const lastQueryCall = queryArgsStack[queryArgsStack.length - 1];

      if (lastQueryCall) {
        const path = lastQueryCall.path;
        const constraints = lastQueryCall.constraints;
        const wheresInThisQuery = constraints.filter(c => c && c._original_where_call_for_mock).map(c => c._original_where_call_for_mock);

        if (path === 'services') {
          const hasUserIdFilter = wheresInThisQuery.some(w => w.fieldPath === 'userId' && w.value === 'test-user-id');
          if (hasUserIdFilter) {
            relevantServices = testData.mockServices;
          }
          return { docs: relevantServices.map(service => ({ id: service.id, data: () => service })) };
        } else if (path === 'orders') {
          const hasServicesIdInFilter = wheresInThisQuery.some(w => w.fieldPath === 'serviceId' && w.opStr === 'in');
          const hasBuyerIdFilter = wheresInThisQuery.some(w => w.fieldPath === 'buyerId' && w.value === 'test-user-id');
          const isCompletedFilterExists = wheresInThisQuery.some(w => w.fieldPath === 'isCompleted');

          if (hasServicesIdInFilter) {
            expect(isCompletedFilterExists).toBe(false);
            const servicesIdFilter = wheresInThisQuery.find(w => w.fieldPath === 'serviceId' && w.opStr === 'in');
            if (servicesIdFilter) {
              relevantOrders = testData.mockOrdersData.filter(order => servicesIdFilter.value.includes(order.serviceId));
            }
          } else if (hasBuyerIdFilter) {
            expect(isCompletedFilterExists).toBe(false);
            relevantOrders = testData.mockOrdersData.filter(order => order.buyerId === 'test-user-id');
          }
          return { docs: relevantOrders.map(order => ({ id: order.id, data: () => order })) };
        }
      }
      return { docs: [] };
    });
  });

  const testData = {
    mockServices: [
      { id: 'service1', userId: 'test-user-id' },
      { id: 'service2', userId: 'test-user-id' },
    ],
    mockOrdersData: [
      {
        id: 'order1',
        buyerId: 'buyer1',
        serviceId: 'service1',
        isCompleted: true,
        price: 100,
        createdAt: { toDate: () => new Date('2023-01-01T00:00:00Z') },
      },
      {
        id: 'order2',
        buyerId: 'buyer2',
        serviceId: 'service1',
        isCompleted: false,
        price: 50,
        createdAt: { toDate: () => new Date('2023-01-02T00:00:00Z') },
      },
      {
        id: 'order3',
        buyerId: 'test-user-id',
        serviceId: 'service2',
        isCompleted: true,
        price: 200,
        createdAt: { toDate: () => new Date('2023-01-03T00:00:00Z') },
      },
      {
        id: 'order4',
        buyerId: 'test-user-id',
        serviceId: 'service1',
        isCompleted: false,
        price: 150,
        createdAt: { toDate: () => new Date('2023-01-04T00:00:00Z') },
      },
    ],
  };

  describe('getSellerOrders', () => {
    it('should fetch all orders for a seller without filtering by isCompleted', async () => {
      getDoc.mockImplementation(async (ref) => { // ref here is the object returned by the mocked doc()
        const pathSegments = ref.path.split('/'); // Now ref.path should exist
        if (pathSegments[0] === 'users') {
          const buyer = testData.mockOrdersData.find(o => o.buyerId === pathSegments[1]);
          return { exists: () => !!buyer, data: () => ({ id: pathSegments[1], name: `Buyer ${pathSegments[1]}` }) };
        }
        if (pathSegments[0] === 'services') {
          const service = testData.mockServices.find(g => g.id === pathSegments[1]);
          return { exists: () => !!service, data: () => service };
        }
        return { exists: () => false, data: () => ({}) };
      });

      const { orders } = await getSellerOrders();

      expect(collection).toHaveBeenCalledWith(expect.anything(), 'services');
      expect(collection).toHaveBeenCalledWith(expect.anything(), 'orders');

      expect(whereArgsStack).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ fieldPath: 'userId', opStr: '==', value: 'test-user-id' }),
        ])
      );
      expect(whereArgsStack).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ fieldPath: 'serviceId', opStr: 'in', value: ['service1', 'service2'] })
        ])
      );

      const isCompletedFilterForOrders = whereArgsStack.some(
        arg => arg.fieldPath === 'isCompleted' && queryArgsStack.some(q => q.path === 'orders' && q.constraints.some(c => c._original_where_call_for_mock === arg))
      );
      expect(isCompletedFilterForOrders).toBe(false);

      const expectedOrdersForSeller = testData.mockOrdersData.filter(o => testData.mockServices.some(g => g.id === o.serviceId && g.userId === 'test-user-id'));
      expect(orders.length).toBe(expectedOrdersForSeller.length);
      orders.forEach(order => {
        expect(order).toHaveProperty('id');
        expect(order).toHaveProperty('buyer');
        expect(order).toHaveProperty('service');
      });
    });

    it('should return an empty array if the seller has no services', async () => {
      getDocs.mockImplementation(async (queryMock) => {
        const lastQueryCall = queryArgsStack[queryArgsStack.length - 1];
        if (lastQueryCall && lastQueryCall.path === 'services') {
          return { docs: [] };
        }
        return { docs: [] };
      });

      const { orders } = await getSellerOrders();
      expect(orders).toEqual([]);
      expect(collection).toHaveBeenCalledWith(expect.anything(), 'services');
      const ordersCollectionCall = queryArgsStack.find(q => q.path === 'orders');
      expect(ordersCollectionCall).toBeUndefined();
    });
  });

  describe('getBuyerOrders', () => {
    it('should fetch all orders for a buyer without filtering by isCompleted', async () => {
      getDoc.mockImplementation(async (ref) => { // ref here is the object returned by the mocked doc()
        const pathSegments = ref.path.split('/'); // Now ref.path should exist
        if (pathSegments[0] === 'services') {
          const service = testData.mockServices.find(g => g.id === pathSegments[1]);
          return { exists: () => !!service, data: () => service };
        }
        return { exists: () => false, data: () => ({}) };
      });

      const { orders } = await getBuyerOrders();

      expect(collection).toHaveBeenCalledWith(expect.anything(), 'orders');

      expect(whereArgsStack).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ fieldPath: 'buyerId', opStr: '==', value: 'test-user-id' })
        ])
      );

      const isCompletedFilterForOrders = whereArgsStack.some(
        arg => arg.fieldPath === 'isCompleted' && queryArgsStack.some(q => q.path === 'orders' && q.constraints.some(c => c._original_where_call_for_mock === arg))
      );
      expect(isCompletedFilterForOrders).toBe(false);

      const expectedOrdersForBuyer = testData.mockOrdersData.filter(o => o.buyerId === 'test-user-id');
      expect(orders.length).toBe(expectedOrdersForBuyer.length);
      orders.forEach(order => {
        expect(order).toHaveProperty('id');
        expect(order).toHaveProperty('service');
        expect(order.buyerId).toBe('test-user-id');
      });
    });

    it('should return an empty array if the buyer has no orders', async () => {
      getDocs.mockImplementation(async (queryMock) => {
        const lastQueryCall = queryArgsStack[queryArgsStack.length - 1];
        if (lastQueryCall && lastQueryCall.path === 'orders') {
          const wheresInThisQuery = lastQueryCall.constraints.filter(c => c && c._original_where_call_for_mock).map(c => c._original_where_call_for_mock);
          const hasBuyerIdFilter = wheresInThisQuery.some(w => w.fieldPath === 'buyerId' && w.value === 'test-user-id');
          if (hasBuyerIdFilter) return { docs: [] };
        }
        return { docs: [] };
      });

      const { orders } = await getBuyerOrders();
      expect(orders).toEqual([]);
      expect(collection).toHaveBeenCalledWith(expect.anything(), 'orders');
      expect(whereArgsStack).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ fieldPath: 'buyerId', opStr: '==', value: 'test-user-id' })
        ])
      );
    });
  });
});