// lab-data.js
export const snippets = [
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
    },
    {
        id: "manipulating-data-with-js",
        title: "Manipulating data with manup()",
        category: "Data Manipulation",
        difficulty: "Intermediate",
        prompt: "Multiply every number in an array by 2.",
        code: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled);`,
        output: "[2, 4, 6]"
    }
];