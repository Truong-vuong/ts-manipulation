// 1.Generics
// function identity(arg: number): number {
//   return arg;
// }
// function identity(arg: any): any {
//   return arg;
// }
function identity(arg) {
    return arg;
}
// let output = identity<string>("myString");
var output = identity("myString");
// -----------------------------------
function expGeneric(arg) {
    return arg;
}
var myExpGeneric = expGeneric;
expGeneric(1);
myExpGeneric('2');
function expGeneric2(arg) {
    return arg;
}
var myExpGeneric2 = identity;
function expGeneric3(arg) {
    return arg;
}
var myExpGeneric3 = identity;
function expGeneric4(arg) {
    return arg;
}
var myExpGeneric4 = identity;
// Generic class
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
// Generic Constraints
function loggingIdentity(arg) {
    // console.log(arg.length);
    return arg;
}
function loggingIdentity2(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity2({ length: 10, value: 3 });
// type CustomerKeys = "name" | "age"
function getProperty(obj, key) {
    return obj[key];
}
var person = {
    name: "John Doe",
    age: 30,
};
var names = getProperty(person, "name"); // Kiểu trả về: string
var age = getProperty(person, "age"); // Kiểu trả về: number
// const invalidProperty = getProperty(person, "email"); 
// Lỗi: Argument of type '"email"' is not assignable to parameter of type 'keyof Customer'.
// Ví dụ  Sử dụng keyof với Generic Types
function getValueByKey(obj, key) {
    return obj[key];
}
var person2 = {
    name: "John Doe",
    age: 30,
};
var name2 = getValueByKey(person, "name"); // Kiểu của name sẽ là string
var age2 = getValueByKey(person, "age"); // Kiểu của age sẽ là number
// ---II.Typeof type operator-------------------------------------------------------------------
// Ví dụ 1: Sử dụng typeof với biến
var ager = 30;
var message = "Hello, TypeScript!";
console.log(typeof age); // Output: "number"
console.log(typeof message); // Output: "string"
// Ví dụ 2: Sử dụng typeof với biểu thức
function multiply(a, b) {
    return a * b;
}
console.log(typeof multiply); // Output: "function"
function test() {
    return { x: 10, y: 3 };
}
// ---IV.Indexed Access Types-------------------------------------------------------------------
var MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
function createLabel(idOrName) {
    throw "unimplemented";
}
var conforms = {
    del: true,
    rodney: false,
};
// Kết quả:
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
var passedObject = {
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
};
// const person = makeWatchedObject({
//   firstName: "Saoirse",
//   lastName: "Ronan",
//   age: 26
// });
// person.on("firstNameChanged", (newValue) => {
//     console.log(`firstName was changed to ${newValue}!`);
// });
// TypeScript sẽ thông báo lỗi nếu chúng ta cố gắng gọi hàm on() với tên thuộc tính không đúng
// person.on("firstName", () => {});
// Lỗi: Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
// Hạn chế dễ dàng gõ sai tên sự kiện
// person.on("frstNameChanged", () => {});
// Lỗi: Argument of type '"frstNameChanged"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
