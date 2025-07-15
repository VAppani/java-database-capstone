// modal.js
document.addEventListener('DOMContentLoaded', () => {
    class Modal {
        constructor(modalId, formId, openBtnId, closeBtnClass) {
            this.modal = document.getElementById(modalId);
            this.form = document.getElementById(formId);
            this.openBtn = document.getElementById(openBtnId);
            this.closeBtn = document.getElementsByClassName(closeBtnClass)[0];

            this.init();
        }

        init() {
            if (this.openBtn && this.closeBtn && this.modal) {
                this.openBtn.onclick = () => this.open();
                this.closeBtn.onclick = () => this.close();
                window.onclick = (event) => {
                    if (event.target === this.modal) {
                        this.close();
                    }
                };
                this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
            }
        }

        open() {
            this.modal.style.display = 'block';
        }

        close() {
            this.modal.style.display = 'none';
            this.form?.reset();
        }

        handleSubmit(e) {
            e.preventDefault();
            // Placeholder for form submission logic (e.g., API call)
            console.log('Form submitted:', {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                specialization: document.getElementById('specialization').value,
                email: document.getElementById('email').value
            });
            this.close();
        }
    }

    // Initialize modal for admin dashboard (example usage)
    if (document.getElementById('addDoctorModal')) {
        new Modal('addDoctorModal', 'addDoctorForm', 'addDoctorBtn', 'close');
    }

    // Export for reuse in other files
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { Modal };
    }
    window.Modal = Modal;
});