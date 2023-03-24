const a=`function dtime_nums(offset) {
    const date = new Date()
    date.setDate(date.getDate() + offset)
    let day = date.getDate().toString().padStart(2, 0);
    let month = (date.getMonth() + 1).toString().padStart(2,0);
    document.write({format});
}`;function Y(e){var t="";switch(e){case"DD.MM.YYYY":t="`${day}.${month}.${date.getFullYear()}`";break;case"DD/MM/YYYY":t="`${day}/${month}/${date.getFullYear()}`";break;case"DD-MM-YYYY":t="`${day}-${month}-${date.getFullYear()}`";break;case"YYYY-MM-DD":t="`${date.getFullYear()}-${month}-${day}`";break;case"MM-DD-YYYY":t="`${month}-${day}-${date.getFullYear()}`";break;case"MM/DD/YYYY":t="`${month}/${day}/${date.getFullYear()}`";break}return a.replace("{format}",t)}export{Y as getDTimeNums};
