import "./styles.css";
import { useState } from "react";
import "./css/App.css";

export default function App() {
  const [pack, setPack] = useState([]);

  function addPack({ item }) {
    setPack([...pack, item]);
  }

  function deletePack(props) {
    console.log("deletePack....", pack, props);
    setPack(
      pack.filter((item) => {
        console.log("delete....", item.id, props.id, item.id == props.id);
        return item.id !== props.id;
      })
    );
    console.log("deletePack....", pack);
  }

  function updatePack({ id }) {
    setPack(
      pack.map((item) => {
        if (item.id === id) {
          item.packed = !item.packed;
          return item;
        } else return item;
      })
    );
    console.log("updatePack", pack);
  }

  return (
    <div className="App">
      <Logo></Logo>
      <Form addPack={addPack} pack={pack} />
      <PackingList
        pack={pack}
        deletePack={deletePack}
        updatePack={updatePack}
      />
      <Stats pack={pack} />
    </div>
  );
}

function Logo() {
  return <h1 className="Logo">🏳️‍🌈 Far away 🔋</h1>;
}

function Form({ addPack, pack }) {
  const [cnt, setCnt] = useState(0);
  const [obj, setObj] = useState("");

  function handleOnclick(e) {
    e.preventDefault();
    if (cnt !== 0) {
      // pack = [...pack, { num: cnt, obj: obj }];
      addPack({ item: { num: cnt, obj: obj, id: Date.now(), packed: false } });
    }
    console.log(pack, cnt, obj);
  }

  return (
    <div className="add-form">
      <h3>What do you need for your trip? 🌍</h3>
      <form className="packForm" onSubmit={handleOnclick}>
        <select
          className="select"
          onChange={(e) => {
            setCnt(Number(e.target.value));
            console.log("....", e.target, Number(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, x) => x).map((num) => (
            <option value={num} key={num}>
              <span className="numSpan">{num}</span>
            </option>
          ))}
        </select>
        <input
          className="input_text"
          placeholder="input sth you want."
          onChange={(e) => setObj(e.target.value)}
        ></input>
        <button className="add">add</button>
      </form>
    </div>
  );
}

function PackingList({ pack, deletePack, updatePack }) {
  console.log("PackingList...", pack);

  const [sortItem, setSortItem] = useState("ItemNum");

  let sortPack;

  if (sortItem === "description") {
    sortPack = pack.slice().sort((a, b) => {
      return a.obj.localeCompare(b.obj);
    });
  } else if (sortItem === "ItemNum") {
    sortPack = pack.slice().sort((a, b) => {
      return a.num - b.num;
    });
  }
  return (
    <div className="PackingList">
      <div className="List">
        {sortPack.map((item) => (
          <div className="item">
            <input
              type="checkBox"
              id={item.id}
              onChange={(e) => {
                updatePack({ id: item.id });
              }}
              className="checkBox"
              value={item.packed}
            ></input>
            <span className={item.packed ? "packed" : "unpacked"}>
              {item.num}*{item.obj}
            </span>
            <button
              className="deleteButton"
              onClick={(e) => deletePack({ id: item.id })}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <div className="sortSelection">
        <select
          value={sortItem}
          onChange={(e) => {
            setSortItem(e.target.value);
          }}
          className="selectList"
        >
          <option value="description">sort by the description</option>
          <option value="ItemNum">sort by the ItemNum</option>
        </select>
      </div>
    </div>
  );
}

function Stats({ pack }) {
  console.log("Statats", pack.length);
  var packedCnt = 0;
  pack.map((item)=>{
      if(item.packed){
          packedCnt += 1;
      }
  });
  if(packedCnt === 0){
      return (
      <footer className = "Stats">
        <em>
         ⏱ You have not packed anything, Hurry up!
        </em>
      </footer>
      );
  }
  else if(packedCnt === pack.length){
    return(
    <footer className="Stats">
      <em>
        🚀 You have packed everything on the list!
      </em>
    </footer>
    );
  }
  return (
    <footer className="Stats">
      <em>
        ⏳ You have {pack.length} items on your list,and you already packed
        {pack.map((item) => {
          if (item.packed) return " " + item.obj + " ";
        })}
      </em>
    </footer>
  );
}

function Counter() {
  const [frontDelta, setFront] = useState(0);
  const [backDelta, setBack] = useState(0);
  return (
    <div>
      <p>
        现在从前门进来了{frontDelta}个学生&nbsp;&nbsp;&nbsp;
        <button
          onClick={() => {
            setFront(frontDelta + 1);
          }}
        >
          +
        </button>
      </p>
      <p>
        现在从后门出去了{backDelta}个学生&nbsp;&nbsp;&nbsp;
        <button
          onClick={() => {
            setBack(backDelta + 1);
          }}
        >
          +
        </button>
      </p>
      <p>现在教室里一共有{frontDelta - backDelta}个学生</p>
    </div>
  );
}
