num fibonacci(num x):
  if (x <= 1):
    return x
  return fibonacci(x - 1) + fibonacci(x - 2)
    
write(fibonacci(5))
write(fibonacci(10))
