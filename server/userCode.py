"""
Prints the current temperature in the zip code that is given as a command line
parameter.

Usage: python3 weather_reader.py <zip_code>
"""

import sys
import urllib.request



def url_to_string(url):
    """
    Returns a string of the source code for the web page at the given url.
    """
    webpage = urllib.request.urlopen(url) #Opening the web page
    page_string = "" #Starting the string
    for line in webpage: #Going through each line in the web page
        line.decode('ascii', 'ignore') #Removing problematic characters
        page_string += str(line) #Building the string
    return page_string
    
    
    
def get_kwh():
    """
    Fetches the weather.gov page of the weather report for the given zip code
    and returns the current temperature in degrees Farenheit.
    """
    #The url of the weather report:
    url = "http://highpeaks.middlebury.edu/_common/lvl5/main.jsp?wbs=37526&operatorlocale=en"
    page_string = url_to_string(url) #Turning the given source code into a string
    #Determining the starting index for the temperature slice. Temperature
    #begins 24 indices after the myforecast sequence begins:
    search_term = 'updateid="prim_102_ctrlid1">'
    start_index = page_string.find(search_term) + len(search_term) 
    #The temperature ends at the first "&" after the myforecast sequence:
    end_index = page_string.find("<", start_index)
    kwh = page_string[start_index : end_index] #Grabbing the temperature
    return kwh
       


if __name__ == "__main__": #If this file is run as a program...
    
    temp = get_kwh() #Getting the temperature data
    
    print(temp) #Printing the data
    
