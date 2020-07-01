import React, {useState, useEffect, useRef, useContext} from 'react'
import useMousePosition from '../hooks/useMousePosition'
import {ThemeContext} from '../App'

const LikButton: React.FunctionComponent = () =>{
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);
    const positions = useMousePosition();
    /**
     * 使用 useRef 与直接创建一个Object的区别：
     * ref 在所有 render 中保持着唯一的引用，所以获取到的ref都是一个最终的状态，
     * 不会在不同的render中产生隔离
     * 注意：修改ref的值不会引发组件的重新 render
     */
    const likeRef = useRef(0);
    /**
     * 在组件更新的时候进行一些操作
     */
    const didMountRef = useRef(false);

    const domRef = useRef<HTMLInputElement>(null);

    const theme = useContext(ThemeContext);
    const style = {
        background: theme.background,
        color: theme.color,
    };
    useEffect(() => {
       if (didMountRef.current){
           console.log('this is updated')
       } else {
           didMountRef.current = true
       }
    });
    useEffect(() => {
        console.log('document title effect is running');
        document.title = `点击了${like}次`
    }, [like]); //只有like改变时候，才会执行useeffect

    useEffect(()=>{
       if (domRef && domRef.current){
           domRef.current.focus()       // focus 焦点在 这个input框上
       }
    });
    /**
     *  每次渲染后的states 和 props 都会保持不变的
     *  如果props 和 states 在不同的渲染中是相互独立的，
     *  那么它们使用到的任何值都是独立的
     *  如果需要有联系，就要使用 useRef
     */
    function handleAlertClick(){
        setTimeout(() => {
            alert('you clicked on ' + likeRef.current)
        }, 3000)
    }

    return (
        <>
            <h2>X: {positions.x}, Y: {positions.y}</h2>
            <input type={"text"} ref={domRef} />
            {/*下方代码likeRef本身不会触发重新渲染，但是setlike会*/}
            <button style={style} onClick={() => { setLike(like + 1); likeRef.current++ }}>
                {like}
            </button>
            <button onClick={() => {setOn( !on )}}>
                {on ? 'ON' : 'OFF'}
            </button>
            <button onClick={handleAlertClick}>
                Alert!
            </button>
        </>
    )
};
export default LikButton