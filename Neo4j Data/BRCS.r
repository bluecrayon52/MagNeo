library(statnet) # initialize necessary library

# Function for calculating Brainerd-Robinson (BR) coefficients
BR <- function(x) {
rd <- dim(x)[1]
results <- matrix(0,rd,rd)
for (s1 in 1:rd) {
for (s2 in 1:rd) {
x1Temp <- as.numeric(x[s1, ])
x2Temp <- as.numeric(x[s2, ])
br.temp <- 0
results[s1,s2] <- 200 - (sum(abs(x1Temp - x2Temp)))}}
row.names(results) <- row.names(x)
colnames(results) <- row.names(x)
return(results)}

# Obtain input table 
br.tab1 <- read.table(file='BR.csv', sep=',', header=T, row.names=1) # the name of each row (site name) should be the first column in the input table
br.tab1 <- na.omit(br.tab1)

# Ask for user if data are counts or percents
choose.per <- function(){readline("Are the type data percents or counts? 1=percents, 2=counts : ")} 
per <- as.integer(choose.per())

# If user selects counts, convert data to percents and run simulation
if (per == 2) {
br.tab <- prop.table(as.matrix(br.tab1),1)*100
br.dat <- BR(br.tab) # actual BR values

# Calculate the proportions of each category in the original data table
c.sum <- matrix(0,1,ncol(br.tab1))
for (i in 1:ncol(br.tab1)) {
c.temp <- sum(br.tab1[,i])
c.sum[,i] <- c.temp}
p.grp <- prop.table(c.sum)