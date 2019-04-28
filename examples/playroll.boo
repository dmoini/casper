list<num> twoSum(list<num> nums, num target):
    if len(nums) == 2:
        return [0, 1]
    list<num> ans = []
    dict<num, num> hashTable = {}
    for i from 0 to len(hashTable):
        num complement = target - nums[i]
        num find = hashTable[complement]
        if hashTable.getValue(complement) != none:
            ans = [find, i]
            break
        hashTable[nums[i]] = i
    return ans