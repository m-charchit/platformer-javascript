from random import randint

counter = 0
dict_ = {}
no = randint(1,100)
game = True
try:
    with open("leveleditortry\pythonfile.txt","r") as f:
        for line in f:
            (v,k) = line.split()
            dict_[v] = k
except Exception as e:
    print(e)
name = input("enter your name : ")
while name in dict_.keys():
    name = input("Name already taken. Enter another, must use numbers after name 1,2,3... : ")
# print(no)


while game:
    userno = int(input("Enter number : "))

    if no < userno:
        print("no is big enter smaller number")
        counter += 1
        
    elif no > userno:
        print("no is small enter a larger number")
        counter += 1
    else:
        game = False
        print("you chose correct")
        print(f"Your score {name} : {counter}")
try:
    with open("leveleditortry\pythonfile.txt","r") as f:
        for line in f:
            (v,k) = line.split()
            dict_[v] = k
    print("Top scores")
    for x,y in dict_.items():
        print(f"{x} - {y}")
    if name in dict_.keys():
        print("Sorry name used. You can write 1,2,3 at end of your name ")
    else:
        with open("leveleditortry\pythonfile.txt","a") as f:
            f.write(f"\n{name} {counter}")    
except Exception as e:
    print(e)
    print("No score in file. save yours")

# name = input()
# score = input()
# l = {}
# with open("leveleditortry\pythonfile.txt","r") as f:
#     for line in f:
#         (v,k) = line.split()
#         l[v] = int(k)
# for x,y in l.items():
#     print(f"\n{x}{y}")
# with open("leveleditortry\pythonfile.txt","a") as f:
#     f.write(f"\n{name} {score}")
