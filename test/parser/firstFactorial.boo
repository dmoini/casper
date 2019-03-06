num firstFactorial(num x):
    if (x equals 0 or x equals 1):
        return 1
    else:
        return x * firstFactorial(x - 1)