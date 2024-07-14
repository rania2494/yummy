"use strict";
const userName = $('#userName');
const nameError = $('#nameError');
const email = $('#email');
const emailError = $('#emailError');
const phone = $('#phone');
const phoneError = $('#phoneError');
const age = $('#age');
const ageError = $('#ageError');
const password = $('#password');
const passwordError = $('#passwordError');
const repassword = $('#repassword');
const repasswordError = $('#repasswordError');
const submitBtn = $('#submit');


function nameValidation(){
    let regex=/^[a-zA-Z\s]{2,20}$/gi;
    if(regex.test(userName.val())){
    nameError.addClass('invisible')

    return true
    } else{ 
        nameError.removeClass('invisible')
        return false
    }
}
userName.keyup(()=>{
    nameValidation()
submit()})

function emailValidation(){
    let regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(regex.test(email.val())){
        emailError.addClass('invisible')
        return true
    } else{ 
        emailError.removeClass('invisible')
        return false
    }
}
email.keyup(()=>{emailValidation()
submit()})


function phoneValidation(){
    let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
    if(regex.test(phone.val())){
        phoneError.addClass('invisible')

    return true
    } else{ 
        phoneError.removeClass('invisible')
        return false
    }
}
phone.keyup(()=>{phoneValidation()
submit()})


function ageValidation(){
    let regex=/^[1-9]{1}[0-9]{0,1}$/gi;
    if(regex.test(age.val())){
        ageError.addClass('invisible')

    return true
    } else{ 
        ageError.removeClass('invisible')
        return false
    }
}
age.keyup(()=>{ageValidation()
    submit()})

function passwordValidation(){
    let regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W|.*_).{10,}$/g;

    if(regex.test(password.val())){
        passwordError.addClass('invisible')

    return true
    } else{ 
        passwordError.removeClass('invisible')
        return false
    }
}
password.keyup(()=>{passwordValidation()
submit()})





function repasswordValidation(){
    if(password.val()===repassword.val()&&passwordValidation()==true){
        repasswordError.addClass('invisible')
                return true
                
        }
     else{ 
        repasswordError.removeClass('invisible')

        return false
    }
}
repassword.keyup(()=>{repasswordValidation()
    submit()})



// function  submit (){
//     if(nameValidation()==true&&emailValidation()==true&&ageValidation()==true&&phoneValidation()==true&&passwordValidation()==true&&repasswordValidation()==true){
// sCCC
// // clearData()

// }

// submitBtn.addClass('disabled')

//     } 

function submit (){
if(userName.val()!=''&&email.val()!=''&&phone.val()!=''&&age.val()!=''&&password.val()!=''&&repassword.val()!=''){
    if(nameError.hasClass('invisible')&&emailError.hasClass('invisible')&&phoneError.hasClass('invisible')&&ageError.hasClass('invisible')&&passwordError.hasClass('invisible')&&repasswordError.hasClass('invisible')){
        submitBtn.removeClass('disabled')
    } else{
        submitBtn.addClass('disabled') 
       }

} else {
    submitBtn.addClass('disabled')}
}



function clearData(){
userName.val('')
email.val('')
phone.val('')
age.val('')
password.val('')
repassword.val('')
submitBtn.addClass('disabled') 
}

submitBtn.on('click',clearData)