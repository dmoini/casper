num average(list<num> l):
    num sum = 0
    for i from 0 to len(l):
        sum = sum + l[i]
    return sum / len(l)