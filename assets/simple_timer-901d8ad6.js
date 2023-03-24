const t=`function start_timer(start_min, start_sec = 0) {
    let min = start_min,
      sec = start_sec,
      intr = setInterval(() => {
        sec -= 1;
        if (sec < 0) {
          min -= 1;
          if (min < 0) {
            clearInterval(intr);
            return;
          }
          sec = 59;
        }
        document.getElementById("simple_timer").innerText = min.toString().padStart(2, 0) + ":" + sec.toString().padStart(2, 0);
      }, 1000);
  }
  start_timer(10);
`;export{t as simple_timer};
