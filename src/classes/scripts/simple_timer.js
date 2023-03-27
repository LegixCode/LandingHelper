export const simple_timer = `function set_cookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}
function get_cookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name +'=');
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function write_timer(elements, time) {
  const value =
    Math.floor(time / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (time % 60).toString().padStart(2, "0");
  for (let element of elements) element.innerHTML = value;
}
function start_timer(className, minutes) {
  let time = minutes * 60;
  if (get_cookie("time")) {
    time = parseInt(get_cookie("time"), 10);
  } else {
    set_cookie("time", time, 1);
  }
  let elements = document.getElementsByClassName(className);
  write_timer(elements, time);
  const timerInterval = setInterval(() => {
    write_timer(elements, time);
    set_cookie("time", --time, 1);
    if (time < 0) {
      clearInterval(timerInterval);
      set_cookie("time", "", -1);
    }
  }, 1000);
}
start_timer("simple_timer", 2);
`;