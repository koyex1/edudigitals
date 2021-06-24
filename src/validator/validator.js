
//Password validation
export const passwordConfirmValidator = (input, confirmInput)=>{

    if(input !=confirmInput ){
        return true
    }
    else{
        return false;
    }

}
export const emptyValidator = (input) =>{
    if(!input){
        return true;
       // return false;

    }
     else if(input && input.trim()==false){
        return true;
        //return false;

     }
    else{
        return false;
    }
}

export const imageValidator = (input) =>{
    if(!input){
        return true;
       // return false;

    }
    return false;
}

export const alphabetValidator = (input) =>{
    for(let i= 0 ; i<input.length; i++){
    let condition =( (input.charCodeAt(i)>=65 && input.charCodeAt(i)<=90) || (input.charCodeAt(i)>=97 && input.charCodeAt(i)<=122))
    if(!condition){
        return true
    }

    
}

    return false

}

export const emailValidator = (input) =>{
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !pattern.test(input)
}
