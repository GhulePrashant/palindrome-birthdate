"use strict"
const btnCheck = document.querySelector(".check-btn");
const inputDate = document.querySelector("#date");
const output = document.querySelector(".content");
const loader = document.querySelector(".loader");

const datesInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

function checkPalindrome(dateString){
    let outputText="";
    const dateArray = dateString.split("-");
    const inputYear = dateArray[0];
    const inputMonth = dateArray[1];
    const inputDate = dateArray[2];

    let isPalindrome = checkAllCombinations(inputYear,inputMonth, inputDate);

    if(isPalindrome){
        outputText = `Hurray!!! Your birthdate in format ${isPalindrome} is palindrome.`;
    }else{
        let [nextDate, diff] = findNextDate(inputDate, inputMonth, inputYear);
        outputText = `Sorry! Your birthdate is not palindrome. Nearest palindrome date is ${nextDate} \n You missed it by ${diff} days.`;
    }

    output.textContent = outputText;
    output.classList.toggle("display");
    loader.classList.toggle("display");
}

function checkAllCombinations(yyyy, mm, dd){
    //yyyymmdd
    const dateFormat1 = yyyy+mm+dd

    //ddmmyyyy
    const dateFormat2 = dd+mm+yyyy

    //mmddyy
    const dateFormat3 = mm+dd+yyyy.substring(2);

    //mddyyyy
    const dateFormat4 = Number(mm) +dd+yyyy;

    if(isPalindrome(dateFormat1)){
        return (`${yyyy}-${mm}-${dd}`);
    }
    else if(isPalindrome(dateFormat2)){
        return(`${dd}-${mm}-${yyyy}`);
    }
    else if(isPalindrome(dateFormat3)){
        return(`${mm}-${dd}-${yyyy.substring(2)}`);
    }
    else if(isPalindrome(dateFormat4)){
        return(`${Number(mm)}-${dd}-${yyyy}`);
    }
    else{
        return null;
    }
}

function isPalindrome(date){
    return date===date.split("").reverse().join("");
}

function findNextDate(date, month, year){
    let forwardDate= Number(date);
    let forwardMonth= Number(month);
    let forwardYear=Number(year);
    let backwardDate= Number(date);
    let backwardMonth= Number(month);
    let backwardYear=Number(year);

    for(let i=1; i>0; i++){
        //forward check
        forwardDate= forwardDate+1;
        if(forwardDate> Number(datesInMonth[forwardMonth-1])){
            forwardDate= 1;
            forwardMonth = forwardMonth+1;
            if(forwardMonth > 12){
                forwardMonth = 1;
                forwardYear = forwardYear+1;
            }
        }
        let yyString = forwardYear.toString();
        let mmString = forwardMonth.toString();
        let ddString = forwardDate.toString();
        if(mmString.length==1){
            mmString="0"+mmString;
        }
        if(ddString.length==1){
            ddString="0"+ddString;
        }
        let isPalindrome = checkAllCombinations(yyString, mmString, ddString);
        if(isPalindrome){
            return [`${isPalindrome}`, i];
        }

        //backward check
        if(backwardYear>1){
           backwardDate =backwardDate-1;
            if(backwardDate<1){
               backwardMonth =backwardMonth-1;
                if(backwardMonth < 1){
                   backwardMonth = 12;
                    backwardYear = backwardYear-1;
                    if(backwardYear<1){
                        break;
                    }
                   backwardDate = datesInMonth[backwardMonth-1];
                }
            }
            let yyString = backwardYear.toString();
            let mmString =backwardMonth.toString();
            let ddString =backwardDate.toString();
            if(mmString.length==1){
                mmString="0"+mmString;
            }
            if(ddString.length==1){
                ddString="0"+ddString;
            }
            let isPalindrome = checkAllCombinations(yyString, mmString, ddString);
            if(isPalindrome){
                return [`${isPalindrome}`, i];
            }
        }
    }
    return "No palindrome exists."
}

btnCheck.addEventListener('click', (e)=>{
    e.preventDefault();
    let value = inputDate.value;
    loader.classList.toggle("display");
    setTimeout(function (){
        checkPalindrome(value)
    },3000);
})
