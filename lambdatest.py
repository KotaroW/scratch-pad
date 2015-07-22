#!/usr/bin/python

# a lambda function within a dictionary
myDictionary = { "val1" : 100, "val2" : 199, "lambda" : lambda : myDictionary["val1"] + myDictionary["val2"] }

# call the lambda function - return value is 299
print ( myDictionary["lambda"]() )
