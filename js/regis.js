const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const ageInput = document.getElementById('age');
const genderSelect = document.getElementById('gender');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const ageError = document.getElementById('ageError');
const genderError = document.getElementById('genderError');
const responseMessage = document.getElementById('responseMessage');

function displayError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(errorElement) {
    errorElement.style.display = 'none';
}

function validateName(name) {
    if (name.trim() === '') {
        displayError(nameError, 'Nama tidak boleh kosong.');
        return false;
    }
    for (let i = 0; i < name.length; i++) {
        const charCode = name.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
            displayError(nameError, 'Nama hanya boleh mengandung huruf dan spasi.');
            return false;
        }
    }
    hideError(nameError);
    return true;
}

function validateEmail(email) {
    if (email.trim() === '') {
        displayError(emailError, 'Email tidak boleh kosong.');
        return false;
    }

    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    if (atIndex === -1 || dotIndex === -1) {
        displayError(emailError, 'Email harus mengandung "@" dan ".".');
        return false;
    }

    if (atIndex > dotIndex) {
        displayError(emailError, 'Tanda "@" harus sebelum tanda ".".');
        return false;
    }

    if (atIndex === 0) {
        displayError(emailError, 'Email tidak boleh dimulai dengan "@".');
        return false;
    }

    if (dotIndex - atIndex <= 1) {
        displayError(emailError, 'Harus ada karakter antara "@" dan ".".');
        return false;
    }

    if (dotIndex === email.length - 1) {
        displayError(emailError, 'Email tidak boleh diakhiri dengan ".".');
        return false;
    }

    hideError(emailError);
    return true;
}

function validatePassword(password) {
    if (password.length < 8) {
        displayError(passwordError, 'Password minimal 8 karakter.');
        return false;
    }

    let hasDigit = false;
    let hasUpperCase = false;

    for (let i = 0; i < password.length; i++) {
        const char = password[i];
        const charCode = password.charCodeAt(i);

        if (charCode >= 48 && charCode <= 57) {
            hasDigit = true;
        }
        if (charCode >= 65 && charCode <= 90) {
            hasUpperCase = true;
        }
    }

    if (!hasDigit) {
        displayError(passwordError, 'Password harus mengandung setidaknya satu angka.');
        return false;
    }
    if (!hasUpperCase) {
        displayError(passwordError, 'Password harus mengandung setidaknya satu huruf kapital.');
        return false;
    }

    hideError(passwordError);
    return true;
}

function validateAge(age) {
    const ageNum = parseInt(age, 10);

    if (isNaN(ageNum)) {
        displayError(ageError, 'Usia harus berupa angka.');
        return false;
    }
    if (ageNum < 18 || ageNum > 99) {
        displayError(ageError, 'Usia harus antara 18 dan 99 tahun.');
        return false;
    }
    hideError(ageError);
    return true;
}

function validateGender(gender) {
    if (gender === '') {
        displayError(genderError, 'Silakan pilih jenis kelamin Anda.');
        return false;
    }
    hideError(genderError);
    return true;
}

function showMessageBox(message, isSuccess) {
    responseMessage.textContent = message;
    responseMessage.style.display = 'block';
    if (isSuccess) {
        responseMessage.style.backgroundColor = 'rgba(3, 172, 19, 0.1)';
        responseMessage.style.borderColor = '#03AC13';
        responseMessage.style.color = '#03AC13';
    } else {
        responseMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        responseMessage.style.borderColor = '#FF0000';
        responseMessage.style.color = '#FF0000';
    }
}

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const age = ageInput.value;
    const gender = genderSelect.value;

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isAgeValid = validateAge(age);
    const isGenderValid = validateGender(gender);

    if (isNameValid && isEmailValid && isPasswordValid && isAgeValid && isGenderValid) {
        console.log('Data yang dikirim:', { name, email, password, age, gender });
        showMessageBox('Registrasi Berhasil! Selamat datang, ' + name + '.', true);
        registrationForm.reset();
    } else {
        showMessageBox('Mohon perbaiki kesalahan pada formulir.', false);
    }
});

nameInput.addEventListener('input', () => validateName(nameInput.value));
emailInput.addEventListener('input', () => validateEmail(emailInput.value));
passwordInput.addEventListener('input', () => validatePassword(passwordInput.value));
ageInput.addEventListener('input', () => validateAge(ageInput.value));
genderSelect.addEventListener('change', () => validateGender(genderSelect.value));
