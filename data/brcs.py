# Function for calculating Brainerd-Robinson (BR) coefficients
# the results of BR should be used as edge weights between the corresponding sites.  
# The higher the number, the "thicker" or "shorter" the edge should be 

import pandas as pd
from io import StringIO

def brcs(table, counts):

    # If counts is true, convert data to percents and run simulation
    # turn data table into matrix, convert to proportions (by row) multiply by 100 to get percents
    if(counts):
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
    rows = table2.index[-1] + 1
    print("Here are the rows: ")
    print(rows)
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
   
    return matrix

def totals(table):
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

    return motifs

def percentages(motifs):
     # Calculate the percentages of each category in the original data table
     # by getting proportions of sum matrix 

    total = motifs.sum(1)

    for column in motifs:
        motifs.at[0, column] = (motifs.at[0, column]/float(total))*100

    print("------------Percentages of Each Motif---------------\n")
    print(motifs)
    print("\n")

    return motifs

def main(): 
    # get string from client 
    # data = StringIO(fileString)
    # table = pd.read_csv(data)

    # origional csv complete with metadata
    table = pd.read_csv('Horses.csv') 

    print("\n")
    print("----Brainerd-Robinson Coefficient of Similarity!----\n")

    # Obtain input table
    # the name of each row (site name) should be the first column in the input table 
    print("-------------------Intitial Table!------------------\n")
    print(table)
    print("\n")

    # remove rows with missing values
    table.dropna(inplace=True)
    table.reset_index(drop=True, inplace=True)
    print("-------------------Drop NA Table!-------------------\n")
    print(table)
    print("\n")

    # remove metadata
    table2 = table.drop(table.columns[[1, 2, 3, 4]], axis=1)
    print("-------------------Drop Metadata Table!-------------------\n")
    print(table2)
    print("\n")

    # similarity matrix 
    matrix = brcs(table2, True)

    # motif totals 
    tot = totals(table2)

    # motif percentages 
    pcnt = percentages(tot)

if __name__== "__main__":
  main()