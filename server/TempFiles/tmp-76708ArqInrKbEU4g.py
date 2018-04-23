# -*- coding: utf-8 -*-
"""
Created on Thu Feb 26 18:07:49 2015

@author: Josh Yuan

Homework 3

"""

import turtle

#Prelab


def drawSquare(length):
    turtle.forward(length)
    turtle.right(90)
    turtle.forward(length)
    turtle.right(90)
    turtle.forward(length)
    turtle.right(90)
    turtle.forward(length)
    turtle.right(90)
    

def drawSquareScene():
    drawSquare(200)
    turtle.mainloop()




def drawKochScene():
    #Setup the canvas for drawing the curve and draw it.
	
    # pick up the pen and move the turtle so it starts at the left edge of the canvas 
    turtle.penup()
    turtle.goto(-turtle.window_width()/2 + 20,0)
    turtle.pendown()    
    
    # draw the curve by calling your function
    drawKoch(400, 3)
    
    # finished
    turtle.done()
    


def drawKoch(length, generations):
    if generations == 0:
        turtle.forward(length)
    else:
        drawKoch(length/3, generations-1)        
        turtle.left(60)
        drawKoch(length/3, generations-1)    
        turtle.right(120)
        drawKoch(length/3, generations-1)    
        turtle.left(60)
        drawKoch(length/3, generations-1)
        
        
    number = 5
    turtle.write(number, True, align = "center")
    
    


#Snowflake

def drawSnowflake(length, generations):
    drawKoch(length, generations)
    turtle.right(120)
    drawKoch(length, generations)
    turtle.right(120)
    drawKoch(length, generations)
    turtle.right(120)
    
def drawSnowflakeScene():
    turtle.tracer(False)
    # First Snowflake
    turtle.penup()
    turtle.goto(-turtle.window_width()/2 + 80,250)
    turtle.pencolor('red')
    turtle.pendown()
    turtle.begin_fill()
    drawSnowflake(200, 1)
    turtle.end_fill()
    # Second Snowflake
    turtle.penup()
    turtle.goto(-turtle.window_width()/2 + 400,250)
    turtle.pencolor('cyan')
    turtle.pendown()  
    turtle.begin_fill()
    drawSnowflake(200, 2)
    turtle.end_fill()
    # Third Snowflake
#    turtle.penup()
#    turtle.goto(-turtle.window_width()/2 + 240,0)
#    turtle.pencolor('black')
#    turtle.fillcolor('chartreuse2')
#    turtle.pendown()  
#    turtle.begin_fill()
#    drawSnowflake(200, 3)
#    turtle.end_fill()

    
    # finished
    turtle.done()
    




#Reverse
    
def reverse(text):
    output = ""
    if len(text) > 0:
        lastCharacter = text[-1]
        output = lastCharacter + reverse(text[0:-1])  
    return output


#Spiral


def spiral(initialLength, angle, multiplier):
    if initialLength <= 1:
        turtle.right(angle)
    else:
        turtle.forward(initialLength)
        turtle.right(angle)
        spiral(initialLength * multiplier, angle, multiplier)
        
def drawSprialScene():
    """
    #first spiral 
    turtle.penup()
    turtle.goto(-turtle.window_width()/2 + 80,320)
    turtle.pencolor('cyan')
    turtle.pendown()
    spiral(300, 89, 0.95)
    """

    #second spiral
    turtle.penup()
    turtle.goto(-turtle.window_width()/2 + 300,-20)
    turtle.pencolor('black')
    turtle.pendown()
    spiral(300, 91, 0.97)

    #all done    
    turtle.done()




