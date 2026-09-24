// lab-data.js
export const snippets = [
    {
        id: "overview",
        title: "Playground Overview",
        category: "Getting Started",
        type: "note", // Flags that this is an overview, not an exercise
        prompt: `Personal vanilla JavaScript workshop tracking practical implementations, algorithmic utilities, and native browser APIs without frameworks.`,
        code: `// Current focus
const focus = "Asynchronous JavaScript & Fetch API";

//Miletones
const milestones = [
  { topic: "DOM & Events", status: "in-progress" },
  { topic: "Async & Fetch", status: "upcoming" },
  { topic: "State & Architecture", status: "upcoming" },
  { topic: "React Framework", status: "upcoming"}
];`,
        output: "Select a topic from the sidebar to inspect the implementation."
    },
    {
        id: "unique-elements",
        title: "Extract Unique Elements from Array",
        category: "Array Methods",
        difficulty: "Beginner",
        prompt: "Given an array containing duplicate numbers, return a new array with all duplicates removed.",
        code: `const numbers = [1, 2, 2, 3, 4, 4, 5, 1];

// Using ES6 Set
const unique = [...new Set(numbers)];

console.log(unique);`,
        output: "[1, 2, 3, 4, 5]"
    },
    {
        id: "array-map-doubler",
        title: "Double Numbers with map()",
        category: "Array Methods",
        difficulty: "Beginner",
        prompt: "Multiply every number in an array by 2.",
        code: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled);`,
        output: "[2, 4, 6]"
    }
];