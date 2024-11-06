function taskPerform(){
    
console.log(text)
var text = "hi"

}


function mapping(){
    const numbers = [1,2,3]
    const dobuled =numbers.map(number=>number*2)
    console.log(dobuled)
}
function filtering(){
    const numbers=[1,2,3,4,5,6]
    const filtered = numbers.filter(filter=>filter%2===0)
    console.log(filtered)
}

function reducing(){
    const numbers=[1,2,3,4]
    const reduced = numbers.reduce((a,number)=>{
 return a-number},0
)
    console.log(reduced)
}

const myObject = {

    myMethod: function() {
   
    console.log(this); 
   
    }
   
   };
   
   
   
   var globalVar = 42;



   function mainFunction(){
   
    var localVar1 = 777;
   
    
   
    var innerFunction1 = function(){
   
       console.log(localVar1); 
   innerFunction1
//    , outputs 777
   
    }
   
   
   
    var innerFunction2 = function(){
   
       console.log(globalVar); 
   innerFunction2
//    , outputs 42
   
    }
   
   
   
    innerFunction1();
   
    innerFunction2();
   
   }
   
   
   
   function outerFunction() {
    let outerVariable = 10;
   
    function innerFunction() {
    let innerVariable = 5;
   
    console.log("Inner Variable:", innerVariable);
    console.log("Outer Variable:", outerVariable);
   
    }
    return innerFunction;
   
   }
   
   let closureFunction = outerFunction();
   
   function sayHello(name) {

   this.name= name 
   
   }
   sayHello.prototype.greet = function(){
    console.log("Hello, my name is " + this.name)
   }
   
   const person1 = new sayHello("Alice")
   const person2 = new sayHello("Balmon")

   function customGreeting(name) {

    console.log("Welcome, " + name + "! How can we assist you today?");
   
   }
   
   
   
   
   
   
   
   function sum(...numbers){
    return numbers.reduce((acc,number)=>
    acc+number,0
    )
   }

   function* simpleGenerator() {

    yield 1;
   
    yield 2;
   
    yield 3;

;
   
   }
   // Creating a generator
   
   const generator = simpleGenerator();
   
   // Using the generator to get values
   
   console.log(generator.next()); // { value: 1, done: false }
   
   console.log(generator.next()); // { value: 2, done: false }
   
   console.log(generator.next()); // { value: 3, done: false }
   
   console.log(generator.next()); // { value: undefined, done: true }






   document.addEventListener("DOMContentLoaded", () => {
    const visitorCountElement = document.getElementById("visitor-count");

    // Fetch the latest count on load, without incrementing
    fetchVisitorCount(false);

    // Check if the user has visited today
    const hasVisitedToday = localStorage.getItem("hasVisitedToday");

    if (!hasVisitedToday) {
        // Increment the count and fetch the updated value
        fetchVisitorCount(true);

        // Store that the user has visited today
        const today = new Date().toDateString();
        localStorage.setItem("hasVisitedToday", today);
    }
});

function fetchVisitorCount(increment = false) {
    // Determine URL based on increment flag
    const url = increment 
        ? 'https://ud23v6jy6d.execute-api.ap-southeast-2.amazonaws.com/visitor-count' // Increment and fetch count
        : 'https://ud23v6jy6d.execute-api.ap-southeast-2.amazonaws.com/visitor'; // Just fetch count

    fetch(url, {
        method: increment ? 'POST' : 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        const visitorCountElement = document.getElementById("visitor-count");
        if (visitorCountElement) {
            visitorCountElement.textContent = `Visitor Count: ${data.count}`;
        }
    })
    .catch(error => {
        console.error("Error fetching visitor count:", error);
    });
}
