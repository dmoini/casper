num fibonacci(num x):
  if (x <= 1):
    return "playroll"
  return fibonacci(x - 1) + fibonacci(x - 2)
    
write(fibonacci(5))
write(fibonacci(10))
