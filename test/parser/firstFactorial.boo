num firstFactorial(num x):
    if (x == 0 or x == 1):
        return 1
    else:
        return x * firstFactorial(x - 1)