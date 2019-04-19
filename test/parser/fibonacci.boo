num fibonacci(num x):
  if (x <= 1):
    return 1
  return fibonacci(x - 1) + fibonacci(x - 2)
    
print(fibonacci(5))
print(fibonacci(10))
