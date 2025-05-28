const password = document.getElementById('password');
const message = document.getElementById('message');
const strength = document.getElementById('strength');
const submitButton = document.querySelector('button');

password.addEventListener('input', function() {
  const passwordValue = password.value;
  const passwordLength = passwordValue.length;

  let strengthValue = '';
  let hasUpperCase = /[A-Z]/.test(passwordValue); 
  let hasNumbers = /[0-9]/.test(passwordValue);
  let hasSpecialChars = /[^a-zA-Z0-9]/.test(passwordValue);
  
  if (passwordLength === 0){
    strengthValue = '';
  }else if(passwordLength < 5 && (hasUpperCase || hasNumbers || hasSpecialChars)){
    strengthValue = 'Medium';
    message.style.color = 'orange';
  }else if(passwordLength < 5){
    strengthValue = 'Weak';
    message.style.color = 'red';
  }else if(passwordLength < 10  && (hasUpperCase ||hasNumbers || hasSpecialChars)){
    strengthValue = 'Strong';
    message.style.color = 'orange';
  }else if(passwordLength < 10){
    strengthValue = 'Medium';
    message.style.color = 'green';
  }else if(passwordLength >= 10){
    strengthValue = 'Strong';
    message.style.color = 'green';
  }

  strength.textContent = strengthValue;
  message.style.display = 'block';
});

submitButton.addEventListener('click', function() {
  const passwordType = password.getAttribute('type');

  if (passwordType === 'password') {
    password.setAttribute('type', 'text');
  }else{
    password.setAttribute('type', 'password');
  }
});
