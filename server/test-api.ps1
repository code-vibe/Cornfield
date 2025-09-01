# Todo API Test Script
# Run this in PowerShell to test all API endpoints

Write-Host "🧪 Testing Todo API Endpoints..." -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Test 1: Health Check
Write-Host "`n1. Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
    Write-Host "✅ Health Check Success:" -ForegroundColor Green
    $health | ConvertTo-Json
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Get All Todos
Write-Host "`n2. Testing Get All Todos..." -ForegroundColor Yellow
try {
    $todos = Invoke-RestMethod -Uri "http://localhost:5000/api/todos" -Method GET
    Write-Host "✅ Get Todos Success:" -ForegroundColor Green
    $todos | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Get Todos Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Create New Todo
Write-Host "`n3. Testing Create New Todo..." -ForegroundColor Yellow
try {
    $newTodo = @{
        text = "Test todo from PowerShell"
    } | ConvertTo-Json
    
    $created = Invoke-RestMethod -Uri "http://localhost:5000/api/todos" -Method POST -Body $newTodo -ContentType "application/json"
    Write-Host "✅ Create Todo Success:" -ForegroundColor Green
    $created | ConvertTo-Json -Depth 3
    $createdId = $created.data.id
} catch {
    Write-Host "❌ Create Todo Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Update Todo (if we created one)
if ($createdId) {
    Write-Host "`n4. Testing Update Todo..." -ForegroundColor Yellow
    try {
        $updateData = @{
            completed = $true
        } | ConvertTo-Json
        
        $updated = Invoke-RestMethod -Uri "http://localhost:5000/api/todos/$createdId" -Method PUT -Body $updateData -ContentType "application/json"
        Write-Host "✅ Update Todo Success:" -ForegroundColor Green
        $updated | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "❌ Update Todo Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 5: Get Stats
Write-Host "`n5. Testing Get Stats..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:5000/api/stats" -Method GET
    Write-Host "✅ Get Stats Success:" -ForegroundColor Green
    $stats | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Get Stats Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Filter Todos (Active)
Write-Host "`n6. Testing Filter Todos (Active)..." -ForegroundColor Yellow
try {
    $activeTodos = Invoke-RestMethod -Uri "http://localhost:5000/api/todos?filter=active" -Method GET
    Write-Host "✅ Filter Active Todos Success:" -ForegroundColor Green
    $activeTodos | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Filter Active Todos Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Filter Todos (Completed)
Write-Host "`n7. Testing Filter Todos (Completed)..." -ForegroundColor Yellow
try {
    $completedTodos = Invoke-RestMethod -Uri "http://localhost:5000/api/todos?filter=completed" -Method GET
    Write-Host "✅ Filter Completed Todos Success:" -ForegroundColor Green
    $completedTodos | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Filter Completed Todos Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 8: Delete Todo (if we created one)
if ($createdId) {
    Write-Host "`n8. Testing Delete Todo..." -ForegroundColor Yellow
    try {
        $deleted = Invoke-RestMethod -Uri "http://localhost:5000/api/todos/$createdId" -Method DELETE
        Write-Host "✅ Delete Todo Success:" -ForegroundColor Green
        $deleted | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "❌ Delete Todo Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
