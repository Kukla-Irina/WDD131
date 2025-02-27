let participantCount = 1;

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}">First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" required />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date<span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" required />
      </div>
      <div class="item">
        <p>Grade</p>
        <select id="grade${count}" name="grade${count}" required>
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  console.log(feeElements);
  feeElements = [...feeElements];
  const total = feeElements.reduce((sum, element) => {
    const feeValue = parseFloat(element.value) || 0;
    return sum + feeValue;
  }, 0);
  return total;
}

function successTemplate(info) {
  return `
    <p>Thank you ${info.adultName} for registering. You have registered ${
    info.participantCount
  } participants and owe $${info.totalFees.toFixed(2)} in Fees.</p>
  `;
}

function submitForm(event) {
  event.preventDefault();
  const total = totalFees();
  const adultName = document.getElementById("adult_name").value;
  document.querySelector("form").classList.add("hide");
  const summaryElement = document.getElementById("summary");
  summaryElement.classList.remove("hide");
  summaryElement.innerHTML = successTemplate({
    adultName: adultName,
    participantCount: participantCount,
    totalFees: total,
  });
}

document.getElementById("add").addEventListener("click", function () {
  participantCount++;
  const newParticipantHTML = participantTemplate(participantCount);
  const addButton = document.getElementById("add");
  addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
});

document.querySelector("form").addEventListener("submit", submitForm);
