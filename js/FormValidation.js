let isUpdate = false;
let addressbookappObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    Phonenumber();
    checkForUpdate();
});



function validateName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
            textError.textContent = "";
        } catch (e) {
            //console.error(e);
            textError.textContent = e;
        }
    });
}
function Phonenumber() {
    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function () {
        if (phone.value.length == 0) {
            phoneError.textContent = "Phone Number Required";
            return;
        }
        try {
            Phonevalidation(phone.value);
            phoneError.textContent = "";
        } catch (e) {
            console.error(e);
            phoneError.textContent = e;
        }
    });
}
function redirect() {
    console.log("redirect")
    resetForm();   
    window.location.replace(site_properties.home_page)
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
   
    setAddressBookAppObject();
    createAndUpdateStorage();
    alert("Data Stored With Name " + addressbookappObject._name);
    redirect();
}
const setAddressBookAppObject= () => {

    addressbookappObject.id = createNewEmpId();
    addressbookappObject._name = getInputValueId('#name');
    addressbookappObject._phone = getInputValueId('#phone');
    addressbookappObject._city = getInputValueId('#city');
    addressbookappObject._state = getInputValueId('#state');
    addressbookappObject._address = getInputValueId('#address').replace(/\s/g, ' ');
    addressbookappObject._zipcode = getInputValueId('#zipcode');
    
}


const getInputValueId = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValue = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item => {
        if (item.checked) {
            setItem.push(item.value);
        }
    });
    return setItem;
}
const setTextValue = (id, value) => {
    let textError = document.querySelector(id);
    textError.textContent = value;
}

const createNewEmpId = () => {
    let empId = localStorage.getItem('EmpId');
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem('EmpId', empId);
    return empId;
}
const createAndUpdateStorage = () => {
    let dataList = JSON.parse(localStorage.getItem("AddressBookApp"));

    if (dataList) {
        let existingEmpData = dataList.find(empData => empData.id == addressbookappObject.id);
        if (!existingEmpData) {
            dataList.push(addressbookappObject);
        } else {
            const index = dataList.map(empData => empData.id).indexOf(addressbookappObject.id);
            dataList.splice(index, 1, addressbookappObject);
        }
    } else {
        dataList = [addressbookappObject];
    }
    localStorage.setItem("AddressBookApp", JSON.stringify(dataList));
}

const resetForm = () => {
    console.log("resetForm")
    setValue('#name', '');
    setValue('#phone', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#address', '');
    setValue('#zipcode', '');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const jsonData = localStorage.getItem('edit-emp');
    isUpdate = jsonData ? true : false;
    if (!isUpdate) {return}
    else{ addressbookappObject = JSON.parse(jsonData);
        setForm();
    }
}

const setForm = () => {
    setValue('#name', addressbookappObject._name);
    setValue('#phone', addressbookappObject._phone);
    setValue('#city', addressbookappObject._city);

    setValue('#state', addressbookappObject._state);
  
    setValue('#address', addressbookappObject._address);
    setValue('#zipcode', addressbookappObject._zipcode);
}

const setSelectedValue = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) {
            item.checked = true;
        }
    });
}