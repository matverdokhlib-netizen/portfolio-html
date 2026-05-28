const text = "JavaScript";
const number = 42;
const isStudent = true;
const emptyValue = null;
let notDefined;
const uniqueId = Symbol("id");
const bigNumber = 12345678901234567890n;

console.log(text, typeof text);
console.log(number, typeof number);
console.log(isStudent, typeof isStudent);
console.log(emptyValue, typeof emptyValue);
console.log(notDefined, typeof notDefined);
console.log(uniqueId, typeof uniqueId);
console.log(bigNumber, typeof bigNumber);


console.log(String(number));
console.log(String(isStudent));

console.log(Number("123"));
console.log(Number(""));
console.log(Number(true));
console.log(Number(false));
console.log(Number(null));
console.log(Number(undefined));

console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean("hello"));


const name = "Максим";
const age = 19;
const university = "ХАІ";

console.log(`Студент: ${name}, вік: ${age}, університет: ${university}`);


console.log(5 == "5");
console.log(5 === "5");

console.log(null == undefined);
console.log(null === undefined);

console.log(true == 1);
console.log(true === 1);



function getGrade(score) {

    if (typeof score !== "number" || score < 0 || score > 100) {
        return "невалідний бал";
    }

    if (score <= 59) {
        return "незадовільно";
    } else if (score <= 74) {
        return "задовільно";
    } else if (score <= 89) {
        return "добре";
    } else {
        return "відмінно";
    }
}

console.log(getGrade(95));
console.log(getGrade(70));
console.log(getGrade(-5));

function getSeasonUA(month) {

    switch (month) {

        case 12:
        case 1:
        case 2:
            return "Зима";

        case 3:
        case 4:
        case 5:
            return "Весна";

        case 6:
        case 7:
        case 8:
            return "Літо";

        case 9:
        case 10:
        case 11:
            return "Осінь";

        default:
            return "Невірний місяць";
    }
}

console.log(getSeasonUA(7));

const studentAge = 19;

const status =
    studentAge >= 18
        ? "повнолітній"
        : "неповнолітній";

console.log(status);



const students = [

    {
        name: "Олена Коваленко",
        grade: 87,
        courses: ["JavaScript", "HTML", "CSS"]
    },

    {
        name: "Іван Петренко",
        grade: 55,
        courses: ["Python", "C++"]
    },

    {
        name: "Марія Іваненко",
        grade: 95,
        courses: ["JavaScript", "React"]
    },

    {
        name: "Андрій Сидоренко",
        grade: 72,
        courses: ["HTML", "CSS"]
    },

    {
        name: "Катерина Бондар",
        grade: 91,
        courses: ["JavaScript", "Node.js"]
    },

    {
        name: "Дмитро Мельник",
        grade: 64,
        courses: ["Java", "SQL"]
    }
];

students.push({
    name: "Новий Студент",
    grade: 88,
    courses: ["TypeScript"]
});

console.log(students);

students.pop();

console.log(students);

students.splice(2, 1);

students.splice(1, 0, {
    name: "Анна Шевченко",
    grade: 77,
    courses: ["React", "CSS"]
});

console.log(students);

const excellentStudent =
    students.find(student => student.grade > 90);

console.log(excellentStudent);

const jsStudents =
    students.filter(student =>
        student.courses.includes("JavaScript")
    );

console.log(jsStudents);

const averageGrade =
    students.reduce(
        (sum, student) => sum + student.grade,
        0
    ) / students.length;

console.log(averageGrade);



function rectangleArea1(width, height) {
    return width * height;
}

const rectangleArea2 = function(width, height) {
    return width * height;
};

const rectangleArea3 =
    (width, height) => width * height;

console.log(rectangleArea1(5, 4));
console.log(rectangleArea2(5, 4));
console.log(rectangleArea3(5, 4));

function createCounter() {

    let count = 0;

    return {

        increment() {
            count++;
        },

        decrement() {
            count--;
        },

        getValue() {
            return count;
        }
    };
}

const counter = createCounter();

counter.increment();
counter.increment();
counter.decrement();

console.log(counter.getValue());

function createUser(
    name,
    role = "student",
    isActive = true
) {

    return {
        name,
        role,
        isActive
    };
}

console.log(createUser("Максим"));

const sum = (...numbers) => {

    return numbers.reduce(
        (acc, num) => acc + num,
        0
    );
};

console.log(sum(1, 2, 3));
console.log(sum(10, 20));

function printStudentInfo({
    name,
    grade,
    courses
}) {

    console.log(`${name} має оцінку ${grade}`);
    console.log(`Курси: ${courses.join(", ")}`);
}

printStudentInfo(students[0]);


const studentProfile = {

    firstName: "Максим",

    lastName: "Твердохліб",

    age: 21,

    university: "ХАІ",

    grades: {
        math: 85,
        physics: 92,
        programming: 80
    },

    isActive: true,

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    getAverageGrade() {

        const values =
            Object.values(this.grades);

        return values.reduce(
            (sum, grade) => sum + grade,
            0
        ) / values.length;
    }
};

console.log(studentProfile.firstName);
console.log(studentProfile["lastName"]);

const dynamicKey = "university";

console.log(studentProfile[dynamicKey]);

console.log(Object.keys(studentProfile));
console.log(Object.values(studentProfile));
console.log(Object.entries(studentProfile));

const copiedProfile = {
    ...studentProfile,
    age: 20
};

console.log(copiedProfile);

const labScore =
    studentProfile.grades?.lab;

console.log(labScore);

const mentorName =
    studentProfile.mentor?.name ??
    "Не призначено";

console.log(mentorName);


const products = [

    {
        name: "Ноутбук",
        price: 25000,
        category: "electronics",
        inStock: true,
        quantity: 5
    },

    {
        name: "Смартфон",
        price: 18000,
        category: "electronics",
        inStock: true,
        quantity: 8
    },

    {
        name: "Навушники",
        price: 2500,
        category: "electronics",
        inStock: false,
        quantity: 10
    },

    {
        name: "Стіл",
        price: 7000,
        category: "furniture",
        inStock: true,
        quantity: 2
    },

    {
        name: "Стілець",
        price: 2500,
        category: "furniture",
        inStock: true,
        quantity: 6
    },

    {
        name: "Книга",
        price: 500,
        category: "books",
        inStock: true,
        quantity: 20
    },

    {
        name: "Монітор",
        price: 12000,
        category: "electronics",
        inStock: false,
        quantity: 4
    },

    {
        name: "Лампа",
        price: 1500,
        category: "home",
        inStock: true,
        quantity: 7
    }
];

const totalCost = products
    .filter(product => product.inStock)
    .map(product => product.price * product.quantity)
    .reduce((sum, value) => sum + value, 0);

console.log(totalCost);

const electronics = products
    .filter(product =>
        product.category === "electronics"
    )
    .sort((a, b) => a.price - b.price)
    .map(product => product.name);

console.log(electronics);

const categories = products.reduce(
    (acc, product) => {

        acc[product.category] =
            (acc[product.category] || 0) + 1;

        return acc;
    },

    {}
);

console.log(categories);

const sortedByGrade =
    [...students].sort(
        (a, b) => b.grade - a.grade
    );

console.log(sortedByGrade);

const sortedByName =
    [...students].sort(
        (a, b) =>
            a.name.localeCompare(b.name)
    );

console.log(sortedByName);


function capitalize(str) {

    return
        str.charAt(0).toUpperCase() +
        str.slice(1).toLowerCase();
}

console.log(capitalize("javaScript"));

function countWords(str) {

    return str
        .trim()
        .split(/\s+/)
        .length;
}

console.log(
    countWords("JavaScript це круто")
);

function truncate(str, maxLength) {

    if (str.length <= maxLength) {
        return str;
    }

    return str.slice(0, maxLength) + "...";
}

console.log(
    truncate(
        "Це довгий текст для прикладу",
        15
    )
);

function isValidEmail(email) {

    if (!email.includes("@")) {
        return false;
    }

    if (
        email.indexOf("@") !==
        email.lastIndexOf("@")
    ) {
        return false;
    }

    const atIndex = email.indexOf("@");

    if (atIndex === 0) {
        return false;
    }

    const dotIndex =
        email.lastIndexOf(".");

    if (dotIndex < atIndex + 2) {
        return false;
    }

    if (
        dotIndex >= email.length - 2
    ) {
        return false;
    }

    return true;
}

console.log(
    isValidEmail("user@example.com")
);

console.log(
    isValidEmail("invalid-email")
);