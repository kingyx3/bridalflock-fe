// Define implementations for the mock functions
const mockRefImpl = jest.fn();
const mockQueryImpl = jest.fn();
const mockOrderByChildImpl = jest.fn();
const mockEqualToImpl = jest.fn();
const mockLimitToLastImpl = jest.fn();
const mockOnValueImpl = jest.fn();
const mockOffImpl = jest.fn();
const mockGetImpl = jest.fn();
const mockPushImpl = jest.fn();
const mockSetImpl = jest.fn();
const mockUpdateImpl = jest.fn();
const mockServerTimestampImpl = jest.fn(() => 'mock-server-timestamp');
const mockChildImpl = jest.fn((parentSnap, path) => {
  const pathParts = path.split('/');
  let current = parentSnap.val();
  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return { val: () => null, exists: () => false };
    }
  }
  return { val: () => current, exists: () => current !== null && current !== undefined };
});

// Use jest.doMock for more control over hoisting and when mocks are applied
jest.doMock('firebase/database', () => ({
  ref: (...args) => mockRefImpl(...args),
  query: (...args) => mockQueryImpl(...args),
  orderByChild: (...args) => mockOrderByChildImpl(...args),
  equalTo: (...args) => mockEqualToImpl(...args),
  limitToLast: (...args) => mockLimitToLastImpl(...args),
  onValue: (...args) => mockOnValueImpl(...args),
  off: (...args) => mockOffImpl(...args),
  get: (...args) => mockGetImpl(...args),
  child: (...args) => mockChildImpl(...args),
  push: (...args) => mockPushImpl(...args),
  set: (...args) => mockSetImpl(...args),
  update: (...args) => mockUpdateImpl(...args),
  serverTimestamp: (...args) => mockServerTimestampImpl(...args),
}));

jest.doMock('./firebaseConfig', () => ({
  database: { /* provide a minimal mock if needed */ }
}));

// Require the module under test AFTER jest.doMock calls
const { listenForConversations, getMessages, addMessage, markAsRead, getUnreadMessagesCountForChat, getUserDetails } = require('./chatApi');

describe('listenForConversations', () => {
  const mockUserId = 'user123';
  let mockCallback;

  beforeEach(() => {
    // Clear all individual mock function implementations
    mockRefImpl.mockClear();
    mockQueryImpl.mockClear();
    mockOrderByChildImpl.mockClear();
    mockEqualToImpl.mockClear();
    mockLimitToLastImpl.mockClear();
    mockOnValueImpl.mockClear();
    mockOffImpl.mockClear();
    mockGetImpl.mockClear();
    mockPushImpl.mockClear();
    mockSetImpl.mockClear();
    mockUpdateImpl.mockClear();
    mockServerTimestampImpl.mockClear();
    mockChildImpl.mockClear();

    mockCallback = jest.fn();

    // Default implementations for mock functions
    mockRefImpl.mockImplementation((db, path) => ({ path: path, toString: () => `mockRef(${path})` }));
    mockQueryImpl.mockImplementation((ref, ...constraints) => ({
      type: 'query',
      ref: ref,
      constraints: constraints,
      toString: () => `mockQuery(${ref.path})`
    }));
    mockOrderByChildImpl.mockImplementation(path => ({ type: 'orderByChild', path }));
    mockEqualToImpl.mockImplementation(value => ({ type: 'equalTo', value }));
    mockLimitToLastImpl.mockImplementation(limit => ({ type: 'limitToLast', limit }));

    mockOnValueImpl.mockImplementation((query, successCb) => {
      const mockSnapshot = {
        exists: () => false, val: () => null,
        child: jest.fn().mockReturnValue({ val: () => null, exists: () => false }),
        forEach: jest.fn(),
      };
      successCb(mockSnapshot);
      return mockOffImpl; // Return the mock 'off' function
    });

    mockGetImpl.mockResolvedValue({
        exists: () => false, val: () => null, forEach: jest.fn(),
    });
    mockPushImpl.mockImplementation(ref => ({ key: 'mockPushKey', ref }));
    mockSetImpl.mockResolvedValue(undefined);
    mockUpdateImpl.mockResolvedValue(undefined);
  });

  it('should call callback with error if no userId is provided', () => {
    listenForConversations(null, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(expect.any(Error), null);
    expect(mockOnValueImpl).not.toHaveBeenCalled();
  });

  it('should set up a listener on the correct chats path', () => {
    listenForConversations(mockUserId, mockCallback);
    expect(mockRefImpl).toHaveBeenCalledWith(expect.anything(), 'chats');
    expect(mockRefImpl).toHaveBeenCalledTimes(2);
    expect(mockQueryImpl).toHaveBeenCalledTimes(2);
    expect(mockOnValueImpl).toHaveBeenCalledTimes(2);
  });

  it('should call callback with empty array if snapshot does not exist for both queries', async () => {
    mockOnValueImpl.mockImplementation((query, successCb) => {
      const mockSnapshot = {
        exists: () => false, val: () => null, child: () => ({ val: () => null, exists: () => false }), forEach: jest.fn()
      };
      successCb(mockSnapshot);
      return mockOffImpl;
    });
    mockGetImpl.mockResolvedValue({ exists: () => false, forEach: jest.fn() });

    listenForConversations(mockUserId, mockCallback);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockCallback).toHaveBeenCalledWith(null, []);
  });

  it('should filter conversations for the given userId (as buyer or vendor) and call callback', async () => {
    const now = Date.now();
    const recentTime = new Date(now - 24 * 3600 * 1000).toISOString();
    const veryOldTime = new Date(now - 100 * 3600 * 1000).toISOString();

    const buyerChatsData = {
      'chat1': { buyerId: mockUserId, vendorId: 'vendor1', createdAt: 100, orderCompletedAt: recentTime },
      'chat2': { buyerId: mockUserId, vendorId: 'vendor2', createdAt: 50, orderCompletedAt: veryOldTime }
    };
    const vendorChatsData = {
      'chat3': { buyerId: 'buyer2', vendorId: mockUserId, createdAt: 200, orderCompletedAt: recentTime },
      'chat4': { buyerId: 'buyer3', vendorId: mockUserId, createdAt: 150 }
    };

    const createSnapshot = (dataObject) => ({
        exists: () => true,
        forEach: (fn) => {
            Object.entries(dataObject).forEach(([key, value]) => {
                fn({ key: key, child: (path) => ({ val: () => value }) });
            });
        }
    });

    mockGetImpl.mockImplementation(query => { // Changed from mockFirebaseGet
        const chatId = query.ref.path.split('/')[1];
        if (chatId === 'chat1') return Promise.resolve({ exists: () => true, forEach: cb => cb({ val: () => ({ text: 'Hello from chat1', timestamp: 100 }) }) });
        if (chatId === 'chat3') return Promise.resolve({ exists: () => true, forEach: cb => cb({ val: () => ({ text: 'Hello from chat3', timestamp: 200 }) }) });
        return Promise.resolve({ exists: () => false, forEach: jest.fn() });
    });

    mockOnValueImpl // Changed from mockFirebaseOnValue
      .mockImplementationOnce((query, successCb) => { // Buyer
        successCb(createSnapshot(buyerChatsData));
        return mockOffImpl; // Changed from mockFirebaseOff
      })
      .mockImplementationOnce((query, successCb) => { // Vendor
        successCb(createSnapshot(vendorChatsData));
        return mockOffImpl; // Changed from mockFirebaseOff
      });

    listenForConversations(mockUserId, mockCallback);
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockCallback).toHaveBeenCalledWith(null, expect.arrayContaining([
      expect.objectContaining({ id: 'chat1', buyerId: mockUserId, orderCompletedAt: recentTime, lastMessageText: 'Hello from chat1' }),
      expect.objectContaining({ id: 'chat3', vendorId: mockUserId, orderCompletedAt: recentTime, lastMessageText: 'Hello from chat3' }),
    ]));
    const calls = mockCallback.mock.calls;
    const lastCallArgs = calls[calls.length -1];
    expect(lastCallArgs[1].length).toBe(2); // Ensure only the valid chats are present in the final callback
  });


  it('should sort conversations by lastMessageTimestamp descending (when they pass other filters)', async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const chatsData = {
        'chat1': { buyerId: mockUserId, vendorId: 'vendor1', orderCompletedAt: twentyFourHoursAgo, createdAt: 100 },
        'chat2': { buyerId: mockUserId, vendorId: 'vendor2', orderCompletedAt: twentyFourHoursAgo, createdAt: 200 },
    };
     const createSnapshot = (dataObject) => ({
        exists: () => true,
        forEach: (fn) => {
            Object.entries(dataObject).forEach(([key, value]) => {
                fn({ key: key, child: (path) => ({ val: () => value }) });
            });
        }
    });


    mockOnValueImpl // Corrected
        .mockImplementationOnce((query, successCb) => { successCb(createSnapshot(chatsData)); return mockOffImpl; }) // Buyer & Corrected mockOffImpl
        .mockImplementationOnce((query, successCb) => { successCb({exists: () => false, forEach: jest.fn()}); return mockOffImpl; }); // Vendor empty & Corrected mockOffImpl

    mockGetImpl.mockImplementation(query => { // Corrected
        const chatId = query.ref.path.split('/')[1];
        if (chatId === 'chat1') return Promise.resolve({ exists: () => true, forEach: cb => cb({ val: () => ({ text: 'msg1', timestamp: 100 }) }) });
        if (chatId === 'chat2') return Promise.resolve({ exists: () => true, forEach: cb => cb({ val: () => ({ text: 'msg2', timestamp: 300 }) }) });
        return Promise.resolve({ exists: () => false, forEach: jest.fn() });
    });

    listenForConversations(mockUserId, mockCallback);
    await new Promise(resolve => setTimeout(resolve, 0));

    // The actual implementation combines and then sorts by createdAt in handleSnapshot if no lastMessageTimestamp
    // For this test to pass as "sort by lastMessageTimestamp", the chatApi needs to implement that sorting.
    // The current chatApi.js does NOT sort by lastMessageTimestamp. It implicitly sorts by createdAt due to Promise.all and then Map uniqueness.
    // This test needs to be updated or the function updated.
    // Assuming the desired outcome IS sorting by lastMessageTimestamp, listenForConversations needs adjustment.
    // For now, this test will likely fail or pass based on the implicit order from the data.
    // Let's assume for the test that the API *should* sort by lastMessageTimestamp and check that.
    // The code in chatApi.js does not sort by lastMessageTimestamp. It's more complex.
    // The `combinedResults = [...new Map([...buyerResults, ...vendorResults].map(item => [item.id, item])).values()];`
    // line will make the order dependent on the order of buyerResults and vendorResults and their content.
    // To make this test pass reliably for lastMessageTimestamp, `listenForConversations` must explicitly sort.
    // For now, this test will be fragile. Let's check for specific content.
    const results = mockCallback.mock.calls[0][1];
    expect(results).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ id: 'chat2', lastMessageTimestamp: 300 }),
            expect.objectContaining({ id: 'chat1', lastMessageTimestamp: 100 }),
        ])
    );
    // And to ensure order if the API were to sort:
    if (results && results.length === 2) {
        expect(results[0].id).toBe('chat2'); // Highest timestamp first
        expect(results[1].id).toBe('chat1');
    } else {
        // Fail if not exactly two results, something is wrong with filtering/data setup
        expect(results.length).toBe(2);
    }
  });


  it('should return an unsubscribe function that calls off for both listeners', () => {
    const mockOffBuyerImpl = jest.fn();
    const mockOffVendorImpl = jest.fn();

    mockOnValueImpl // Corrected
      .mockImplementationOnce((query, successCb) => {
        successCb({ exists: () => false, val: () => null, child: () => ({}), forEach: jest.fn() });
        return mockOffBuyerImpl;
      })
      .mockImplementationOnce((query, successCb) => {
        successCb({ exists: () => false, val: () => null, child: () => ({}), forEach: jest.fn() });
        return mockOffVendorImpl;
      });

    const returnedUnsubscribe = listenForConversations(mockUserId, mockCallback);
    returnedUnsubscribe();

    expect(mockOffBuyerImpl).toHaveBeenCalledTimes(1);
    expect(mockOffVendorImpl).toHaveBeenCalledTimes(1);
  });


  describe('orderCompletedAt filtering', () => {
    const now = Date.now();
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const fortySevenHoursAgo = new Date(now - 47 * 60 * 60 * 1000).toISOString();
    const fortyNineHoursAgo = new Date(now - 49 * 60 * 60 * 1000).toISOString();
    const seventyTwoHoursAgo = new Date(now - 72 * 60 * 60 * 1000).toISOString();

    const testCases = [
      {
        description: 'should include conversation if orderCompletedAt is within 48 hours (24h ago)',
        chatData: { buyerId: mockUserId, vendorId: 'vendor1', orderCompletedAt: twentyFourHoursAgo, createdAt: 100, lastMessageText: "Hi", lastMessageTimestamp: now - 1000 },
        expected: true,
      },
      {
        description: 'should include conversation if orderCompletedAt is within 48 hours (47h ago)',
        chatData: { buyerId: mockUserId, vendorId: 'vendor1', orderCompletedAt: fortySevenHoursAgo, createdAt: 100, lastMessageText: "Hi", lastMessageTimestamp: now - 1000 },
        expected: true,
      },
      {
        description: 'should exclude conversation if orderCompletedAt is older than 48 hours (49h ago)',
        chatData: { buyerId: mockUserId, vendorId: 'vendor1', orderCompletedAt: fortyNineHoursAgo, createdAt: 100, lastMessageText: "Hi", lastMessageTimestamp: now - 1000 },
        expected: false,
      },
      {
        description: 'should exclude conversation if orderCompletedAt is older than 48 hours (72h ago)',
        chatData: { buyerId: mockUserId, vendorId: 'vendor1', orderCompletedAt: seventyTwoHoursAgo, createdAt: 100, lastMessageText: "Hi", lastMessageTimestamp: now - 1000 },
        expected: false,
      },
      {
        description: 'should exclude conversation if orderCompletedAt does not exist',
        chatData: { buyerId: mockUserId, vendorId: 'vendor1', createdAt: 100, lastMessageText: "Hi", lastMessageTimestamp: now - 1000 },
        expected: false,
      },
      {
        description: 'should include conversation for vendor if orderCompletedAt is within 48 hours',
        chatData: { buyerId: 'buyer1', vendorId: mockUserId, orderCompletedAt: twentyFourHoursAgo, createdAt: 100, lastMessageText: "Hi", lastMessageTimestamp: now - 1000 },
        expected: true,
      },
      {
        description: 'should exclude conversation if not for the user, even if orderCompletedAt is recent',
        chatData: { buyerId: 'otherUser', vendorId: 'anotherUser', orderCompletedAt: twentyFourHoursAgo, createdAt: 100, lastMessageText: "Hi", lastMessageTimestamp: now - 1000 },
        expected: false,
      },
    ];

    testCases.forEach(({ description, chatData, expected }) => {
      it(description, async () => {
        const mockChatSnapshot = {
          key: 'chat1',
          child: (path) => {
            if (path === 'metadata') return { val: () => chatData, exists: () => true };
            return { val: () => null, exists: () => false };
          }
        };

        mockOnValueImpl // Corrected
          .mockImplementationOnce((query, successCb) => {
            const snapshotWithForEach = {
              exists: () => true,
              forEach: (cb) => {
                if (chatData.buyerId === mockUserId || chatData.vendorId === mockUserId) {
                  cb(mockChatSnapshot);
                }
              }
            };
            successCb(snapshotWithForEach);
            return mockOffImpl; // Corrected
          })
          .mockImplementationOnce((query, successCb) => {
            successCb({ exists: () => false, forEach: jest.fn() });
            return mockOffImpl; // Corrected
          });

        mockGetImpl.mockResolvedValue({ // Corrected
            exists: () => true,
            forEach: cb => cb({ val: () => ({ text: chatData.lastMessageText, timestamp: chatData.lastMessageTimestamp }) })
        });

        listenForConversations(mockUserId, mockCallback);
        await new Promise(resolve => setTimeout(resolve, 0));

        if (expected) {
          expect(mockCallback).toHaveBeenCalledWith(null, [expect.objectContaining({ id: 'chat1', ...chatData })]);
        } else {
          expect(mockCallback).toHaveBeenCalledWith(null, []);
        }
      });
    });

    it('should handle multiple conversations with mixed validity', async () => {
        const chatsData = {
            'chatValid1': { buyerId: mockUserId, vendorId: 'v1', orderCompletedAt: twentyFourHoursAgo, createdAt: 100, lastMessageText: "Msg1", lastMessageTimestamp: now - 1000 },
            'chatTooOld': { buyerId: mockUserId, vendorId: 'v2', orderCompletedAt: seventyTwoHoursAgo, createdAt: 200, lastMessageText: "Msg2", lastMessageTimestamp: now - 2000 },
            'chatNoTimestamp': { buyerId: 'b1', vendorId: mockUserId, createdAt: 300, lastMessageText: "Msg3", lastMessageTimestamp: now - 3000 },
            'chatNotUser': { buyerId: 'b2', vendorId: 'v3', orderCompletedAt: twentyFourHoursAgo, createdAt: 400, lastMessageText: "Msg4", lastMessageTimestamp: now - 4000 },
            'chatValid2Vendor': { buyerId: 'b3', vendorId: mockUserId, orderCompletedAt: fortySevenHoursAgo, createdAt: 500, lastMessageText: "Msg5", lastMessageTimestamp: now - 5000 },
        };

        const mockSnapshotFn = (filterFn) => ({
            exists: () => true,
            forEach: (cbForEach) => {
                Object.entries(chatsData).forEach(([key, data]) => {
                    if (filterFn(data)) {
                        cbForEach({ key, child: (path) => ({ val: () => data, exists: () => true }) });
                    }
                });
            }
        });

        mockOnValueImpl // Corrected
            .mockImplementationOnce((query, successCb) => {
                successCb(mockSnapshotFn(data => data.buyerId === mockUserId));
                return mockOffImpl; // Corrected
            })
            .mockImplementationOnce((query, successCb) => {
                successCb(mockSnapshotFn(data => data.vendorId === mockUserId));
                return mockOffImpl; // Corrected
            });

        mockGetImpl.mockImplementation(query => { // Corrected
            const chatId = query.ref.path.split('/')[1];
            const chat = chatsData[chatId];
            if (chat) {
                return Promise.resolve({ exists: () => true, forEach: cbForEach => cbForEach({ val: () => ({ text: chat.lastMessageText, timestamp: chat.lastMessageTimestamp }) }) });
            }
            return Promise.resolve({ exists: () => false, forEach: jest.fn() });
        });

        listenForConversations(mockUserId, mockCallback);
        await new Promise(resolve => setTimeout(resolve, 0));

        const expectedResults = [
            expect.objectContaining({ id: 'chatValid1' }),
            expect.objectContaining({ id: 'chatValid2Vendor' }),
        ];
        const actualResults = mockCallback.mock.calls[mockCallback.mock.calls.length - 1][1];
        expect(actualResults).toEqual(expect.arrayContaining(expectedResults));
        expect(actualResults.length).toBe(expectedResults.length);
    });
  });
});
