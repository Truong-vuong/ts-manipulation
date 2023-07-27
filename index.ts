// 1.Generics
// function identity(arg: number): number {
//   return arg;
// }
// function identity(arg: any): any {
//   return arg;
// }
function identity<Type>(arg: Type): Type {
  return arg;
}
// let output = identity<string>("myString");
let output = identity ("myString");

// -----------------------------------

function expGeneric<Type>(arg: Type): Type {
  return arg;
}
let myExpGeneric: <Type>(arg: Type) => Type = expGeneric;
expGeneric(1)
myExpGeneric('2')

function expGeneric2<Type>(arg: Type): Type {
  return arg;
}
let myExpGeneric2: { <Type>(arg: Type): Type } = identity;

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
function expGeneric3<Type>(arg: Type): Type {
  return arg;
}
let myExpGeneric3: GenericIdentityFn = identity;

interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}
function expGeneric4<Type>(arg: Type): Type {
  return arg;
}
let myExpGeneric4: GenericIdentityFn2<number> = identity;

// Generic class
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// Generic Constraints
function loggingIdentity<Type>(arg: Type): Type {
  // console.log(arg.length);
  return arg;
}

interface Lengthwise {
  length: number;
}
function loggingIdentity2<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
loggingIdentity2({ length: 10, value: 3 });


// ---II.Keyof type operator-------------------------------------------------------------------
type Customer = {
  name: string,
  age: number,
}
type CustomerKeys = keyof Customer;
// type CustomerKeys = "name" | "age"
function getProperty(obj: Customer, key: keyof Customer) {
  return obj[key];
}
const person: Customer = {
  name: "John Doe",
  age: 30,
};
const names = getProperty(person, "name"); // Kiểu trả về: string
const age = getProperty(person, "age"); // Kiểu trả về: number
// const invalidProperty = getProperty(person, "email"); 
// Lỗi: Argument of type '"email"' is not assignable to parameter of type 'keyof Customer'.

// Ví dụ  Sử dụng keyof với Generic Types
function getValueByKey<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const person2: Customer = {
  name: "John Doe",
  age: 30,
};
const name2 = getValueByKey(person, "name"); // Kiểu của name sẽ là string
const age2 = getValueByKey(person, "age"); // Kiểu của age sẽ là number


// ---II.Typeof type operator-------------------------------------------------------------------
// Ví dụ 1: Sử dụng typeof với biến
let ager: number = 30;
let message: string = "Hello, TypeScript!";
console.log(typeof age);     // Output: "number"
console.log(typeof message); // Output: "string"

// Ví dụ 2: Sử dụng typeof với biểu thức
function multiply(a: number, b: number): number {
  return a * b;
}
console.log(typeof multiply); // Output: "function"

function test() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof test>;


// ---IV.Indexed Access Types-------------------------------------------------------------------
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person = typeof MyArray[number];    
// type Person = {
//     name: string;
//     age: number;
// }
type Age = typeof MyArray[number]["age"];
// type Age = number
// // Or
type Age2 = Person["age"];
// type Age2 = number


// ---V.Conditions Types-------------------------------------------------------------------
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "unimplemented";
// }

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

// conditions type constract
// type MessageOf<T> = T["message"];

type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;
// Kết quả: type StrArrOrNumArr = string[] | number[]


// ---Mapping type-------------------------------------------------------------------------------
type Horse = {}
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<Features>;




// ---VII.	Template Literal Types-------------------------------------------------------------------
type World = "world";
type Greeting = `hello ${World}`;
// Kết quả:
// type Greeting = "hello world"

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// Kết quả:
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};
type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
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
