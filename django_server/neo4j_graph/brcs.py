# Function for calculating Brainerd-Robinson (BR) coefficients

import pandas as pd
import settings  

print("\n")
print("----Brainerd-Robinson Coefficient of Similarity!----\n")

# Obtain input table
# the name of each row (site name) should be the first column in the input table
table = pd.read_csv("BR.csv")
print("-------------------Intitial Table!------------------\n")
print(table)
print("\n")

# remove  rows with missing values
table.dropna(inplace=True)
print("-------------------Drop NA Table!-------------------\n")
print(table)
print("\n")

# ----------For Testing: init the counts global variable and set it from elsewhere eventually---------------  
settings.init() 
# settings.counts = False

# If user selects counts, convert data to percents and run simulation
#turn data table into matrix, convert to proportions (by row) multiply by 100 to get percents
if(settings.counts == True):
    print("--------------Count Data in the Table!--------------\n")
    
    sums = table.sum(1)
    print("-----------------Sum of Rows Table!-----------------\n")
    print(sums)
    print("\n")

    table2 = pd.DataFrame(index=table.index, columns=table.columns)

    for index, row in table.iterrows():
        j = 0
        label = row[0]
        for value in row[1:]: 
            j = j+1
            temp = (value/sums[index])*100
            table2.at[index, table2.columns[0]] = label 
            table2.at[index, table2.columns[j]] = temp 

    print("-----------------Percentage Table!------------------\n")       
    print(table2)
    print("\n")

else :
    print("----------Percentage Data in the Table!-------------\n")

# number of rows in table
rows = table2.index[-1] -1

# empty row x row matrix 
# for every row in the table (including all columns), find the absolute difference from all the other rows(including all columns), 
# sum absolute difference of each column, subtract from 200, enter into row X row matrix
matrix = pd.DataFrame( index = table.iloc[:,0], columns = table.iloc[:,0])

k = -1 
for j in range(0, rows):
    k = k + 1
    for i in range(k, rows):
        temp = 200 - abs(table2.set_index(table2.columns[0]).diff(j).iloc[i]).sum()
        matrix.at[matrix.index[i - k], matrix.columns[i]] = temp
        matrix.at[matrix.index[i], matrix.columns[i - k]] = temp 

print("--------Brainerd-Robinson Similarity Matrix!--------\n")
print(matrix) 
print("\n")

# save matrix as csv for later use 
matrix.to_csv('matrix.csv')    


# Calculate the proportions of each category in the original data table
# create an empty matrix with 1 row and n columns based on loaded table columns
# add up all entries of each column
# put sum in matrix
# get proportions of sum matrix 
motifs = pd.DataFrame(columns = table.columns[1:])
for column in table.columns[1:]: 
    temp = table[column].sum()
    motifs.at[0, column] = temp

print("----------------Total of Each Motif!----------------\n")
print(motifs)
print("\n")

total = motifs.sum(1)

for column in motifs:
    motifs.at[0, column] = (motifs.at[0, column]/float(total))*100
print("------------Percentages of Each Motif---------------\n")
print(motifs)
print("\n")

# save motif percentages for later use
motifs.to_csv('motifs.csv')

# the results of BR should be used as edge weights between the corresponding sites.  
# The higher the number, the "thicker" or "shorter" the edge should be 
