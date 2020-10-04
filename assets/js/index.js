// Variables
const generateButton = document.querySelector(
  '#generateButton'
);
const copyButton = document.querySelector(
  '#copyButton'
);
const customizationForm = document.querySelector(
  '#customizationForm'
);
let passwordField = document.querySelector(
  '#passwordField'
);
let lengthField = document.querySelector(
  '#lengthField'
);
let lengthSlider = document.querySelector(
  '#lengthSlider'
);
let uppercaseField = document.querySelector(
  '#uppercaseField'
);
let lowercaseField = document.querySelector(
  '#lowercaseField'
);
let numberField = document.querySelector(
  '#numberField'
);
let symbolsField = document.querySelector(
  '#symbolsField'
);
let pattern = '';


// Funcs
var Password = {
 
  // _pattern : /[a-zA-Z0-9_\-\+\.]/,
  // _pattern : getCustomization(),
  
  
  _getRandomByte : function()
  {
    // http://caniuse.com/#feat=getrandomvalues
    if(window.crypto && window.crypto.getRandomValues) 
    {
      var result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    }
    else if(window.msCrypto && window.msCrypto.getRandomValues) 
    {
      var result = new Uint8Array(1);
      window.msCrypto.getRandomValues(result);
      return result[0];
    }
    else
    {
      return Math.floor(Math.random() * 256);
    }
  },
  
  generate : function(length, pattern)
  {
    return Array.apply(null, {'length': length})
      .map(function()
      {
        var result;
        while(true) 
        {
          result = String.fromCharCode(this._getRandomByte());
          // if(this._pattern.test(result))
          if(pattern.test(result))
          {
            return result;
          }
        }        
      }, this)
      .join('');  
  }    
    
};

function getCustomization(){
  let allowed = '';

  if (uppercaseField.checked) {
    allowed += 'A-Z';
  }

  if (lowercaseField.checked) {
    allowed += 'a-z';
  }

  if (numbersField.checked) {
    allowed += '0-9'
  }

  if (symbolsField.checked) {
    allowed += '_\\-\\+\\.'
  }

  allowed = '[' + allowed + ']';

  return new RegExp(allowed);
}

function copyPassword(){
  /* Select the text field */
  passwordField.select();
  passwordField.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  passwordField.blur();
  
  /* Alert the copied text */
  alert("Copied the text: " + passwordField.value);
}

function initApp(){
  // Reset the form to initial state
  customizationForm.reset();
  // Retrieve password settings
  pattern = getCustomization();
  // Generate password
  passwordField.value = Password.generate(16, pattern);
  // Set default length value
  lengthField.value = 16;
  lengthSlider.value = 16;
}

// Listeners
copyButton.addEventListener('click', function(){
  copyPassword();
});

generateButton.addEventListener('click', function(){
  let newPassword = getNewPassword();
  
  while (!newPassword.includes('+')) {
    console.log('getting new password');
    newPassword = getNewPassword();
  }

  passwordField.value = newPassword;
  
});

function getNewPassword() {
  let passwordLength = lengthField.value;
  pattern = getCustomization();
  let newPassword = Password.generate(passwordLength, pattern);

  return newPassword;
}

lengthSlider.addEventListener('input', function(){
  lengthField.value = this.value;
});

lengthField.addEventListener('change', function(){
  lengthSlider.value = this.value;
});

initApp();