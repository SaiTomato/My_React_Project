// import { memo } from "react";
import Button from "./components/Button";

type propComp ={
    count : number;
    addCount : ()=>void;
    resetCount : ()=>void;
}

// 父组件内count本来就会跟着变，memo有没有加根本没差
// const Counting = memo(function Counting({count, addCount, resetCount}:propComp){
//     return <>
//         <Button onClick={addCount}>
//             count is {count}
//         </Button>
//         <Button onClick={resetCount}>
//             Reset
//         </Button>
//     </>
// });

function Counting({count, addCount, resetCount}:propComp){
    return <>
        <Button onClick={addCount}>
            count is {count}
        </Button>
        <Button onClick={resetCount}>
            Reset
        </Button>
    </>
}

export default Counting;