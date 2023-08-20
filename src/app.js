document.addEventListener("DOMContentLoaded", function () {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const labels = document.getElementsByTagName("label");
  const errors = document.querySelectorAll(".err"); 
  const spans = document.querySelectorAll(".value span");
  const submitButton = document.getElementsByClassName("submit")[0]; 
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
  
    const typeOfError = [
      "",
      "This field is required",
      "Must be a valid day",
      "Must be a valid month",
      "Must be a valid year",
      "Must be a valid date"
    ];
  
    function setErrorState(index, input, errorMsg, borderColor) {
      errors[index].textContent = errorMsg;
      labels[index].style.color = borderColor;
      input.style.borderColor = borderColor;
    }
  
    function isLeapYear(day, month, year) {
      const fullDate = new Date(year, month - 1, day);
      return day === fullDate.getDate() && month - 1 === fullDate.getMonth() && year === fullDate.getFullYear();
    }
  
    function isFieldEmpty(input, index) {
      if (!input.value) {
        setErrorState(index, input, typeOfError[1], "#ff5757");
        return true;
      }
      return false;
    }
  
    function isValidRange(input, index, min, max, errorMsg) {
      const value = parseInt(input.value);
      if (isNaN(value) || value < min || value > max) {
        setErrorState(index, input, errorMsg, "#ff5757");
        return false;
      }
      return true;
    }
  
    function isValidDate() {
      const inputYear = parseInt(year.value);
      const inputMonth = parseInt(month.value);
      const inputDay = parseInt(day.value);
  
      if (inputYear > currentYear || (inputYear === currentYear && inputMonth > currentMonth) ||
          (inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay)) {
        setErrorState(0, day, typeOfError[2], "#ff5757");
        setErrorState(1, month, typeOfError[3], "#ff5757");
        setErrorState(2, year, typeOfError[4], "#ff5757");
        return false;
      }
  
      if (!isLeapYear(inputDay, inputMonth, inputYear)) {
        setErrorState(0, day, typeOfError[5], "#ff5757");
        return false;
      }
  
      setErrorState(0, day, typeOfError[0], "");
      setErrorState(1, month, typeOfError[0], "");
      setErrorState(2, year, typeOfError[0], "");
      return true;
    }
  
    function subtractAge() {
      const inputYear = parseInt(year.value);
      const inputMonth = parseInt(month.value);
      const inputDay = parseInt(day.value);
  
      let years = currentYear - inputYear;
      let months = currentMonth - inputMonth;
      let days = currentDay - inputDay;
  
      if (days < 0) {
        months--;
        days += isLeapYear(inputDay, inputMonth, inputYear) ? 30 : 31;
      }
      if (months < 0) {
        years--;
        months += 12;
      }
  
      spans[0].textContent = years;
      spans[1].textContent = months;
      spans[2].textContent = days;
    }
  
    submitButton.addEventListener("click", function () {
      if (isFieldEmpty(day, 0) || !isValidRange(day, 0, 1, 31, typeOfError[2]) || !isValidDate()) return;
      if (isFieldEmpty(month, 1) || !isValidRange(month, 1, 1, 12, typeOfError[3])) return;
      if (isFieldEmpty(year, 2) || !isValidRange(year, 2, 1, currentYear, typeOfError[4])) return;
      
      subtractAge();
    });
  });
  