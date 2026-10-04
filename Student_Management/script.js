const API_URL = 'http://localhost:8080/api/complaints';
const form = document.getElementById('complaintForm');
const submitButton = document.getElementById('submitButton');
const formMessage = document.getElementById('formMessage');
const description = document.getElementById('description');
const charCount = document.getElementById('charCount');

description.addEventListener('input', () => {
    charCount.textContent = `${description.value.length} / 2000`;
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const complaint = Object.fromEntries(new FormData(form).entries());
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    submitButton.disabled = true;
    submitButton.querySelector('span:first-child').textContent = 'Submitting...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaint)
        });
        if (!response.ok) {
            const details = await response.json().catch(() => ({}));
            throw new Error(details.message || 'The complaint could not be submitted. Please try again.');
        }
        const saved = await response.json();
        form.reset();
        charCount.textContent = '0 / 2000';
        formMessage.textContent = `Complaint registered successfully. Your reference number is #${saved.id}.`;
        formMessage.classList.add('success');
    } catch (error) {
        formMessage.textContent = error instanceof TypeError
            ? 'Could not connect to the server. Start the backend and try again.'
            : error.message;
        formMessage.classList.add('error');
    } finally {
        submitButton.disabled = false;
        submitButton.querySelector('span:first-child').textContent = 'Submit Complaint';
    }
});
