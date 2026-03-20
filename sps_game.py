import random;

options = ["Stone" , "Paper" , "Scissors"]

def usrChs ():
    print("1. For Stone \n2. For paper \n3. For Scissors")
    user = int(input(":"))
    return user

#Taking user input 
Uchoice = usrChs()

#Getting computer choice 
Cchoice = random.randint(1, 3)

if(Uchoice == Cchoice):
    print("Game draw")

elif(Uchoice == 1):
    if(Cchoice == 3):
        print("User wins")
    else:
        print("Computer wins")
        
elif(Uchoice == 2):
    if(Cchoice == 1):
        print("User wins")
    else:
        print("Computer wins")
        
elif(Uchoice == 3):
    if(Cchoice == 2):
        print("User wins")
    else:
        print("Computer wins")

#Test case
# print(f"Computer choice was {options[Cchoice-1]}")
# print(f"User choice was {options[Uchoice-1]}")
