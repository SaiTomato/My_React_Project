import {useState, type ChangeEvent} from 'react'
import styles from './styles/CheckBox.module.scss'

function CheckBox() {
  const [hobbies, setHobbies] = useState<string[]>([]);
  const options = ["music", "sports", "movie", "coding", "game", "anime"];
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setHobbies(prev =>
      checked
        ? [...prev, value]
        : prev.filter(v => v !== value)
    );
  };

  const handleSelectAll = () =>{
    setHobbies(options)
  }

  const handleClearAll = () =>{
    setHobbies([])
  }

  return (
    <>
      {options.map(item=>(
        <label key={item}>
          <input type="checkbox" value={item} checked={hobbies.includes(item)} onChange={handleChange} />{item}
        </label>
      ))}

      <div>
        <strong>已选择：</strong>
        {hobbies.length === 0
          ? "无"
          : hobbies.join(", ")}
      </div>

      <div className={styles.checkBoxGroup}>
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleClearAll}>Reset</button>
      </div>
    </>
  );
}

export default CheckBox