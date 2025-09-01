const http = require('http');

console.log('🧪 Testing Todo API Endpoints...');
console.log('=================================');

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  try {
    // Test 1: Health Check
    console.log('\n1. Testing Health Check...');
    const health = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET'
    });
    console.log('✅ Health Check Success:', JSON.stringify(health.data, null, 2));

    // Test 2: Get All Todos
    console.log('\n2. Testing Get All Todos...');
    const todos = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/todos',
      method: 'GET'
    });
    console.log('✅ Get Todos Success:', JSON.stringify(todos.data, null, 2));

    // Test 3: Create New Todo
    console.log('\n3. Testing Create New Todo...');
    const newTodo = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/todos',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { text: 'Test todo from Node.js script' });
    console.log('✅ Create Todo Success:', JSON.stringify(newTodo.data, null, 2));

    const createdId = newTodo.data.data.id;

    // Test 4: Update Todo
    console.log('\n4. Testing Update Todo...');
    const updated = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/todos/${createdId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { completed: true });
    console.log('✅ Update Todo Success:', JSON.stringify(updated.data, null, 2));

    // Test 5: Get Stats
    console.log('\n5. Testing Get Stats...');
    const stats = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/stats',
      method: 'GET'
    });
    console.log('✅ Get Stats Success:', JSON.stringify(stats.data, null, 2));

    // Test 6: Filter Active Todos
    console.log('\n6. Testing Filter Active Todos...');
    const activeTodos = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/todos?filter=active',
      method: 'GET'
    });
    console.log('✅ Filter Active Success:', JSON.stringify(activeTodos.data, null, 2));

    // Test 7: Delete Todo
    console.log('\n7. Testing Delete Todo...');
    const deleted = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/todos/${createdId}`,
      method: 'DELETE'
    });
    console.log('✅ Delete Todo Success:', JSON.stringify(deleted.data, null, 2));

    console.log('\n🎉 All API tests completed successfully!');
    console.log('=================================');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();
