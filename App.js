import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];
export default function App() {
  const [itema, setitema] = useState([]);
  /*
 handleitemadd ফাংশনটি নতুন আইটেম যোগ করার জন্য ব্যবহৃত হয়। চলুন আরো স্পষ্ট করে দেখি:

handleitemadd(itemo):

1.এটি একটি ফাংশন যা যখনই কোনো নতুন আইটেম যোগ করা হবে, তখন তা কল করা হয়।
2.itemo হল সেই নতুন আইটেম যা ফর্ম থেকে পাঠানো হয়েছে।
3.setitema((ioto) => { return [...ioto, itemo]; }):

4.setitema হল সেই ফাংশন যা itema স্টেট আপডেট করার জন্য ব্যবহৃত হয়।
5.ioto হল বর্তমান বা আগের itema স্টেট, যা একটি অ্যারে।
6.return [...ioto, itemo] এই লাইনটি বর্তমান ioto স্টেটের (আগের আইটেমগুলো) একটি কপি তৈরি করে এবং তার সাথে নতুন itemo আইটেমটি অ্যারের শেষে যোগ করে।
এইভাবে নতুন আইটেম itema স্টেটের অ্যারের শেষে যোগ করা হয়।*/
  function handleitemadd(itemo) {
    setitema((ioto) => {
      return [...ioto, itemo];
    });
  }
  function HandleDeleteitem(id) {
    setitema((itema) => itema.filter((list) => list.id !== id));
  }
  function handleToggoleItem(id) {
    setitema((itema) =>
      itema.map((ache) =>
        ache.id === id ? { ...ache, packed: !ache.packed } : ache
      )
    );
  }
  return (
    <div className="app">
      <Logo />

      <Form onadditem={handleitemadd} />
      <Packinglist
        notonitem={itema}
        onDelting={HandleDeleteitem}
        onToggleitem={handleToggoleItem}
      />
      <Stats />
    </div>
  );
  /*এটি App কম্পোনেন্টের রিটার্ন স্টেটমেন্ট। এখানে চারটি কম্পোনেন্ট ব্যবহার
      করা হয়েছে: Logo, Form, Packinglist, এবং Stats। Form কম্পোনেন্টে
      handleitemadd ফাংশনটি onadditem নামের প্রপ হিসেবে পাঠানো হয়েছে, এবং
      Packinglist কম্পোনেন্টে itema স্টেটটি notonitem প্রপ হিসেবে পাঠানো হয়েছে।
      */
}
function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}
function Form({ onadditem }) {
  /*Form একটি কম্পোনেন্ট যা নতুন আইটেম যোগ করার জন্য একটি ফর্ম প্রদান করে। এখানে দুটি state রয়েছে: description এবং quantity, যা ফর্মের ইনপুটগুলি পরিচালনা করে। onadditem হচ্ছে সেই ফাংশন যা App থেকে প্রপ হিসেবে এসেছে। */
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);
  /*handlesubmit ফাংশনটি ফর্মটি সাবমিট করার জন্য ব্যবহৃত হয়। e.preventDefault() দিয়ে ডিফল্ট সাবমিট আচরণ বন্ধ করা হয়। যদি description ফাঁকা থাকে, তাহলে ফাংশনটি কিছুই করবে না। এরপর নতুন আইটেম অবজেক্ট তৈরি করে onadditem ফাংশনটি কল করা হয় এবং ফর্মের ইনপুটগুলি রিসেট করা হয়। */
  function handlesubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newitem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newitem);
    onadditem(newitem);
    setdescription("");
    setquantity(1);
  }
  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h1>What do you need for your 😍 trip</h1>
      <select value={quantity} onChange={(e) => setquantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function Packinglist({ notonitem, onDelting, onToggleitem }) {
  return (
    <div className="list">
      <ul>
        {notonitem.map((item) => (
          <Item
            key={item.id}
            onDelting={onDelting}
            onToggleitem={onToggleitem}
            ashik={item}
          />
          // Item ...এখানে "Item" নামে যেই ট্যাগ ব্যবহার করা হয়েছে, সেটি আসলে Item নামের ফাংশনাল কম্পোনেন্টকে নির্দেশ করছে।
        ))}
      </ul>
    </div>
  );
  /*function Packinglist({ notonitem }):

1.Packinglist একটি ফাংশনাল কম্পোনেন্ট যা একটি প্রপ { notonitem } গ্রহণ করে।
notonitem আসলে itema স্টেটের ডাটা যা App কম্পোনেন্ট থেকে প্রপ হিসেবে পাস করা হয়েছে।
return ( ... ):

2.এই কম্পোনেন্টটি একটি div এবং তার মধ্যে একটি ul (unordered list) রিটার্ন করে।
{notonitem.map((item) => ( ... ))}:

3.notonitem হচ্ছে একটি অ্যারে, এবং আমরা সেই অ্যারে-র উপর .map() মেথড প্রয়োগ করছি।
4.map মেথডের মাধ্যমে প্রতিটি আইটেমের জন্য Item কম্পোনেন্ট রেন্ডার করা হচ্ছে।
5.প্রতিটি আইটেমের key হিসেবে item.id ব্যবহার করা হয়েছে, যা React-এর জন্য প্রয়োজনীয় যাতে প্রতিটি লিস্ট আইটেমকে আলাদা করে চিহ্নিত করা যায়।
ashik={item} দ্বারা আইটেমটি Item কম্পোনেন্টে প্রপ হিসেবে পাস করা হয়েছে। */
}
function Item({ ashik, onDelting, onToggleitem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={ashik.packed}
        onChange={() => onToggleitem(ashik.id)}
      />
      <span style={ashik.packed ? { textDecoration: "line-through" } : {}}>
        {ashik.quantity} {ashik.description}
      </span>

      <button onClick={() => onDelting(ashik.id)}>❌</button>
      {/* onClick={() => onDelting(ashik.id)}: এখানে ashik.id ব্যবহার করা হয়েছে, কারণ ashik হ'ল সেই অবজেক্ট যা প্রপ হিসেবে এসেছে এবং এর মধ্যে id প্রপার্টি রয়েছে। */}
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>👜👜 you have X item on your list, and you already packed X(x%)</em>
    </footer>
  );
}
