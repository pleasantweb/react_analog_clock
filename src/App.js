import React,{useRef,useEffect,useCallback} from 'react'
import './css/style.scss'
import { GiHummingbird,GiTreeBranch } from "react-icons/gi";

const App = () => {
  const hours = [1,2,4,5,7,8,10,11]
  const hour_clock = useRef()
  const minute_clock = useRef()
  const second_clock = useRef()
  
  // console.log(hour,minute,seconds);

  const hour_clock_angle =useCallback((hour,minute)=>{
    let hour_main
    let hour_angle 
    if(hour > 12 ){
      hour_main = hour - 12
     hour_angle = ((360 / 12) * hour_main) + minute/2
     hour_clock.current.style.transform  =`translate(-50%,50%) rotate(${hour_angle}deg)`
     
    }else{
       hour_main = hour
        hour_angle = (360 / 12) * hour_main
        hour_clock.current.style.transform  =`translate(-50%,50%) rotate(${hour_angle}deg)`
    }
  },[]
  )
  const minute_clock_angle =useCallback((minute)=>{
    
    let minute_angle =(360/60) *  minute
    minute_clock.current.style.transform = `translate(-50%,50%) rotate(${minute_angle}deg)`
  },[])

  const second_clock_angle =useCallback((seconds)=>{
    let second_angle = (360/60) * seconds
    second_clock.current.style.transform =`translate(-50%,50%) rotate(${second_angle}deg)`
    // return second_angle
  },[])

 
  

useEffect(()=>{

 const timeInterval= setInterval(()=>{
    const time = new Date()
    const hour = time.getHours()
    const minute = time.getMinutes()
    const seconds = time.getSeconds()
    second_clock_angle(seconds)
    minute_clock_angle(minute)
    hour_clock_angle(hour,minute)
  
  },1000)
 return ()=> clearInterval(timeInterval)
},[second_clock_angle,minute_clock_angle,hour_clock_angle])
  return (
    <section>
      <GiHummingbird className='bird1' />
      <GiHummingbird className='bird2' />
      <GiTreeBranch className='branch1' />
      <GiHummingbird className='bird3' />
      <GiHummingbird className='bird4' />
      <GiTreeBranch className='branch2' />
      <div className="outer">
      <div className="clock">
        <div className="clock-inside">
          <div className="full hour">12</div>
          <div className="sawa hour">3</div>
          <div className="half hour">6</div>
          <div className="pone hour">9</div>
          {hours.map((e,i)=>{
            return (
              <div key={i} 
                   className="between-hour" 
                   style={{transform:`rotate(${e * 30}deg)`,
                   left:`${e < 6 ? (e % 2 === 0 ? ('90%'):('74%')
                   ):(e % 2 === 0 ? ('8%'):('24%'))}`,
                   top:`${e % 2 === 0 ? (e % 4 === 0 ? ('71%'):('24%'))
                   :(e === 5 || e === 7 ? ('87%'):('7%'))}`}}></div>
            )
          })}
          <div className="time-clocks">
            <div className="time-clocks-div">
            <div className="center">   </div>

              <div ref={hour_clock} className="hour-clock">
                <div className="head"></div>
                <div className="visible"></div>
                  <div className="hidden"></div>
                  
               
              </div>
              <div ref={minute_clock} className="minute-clock">
                  <div className="head"></div>
                  <div className="visible"></div>
                    <div className="hidden"></div>

              </div>

              <div ref={second_clock} className="second-clock">
              <div className="head"></div>
              <div className="visible"></div>
                <div className="hidden"></div>
                 
                  
              </div>
            </div>
            </div>
           
       
        </div>
      </div>
      </div>
    </section>
  )
}
export default App
