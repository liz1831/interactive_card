let regEX_Text=/[A-Za-zÑñÁ-Úá-ó]/g;//RegEX para letras
let Regex_Number=/[\d]/g;//Sólo números
let Regex_SpecialCharacter=/[&/\#,+()$~%.¨'":*¿?!¡=<>{}\[\]\-\_\\]/g;

//Cardholder Name
let nameCard = document.querySelector('.card__details__name');
let nameCardInput = document.querySelector('#cardholder');
let nameError= document.querySelector('.form__cardholder--error');

//Card Number
let numberCard=document.querySelector('.card__number');
let numberCardInput=document.querySelector('#CardNumber');
let numberCardError=document.querySelector('.form__inputnumber--error');

//Mes
let cardMonth=document.querySelector('.card_month');
let cardMonthInput=document.querySelector('#cardMonth');
let cardMonthError=document.querySelector('.form__input-mm--error');

//Año
let cardYear=document.querySelector('.card_year');
let cardYearInput=document.querySelector('#cardYear');
let cardYearError=document.querySelector('.form__input-yy--error');

//CVC
let cardCvc=document.querySelector('.card-back__cvc');
let cardCvcInput=document.querySelector('#cardCVC');
let cardCvcError=document.querySelector('.form__input-cvc--error');

//Botón confirmar
let btnConfirm=document.querySelector('.form__submit');
let ValueName=false;
let ValueNumber=false;
let ValueMonth=false;
let ValueYear=false;
let ValueCVC=false;

//Inicializar campos
nameCardInput.value='';
numberCardInput.value='';
cardMonthInput.value='';
cardYearInput.value='';
cardCvcInput.value='';

//Ingreso dinámico del nombre
nameCardInput.addEventListener('input',event=>{
    let InputValueName= event.target.value;
    nameCard.innerText=nameCardInput.value;
    nameCardInput.value=InputValueName.replace(Regex_Number,'').replace(Regex_SpecialCharacter,'');

    if(regEX_Text.test(nameCardInput.value)){
        showError(nameCardInput,nameError,'',false);
    }else{
        showError(nameCardInput,nameError,'Wrong format, only letters [A-z]',true);
    }

    if(nameCardInput.value==''){
        nameCard.innerText='Jane Appleseed';
    }
})

//Ingreso dinámico del numero de tarjeta
numberCardInput.addEventListener('input',event=>{
    let InputValueNumber= event.target.value;
    
    numberCard.innerText=numberCardInput.value;
    if(Regex_Number.test(numberCardInput.value)){
        //Agrega espacios cada 4 digitos y elimina espacios agregados por el usuario.
        numberCardInput.value=InputValueNumber.replace(/[\s]/g,'').replace(/([0-9]{4})/g,'$1 ').trim();
        showError(numberCardInput,numberCardError,'',false);
        ValidateNumber(numberCardInput,numberCardError);
    }else if(Regex_SpecialCharacter.test(numberCardInput.value)){
        numberCardInput.value=InputValueNumber.replace(Regex_SpecialCharacter,'');
        showError(numberCardInput,numberCardError,'Wrong format, numbers only',true);
    }
    else{//Valida que sólo se ingresen numeros.              
        numberCardInput.value=InputValueNumber.replace(regEX_Text,'').trim();//evita el ingreso de texto en el campo número
        showError(numberCardInput,numberCardError,'Wrong format, numbers only',true);
    }
    //Si el campo está vacío muestra los siguientes valores por defecto
    if(numberCardInput.value==''){
        numberCard.innerText='0000 0000 0000 0000';
    }
})

//Ingreso dinámico del mes
cardMonthInput.addEventListener('input',Event=>{
    let InputValueMonth=event.target.value;
    
    if(InputValueMonth.length==1){
        let result='0'.concat(InputValueMonth);
        cardMonthInput.value=result;
    }else if(InputValueMonth.length=3){
        cardMonthInput.value=InputValueMonth.replace('0','').trim();
    }
    cardMonth.innerText=cardMonthInput.value;
    ValidateNumber(cardMonthInput,cardMonthError);
})

//Ingreso dinámico del año
cardYearInput.addEventListener('input',()=>{
    cardYear.innerText=cardYearInput.value;
    ValidateNumber(cardYearInput,cardYearError);
})

//Ingreso dinámico del CVC
cardCvcInput.addEventListener('input',()=>{
    cardCvc.innerText=cardCvcInput.value;
    ValidateNumber(cardCvcInput,cardCvcError);
})

btnConfirm.addEventListener('click',event=>{
    event.preventDefault();
    //validar el nombre
    if(VerifyInputState(nameCardInput,nameError)==true){
        if(nameCardInput.value.length >=6){
            showError(nameCardInput,nameError,'',false);
            ValueName=true;
        }else{
            showError(nameCardInput,nameError,'Wrong name');
            ValueName=false;
        }
    }
    //validar el numero
    if(VerifyInputState(numberCardInput,numberCardError)==true){
        if(numberCardInput.value.length ==19){
            showError(nameCardInput,numberCardError,'',false);
            ValueNumber=true;
        }else{
            showError(numberCardInput,numberCardError,'Wrong number');
            ValueNumber=false;
        }
    }
    //validar el mes
    if(VerifyInputState(cardMonthInput,cardMonthError)){
        if(parseInt(cardMonthInput.value)>=1 && parseInt(cardMonthInput.value)<13){
            showError(cardMonthInput,cardMonthError,'',false);
            ValueMonth=true;
        }else{
            showError(cardMonthInput,cardMonthError,'Wrong month',true);
            ValueMonth=false;
        }
    }
    //validar el año
    let date=new Date();
    let YearLocal = date.getFullYear().toString().slice(-2);//Obtiene los dos últimos valores del año actual. ejemplo: 2022 => 22

    if(VerifyInputState(cardYearInput,cardYearError)){
       if(parseInt(cardYearInput.value)>parseInt(YearLocal)-6 && parseInt(cardYearInput.value)<=parseInt(YearLocal)+5){
            showError(cardYearInput,cardYearError,'',false);
            ValueYear=true;
       }else{
            showError(cardYearInput,cardYearError,'Wrong year',true);
            ValueYear=false;
       }
    }
    //validar cvc
    if(VerifyInputState(cardCvcInput,cardCvcError)){
        if(cardCvcInput.value.length ==3 && Regex_Number.test(cardCvcInput.value)){
            showError(cardCvcInput,cardCvcError,'',false);
            ValueCVC=true;
        }else{
            showError(cardCvcInput,cardCvcError,'Wrong CVC',true);
            ValueCVC=false;
        }
    }

    if(ValueName==true && ValueNumber==true && ValueMonth==true && ValueYear==true && ValueCVC==true){
        console.log('Ok');
        let formSection=document.querySelector('.form');
        let thanksSection=document.querySelector('.thanks-section');

        formSection.style.display='none';
        thanksSection.style.display='block';
    }
})
//Funciones
function showError(DivInput,DivError,msgError,show){
    if(show){
        DivError.innerText=msgError;
        DivInput.style.borderColor = 'hsl(0, 100%, 66%)';
    }else{
        DivError.innerText=msgError;
        DivInput.style.borderColor = 'hsl(279, 6%, 55%)';
    }
}

function VerifyInputState(DivInput,DivError){
    if(parseInt(DivInput.value.length)>0){
        showError(DivInput,DivError,'',false);
        return true;
    }else{
        showError(DivInput,DivError,"Can't be blank",true);
        DivInput.style.borderColor = 'hsl(0, 100%, 66%)';
        return false;
    }
}

function ValidateNumber(input,DivError){
    if(Regex_Number.test(input.value)){
        showError(input, DivError,'',false);
    }else{
        showError(input,DivError,'Wrong value',true);
    }
}
