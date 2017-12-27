#!/usr/bin/env Rscript
library(statnet) # initialize necessary library

# Function for calculating Brainerd-Robinson (BR) coefficients
BR <- function(x) {

    rd <- dim(x)[1]  # number of rows in table
    results <- matrix(0,rd,rd) # empty rd x rd matrix 

    # for every row in the table (including all columns), find the absolute difference from all the other rows(including all columns), 
    # sum absolute difference of each column, subtract from 200, enter into rd X rd matrix
    for (s1 in 1:rd) {   
        for (s2 in 1:rd) {
            x1Temp <- as.numeric(x[s1, ]) 
            x2Temp <- as.numeric(x[s2, ])
            br.temp <- 0
            results[s1,s2] <- 200 - (sum(abs(x1Temp - x2Temp)))
        }
    }
    # name matrix sides 
    row.names(results) <- row.names(x)
    

    return(results)
}

# Obtain input table 
br.tab1 <- read.table(file='BR.csv', sep=',', header=T, row.names=1) # the name of each row (site name) should be the first column in the input table
br.tab1 <- na.omit(br.tab1) # remove  rows with missing values

# Ask for user if data are counts or percents
choose.per <- function(){readline("Are the type data percents or counts? 1=percents, 2=counts : ")} # readline gets user input from terminal as char of length 1
per <- as.integer(choose.per())  # converting input to integer

# If user selects counts, convert data to percents and run simulation
if (per == 2) {
br.tab <- prop.table(as.matrix(br.tab1),1)*100  #turn data table into matrix, convert to proportions (by row) multiply by 100 to get percents
br.dat <- BR(br.tab) # actual BR values, returns a matrix (row X row)

# Calculate the proportions of each category in the original data table
c.sum <- matrix(0,1,ncol(br.tab1)) # create an empty matrix with 1 row and n columns based on loaded table columns 
for (i in 1:ncol(br.tab1)) {
    c.temp <- sum(br.tab1[,i]) # add up all entries of each column
    c.sum[,i] <- c.temp #put sum in matrix
}
p.grp <- prop.table(c.sum) # get proportions of sum matrix 

# the results of BR should be used as edge weights between the corresponding sites.  The higher the number, the "thicker" or "shorter" the edge should be.   