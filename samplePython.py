""" Plays a text-based version of Boggle when run."""

#Nick Jaczko
#CS 150B
#Test Project 2
#11 May 2016


from random import *
from time import time


def generate_board():
    """ 
    Returns a text-based rendition of a random Boggle board and a string
    of all the letters that are on the board.
    """
    board_letters = "" #Starting a string for the letters in the board.
    #possible letters for the board, adjusted for how frequently they should appear:
    possible_letters = "E"*19 + "T" * 13 + "AR" * 12 + "INO" * 11  + "S" * 9 + "D" * 6 + "CHL" * 5  + "FMPU" * 4 + "GY" * 3 + "W" * 2 + "BJKQVXZ" * 1
    #Selecting 16 random letters from the possible_letters string:    
    for i in range(16):
        index = randint(0, len(possible_letters)-1)
        #Building the string of board letters:
        board_letters += possible_letters[index] 
    #Splitting the board letters up to make the rows of the board:
    board = "\n" + board_letters[:4] + "\n" + board_letters[4:8] + "\n" + board_letters[8:12] + "\n" + board_letters[12:]
    return board_letters, board



def count_dictionary(string):
    """
    Takes any string a returns a dictionary with each unique character in the
    string corresponding to a count of how many times that character occurred.
    """
    count_dict = {} #Starting an empty dictionary
    for letter in string: #Checking each letter in the string.
        #Increasing the count for that letter if it is already in the dict:
        if letter in count_dict: 
            count_dict[letter] += 1
        else:
            count_dict[letter] = 1 #Adding that letter to the dict.
    return count_dict
    
    
    
def word_score(word):
    """ Returns the Boggle score for the given word. """
    scores = {1:0, 2:0, 3:1, 4:1, 5:2, 6:3, 7:5} #Word length vs. score dict.
    if len(word) in scores: 
        return scores[len(word)] #Returning the corresponding word score.
    else: #The word must be longer than 8 characters...
        return 11
    

    
def english_words():
    """ Returns a set of all proper English words. """
    english_words = set() #Starting an empty set.
    file = open("english.txt", "r") #Reading the file of English words.
    for line in file: #Adding each word to the set.
        english_words.add(line.strip().upper()) 
    return english_words
    
    
    
def check_word(word, used_words, board_count, english):
    """
    Checks the given word to see if it has been previously used, can be made
    from the letters on the board, and is a proper english word. Returns a 
    message regarding the validity of the word and a boolean statement regarding
    whether the word is valid or not.
    """
    #Changing the case of the word to match the English set and the board letters:
    word = word.upper() 
    if word in used_words: #If word has already been used...
        return word.lower() + " has already been used", False
    if word not in english: #If the word is not a proper English word...
        return word.lower() + " is not a proper word", False
    #Creating a dictionary counting the letters in the word:
    word_count = count_dictionary(word) 
    for letter in word_count: #Checking each letter in the word.
        #If the word contains more of a letter than is in the board...
        if letter not in board_count:
            return word.lower() + " cannot be made from board letters", False
        elif word_count[letter] > board_count[letter]:
            return word.lower() + " cannot be made from board letters", False
    else: #The word is valid!
        return "Good word!", True
            
        
    
      
def play_boggle():
    """
    Implements a text-based version of the game Boggle.
    """
    end_time = time() + 180 #Setting the length of the game to 3 minutes
    #generating the board and the set of letters that compose it:
    board_letters, board = generate_board()
    #generating a dictionary of the count of all the letters on the board:
    board_count = count_dictionary(board_letters)
    english = english_words() #creating a set of valid English
    used_words = set() #starting an empty set for the used words
    score = 0 #starting the score count at zero

    while time() < end_time: #while time has not expired...
        print(board) #display the board
        word = input("\nEnter a word: ") #prompting the user for a word
        #checking to see whether the word is a valid, new word:
        message, valid_word = check_word(word, used_words, board_count, english)
        print(message) #printing the results of the word check
        if valid_word: #if the word is a valid word...
            used_words.add(word.upper()) #add it to the set of used words
            score += word_score(word) #increase the user's score accordingly
    #When time has expired, print the number of words found and the user's score
    print("\nTime's up!")  
    print("Words found:", len(used_words))
    print("Total score:", score)


if __name__ == "__main__": #Playing game if program is run
    play_boggle()
       
        
      