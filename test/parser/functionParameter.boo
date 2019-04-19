num double(num x):
    return x * 2

num doTwice(num f:(num z), num x):
    return f(f(x))

print(doTwice(double, 2))
