
~* The purpose of this example program is to just throw every syntactic
construct of the language in one file. One can write a test that checks
that this file can be matched agains the grammar, but as it is a kitchen
sink of features, we probably don't need to use this file as a source of
AST generation tests. *~

num a = 42

void hello():
    write(a)
    return
void actions(num a, boo b, string c):
	num x = 1
	num z = x * 3 
	boo y = false
    ~Hello this is a comment ***
	list<num> l = [1, 2, 9 + 12 ,4]
	set<boo> s = set(true, false, not true, 2 < 4)
	dict<num, string> d = {1: "hello", 2: "goodbye", 3: "casper is the best"}
    
    if x < 3:
		while true:
			if x: print([x, y, z])


			break ~Comment        
	else if x > 3:
  		print("hello")
        
	~* 
    Did you know that
	casper is a really
	friendly programming
	language?
	*~

	num g = 20
	for x from g to 2:
		write(x)

actions(1, true, "BOO!")

