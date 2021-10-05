# ANSWERS

## General / Computer Science / Javascript

Try to answer from your own knowlege first!

1 - What is a stack? Have you ever had reason to use one?

2 - What is time complexity? How would you characterize in words the
  difference between O(n) and O(log n)?

3 - With respect to functions, what is the difference between “call by
  reference” and “call by value”?

4 - What is a hash function? Why are Javascript objects sometimes called “hashes”?

5 - What does it mean for a database to be normalized? Why might you
  want a database to be normalized?
  
6 - What might you expect the Mongo query `db.users.find({ userName: /[A-Z]+/ })`
  to return?

## Answers

### 1

A stack is a data structure that follows the idea "the first in is the last out" it's useful to flip over data order.

### 2

It's the estimated time and resource consumption of a code piece

* O(n) is the estimated complexity for a process consuming n time units. In the example the complexity is O(n), n=100 because someFunction(i) will be called n times E.g:

```
having -> n=100

for(let i=0; i<n.length, i++){
  someFunction(i)
}
```

* O(log n) is the estimated complexity for a process consuming a fraction of n, time unit. The next example is O(log n) because for n=100, someFunction(i) is not executed n times but a fraction of n times. E.g:

```
having -> n=100

for(let i=0; i<=n.length, i+25){
  someFunction(i)
}
```

### 3

 Call by value a access to the value of a var if it's a primitive value. In the example a=2 and it's called by value E.g.

```
let a = 1;
function someFunction(a){
  a+=1
}
```

Call for reference access to the path of the resource in memory. In the example a is accessed by reference because it's not a primitive value. E.g:

```
let a = [1,2,3];
function someFunction(a){
  a.push(159)
}
```

### 4

* It's a function that receive a data, and based on this data size, stablish the size of the hashed result.
  
* Considering that Objects and Arrays are essentially object and have Object().keys().length and Array().length they can store and amount of data and return a structure with the same length without change the complexity, then they are hashes.

### 5

* In simple words it's a way to eliminate redundancy making the database as delimited as possible.

* In a complex business in witch there are many relations among tables. Normalization helps to avoid repeat characteristic among them and split the business in small entities.

### 6

* It will return all users that their userName field start with capital letter in the range of A to Z.
  