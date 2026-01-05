import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import styles from './styles/App.module.scss';
import clsx from 'clsx';
import CheckBox from './CheckBox'
import Radio from './Radio'
import Modal from './Modal'
import Button from './components/Button'
import { Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MyInput from './MyInput'
import WinSize from './WinSize';
import Counting from './Counting';

export function App() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addCount = () => setCount((cnt) => cnt + 1);
  const resetCount = () => setCount(0);
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to={`/color/${count}`}>About</Link>
      </nav>

      <div>
        <a href="https://vite.dev" target="_blank">
          <span className={styles.logoHitbox}>
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </span>
        </a>
        <a href="https://react.dev" target="_blank">
          <span className={styles.logoHitbox}>
            <img src={reactLogo} className={clsx(styles.logo, styles.react)} alt="React logo" />
          </span>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <div className={clsx(styles.card,styles.btn)}>
          <Counting
            count = {count}
            addCount = {addCount}
            resetCount = {resetCount}
          />
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>

      <Routes>
        <Route path="/" element={<CheckBox/>} />
        <Route path="/color/:cnt" element={<Radio/>} />
      </Routes>

      <Button $primary onClick={() => setOpen(true)}>Open</Button>
      <AnimatePresence>
        {open && (
          <Modal 
          open={open} 
          onClose={() => setOpen(false)}
          beforeClose={() => {
            return window.confirm('确定要关闭吗？');
          }}
          closeOnOverlayClick={false}
          >
            <Modal.Header><h2>TEST MODAL HEADER</h2></Modal.Header>
            <Modal.Body>
              <h2>Hello</h2>
              <p>这是一个模态弹窗</p>
            </Modal.Body>
            <Modal.Footer><span>TEST MODAL FOOTER</span></Modal.Footer>
          </Modal>
        )}
      </AnimatePresence>
      
      <div>
        <MyInput ref={inputRef} />
        <button onClick={() => inputRef.current?.focus()}>
          Focus
        </button>
      </div>

      <WinSize/>
    </>
  )
}

// export default App
