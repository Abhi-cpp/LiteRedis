const LiteRedis = require('./DB/liteRedis'); // Adjust the path as needed

// Create an instance of LiteRedis
const cache = new LiteRedis();

// Function to demonstrate and test LiteRedis functionality
function testLiteRedis() {
  console.log('Testing LiteRedis...');

  // Test setting and getting a key
  cache.set('key1', 'value1', 5); // Key with TTL of 5 seconds
  console.log('Set key1 to value1 with TTL of 5 seconds.');
  console.log('Get key1:', cache.get('key1')); // Should print 'value1'

  // Test existence check
  console.log('Key1 exists:', cache.exists('key1')); // Should print true

  // Wait for 6 seconds and then test TTL expiration
  setTimeout(() => {
    console.log('After 6 seconds...');
    console.log('Get key1:', cache.get('key1')); // Should print null (expired)
    console.log('Key1 exists:', cache.exists('key1')); // Should print false

    // Test deleting a key
    cache.set('key2', 'value2');
    console.log('Set key2 to value2.');
    console.log('Get key2:', cache.get('key2')); // Should print 'value2'
    cache.del('key2');
    console.log('Deleted key2.');
    console.log('Get key2:', cache.get('key2')); // Should print null (deleted)

    // Test flushing all keys
    cache.set('key3', 'value3');
    cache.set('key4', 'value4');
    console.log('Set key3 and key4.');
    console.log('All keys before flush:', cache.keys()); // Should print ['key3', 'key4']
    cache.flush();
    console.log('Flushed all keys.');
    console.log('All keys after flush:', cache.keys()); // Should print []
  }, 6000);
}

// Run the test function
testLiteRedis();
