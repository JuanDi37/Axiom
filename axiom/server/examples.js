$body = @{
  message = "¿Qué nos dice el artículo 10 del Código Civil de Guatemala?"
} | ConvertTo-Json

$response = Invoke-RestMethod `
  -Uri "http://localhost:4000/api/chat" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$response





$body = @{
  name     = "Juan Prueba"
  email    = "juan.prueba@example.com"
  password = "12345678"
} | ConvertTo-Json

$response = Invoke-RestMethod `
  -Uri "http://localhost:4000/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$response


// Get

Invoke-RestMethod -Uri "http://localhost:4000/api/health" -Method GET

// total

Invoke-RestMethod -Uri "http://localhost:4000/api/debug/users" -Method GET
