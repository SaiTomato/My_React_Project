import {useState} from 'react'
import styles from "./styles/Radio.module.scss"
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

function Radio() {
  const [color, setColor] = useState('red');
  const{cnt} = useParams();
  return (
    <div className={styles.colorGroup}>
      <h2>Count num : {cnt}</h2>
      <label className={clsx(styles.colorOption,styles.red)}>
        <span className="text">Red:</span>
        <input 
        type="radio" 
        name="color" 
        value="red"
        checked={color === 'red'}
        onChange={e => setColor(e.target.value)}
        />
      </label>

      <label className={clsx(styles.colorOption,styles.blue)}>
        <span className="text">Blue:</span>
        <input 
        type="radio" 
        name="color" 
        value="blue"
        checked={color === 'blue'}
        onChange={e => setColor(e.target.value)}
        />
      </label>
    </div>
  );
}

export default Radio