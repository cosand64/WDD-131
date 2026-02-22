const form = document.getElementById("paymentForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const cardNumber = document
        .getElementById("cardNumber")
        .value.replace(/\s/g, "");

    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear() % 100;

    if (cardNumber !== "1234123412341234") {
        message.textContent = "Invalid credit card number.";
        message.style.color = "red";
        return;
    }

    if (
        month < 1 || month > 12 ||
        year < currentYear ||
        (year === currentYear && month < currentMonth)
    ) {
        message.textContent = "Card expired.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Payment successful!";
    message.style.color = "green";
});