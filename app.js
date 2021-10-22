var addDepositBtn = document.getElementById('addDepositBtn');
var addWithdrawBtn = document.getElementById('addWithdrawBtn');
var inputs = document.querySelectorAll('.inputArea input');

// LOGIN PROCESS
const loginArea = document.getElementById('loginArea');
const mainArea = document.getElementById('mainArea');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', ()=>{
  loginArea.style.display ="none";
  mainArea.style.display ="flex";
})

// DOMCONTENT LOADED
document.addEventListener('DOMContentLoaded', ()=>{


  console.log(localStorage.getItem('currentDeposit'));

  updateSpanText('currentDeposit', parseInt(localStorage.getItem('currentDeposit')) || 0 )
  updateSpanText('currentWithdraw', parseInt(localStorage.getItem('currentWithdraw')) || 0 )
  updateSpanText('currentBalance', parseInt(localStorage.getItem('currentBalance')) || 0 )
})
// CLICK THE DEPOSIT OR WITHDRAW BUTTON VIA ENTER KEY
inputs.forEach( (input)=>{
  input.addEventListener('keyup', (e)=> {
    e.preventDefault();
    if(e.keyCode === 13){ //enter key
      var requiredBtn = input.parentNode.lastElementChild;
      requiredBtn.click();
    }
    console.log();
  })
})
// END OF ENTER KEY SECTION

//DEPOSIT BUTTON EVENT HANDLER
addDepositBtn.addEventListener('click', ()=>{
  var depositAmount = getInputAmount('depositAmount');
  // console.log(depositAmount+5);
  updateSpanText('currentDeposit',depositAmount);
  updateSpanText('currentBalance',depositAmount);
  updateFromLocalStorage();
})
//WITHDRAW BUTTON EVENT HANDLER
addWithdrawBtn.addEventListener('click', ()=>{
  var withdrawAmount = getInputAmount('withdrawAmount');
 
  // console.log(depositAmount+5);
  updateSpanText('currentWithdraw',withdrawAmount);
  updateSpanText('currentBalance',-1 * withdrawAmount);
  updateFromLocalStorage();
})

//FUNCTION TO GET AMOUNT WANTED TO DEPOSIT OR WITHDRAW
function getInputAmount(id){
  var input = document.getElementById(id);
  var amount = parseFloat(input.value);
  input.value = ' ';

  var verified = amountVerification(id, amount);

  amount = verified == true ? amount : 0;
  console.log(verified, amount);
  return amount ;
}
// FUNTION TO GET CURRENT VALUE OF DEPOSIT, WITHDRAW OR BALANCE
function getCurrentAmount(id){
  var spanText = document.getElementById(id);
  var currentAmount = parseFloat(spanText.innerText);
  return currentAmount;
}

//FUNCTION TO UPDATE THE TEXT IN THE VIEWING SECTION (DEPOSIT,WITHDRAW & BALANCE)
var updatedAmount;
function updateSpanText(id, amount){
  var spanText = document.getElementById(id);
  var currentAmount = parseFloat(spanText.innerText);
  updatedAmount = currentAmount + amount;
  spanText.innerText = updatedAmount;
}

// FUNCTION TO VERIFY THE WANTED AMOUTN IS EMPT OR NOT, VALID NUMBER OR NOT
function amountVerification(id,amount){
  if(isNaN(amount)){
    alert("Please enter amount in number");
    return false;
  }
  else if(amount <= 0){
    alert("must be more than 0");
    return false;
  }
  else if( id =='withdrawAmount'){

    let currentBalance = getCurrentAmount('currentBalance');
    if(currentBalance < amount){
      alert(" Shortage of balance");
      return false;
    }
  }
  return true;
}
/======= UPDATE TO LOCAL STORAGE  ======= */
function updateFromLocalStorage(){
  let LSDepositAmount = getCurrentAmount('currentDeposit');
  let LSWithdrawAmount = getCurrentAmount('currentWithdraw');
  let LSBalanceAmount = getCurrentAmount('currentBalance');
  localStorage.setItem("currentDeposit", LSDepositAmount);
  localStorage.setItem("currentWithdraw", LSWithdrawAmount);
  localStorage.setItem("currentBalance", LSBalanceAmount);
  console.log(LSDepositAmount);
}