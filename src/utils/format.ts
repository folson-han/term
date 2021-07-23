import moment from "moment";

/**
 * @description formatTime
 * @desc 格式化时间戳
 * @param {number} date 时间戳
 * @param {string} format 时间格式
 * @return {string}
 * */
export function formatTime(date: number, format: string){
    return date.toString().length === 10 ? moment(date * 1000).format(format) : moment(date).format(format);
}