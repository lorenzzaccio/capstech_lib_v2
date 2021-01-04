/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(d);
    d.setHours(0, 0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}

function addDay(date, nbrDay) {
    var dat = new Date(date);
    dat.setDate(dat.getDate() + nbrDay);
    return dat;
}

function addDay_str(date, nbrDay) {
    return addDay(date, nbrDay).toISOString().split("T")[0];
}

function addYear(date, nbrYear) {
    const d = date.split("-");
    var dat = new Date(parseInt(d[0]+nbrDay)+"-"+d[1]+"-"+d[2]);
    return dat;
}

function getEndYear(date) {
    const d = date.split("-");
    var dat = new Date(parseInt(d[0])+"-12-31");
    return dat;
}

function getEndYear_str(date) {
    return getEndYear(date).toISOString().split("T")[0];
}


function sqlFormat(date) {
    return new Date(date).toISOString().slice(0, 10);
}

function getFirstDayOfWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return sqlFormat(new Date(d.setDate(diff)));
}

function getDayNumberOfWeek(dateString) {
    return new Date(dateString).getDay();
}
function getDayOfWeek(dateString) {

    var d = new Date(dateString);
    var weekday = new Array(7);
    weekday[0] = "Dimanche";//Sunday";
    weekday[1] = "Lundi";//Monday";
    weekday[2] = "Mardi";//Tuesday";
    weekday[3] = "Mercredi";//Wednesday";
    weekday[4] = "Jeudi";//Thursday";
    weekday[5] = "Vendredi";//Friday";
    weekday[6] = "Samedi";//Saturday";

    return weekday[d.getDay()];
}
function show_current_time(){
    var d = new Date();
    var ms = d.getMilliseconds();
    var n = d.toLocaleTimeString()+" "+ms+"ms";
    console.log(n);
    return n;
}

    function set_end_year(a_date){
        const end_year = a_date.split("-");
        end_year[1]="12";end_year[2]="31";
        return end_year;

    }

    function extract_year(a_date){
        const end_year = a_date.split("-");
        return end_year[0];

    }
