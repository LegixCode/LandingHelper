export const dtime_nums = `function dtime_nums(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    document.write(date.toLocaleDateString());
}`;