document.addEventListener("DOMContentLoaded", () => {
    // 1. تأثير الظهور عند التمرير
    const reveal = () => {
        document.querySelectorAll(".reveal").forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // 2. كود الإرسال إلى Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw2l2Tu9n_cZruJQvfV5b5hubCmH5k_FgVh-PdlWcjmeZYGxUZjtHDdXoCXi0-q4NjPmg/exec'; 
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');
    const msg = document.getElementById('form-msg');

    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            btn.disabled = true;
            const originalContent = btn.innerHTML;
            btn.innerHTML = "جاري الإرسال... <i class='fas fa-spinner fa-spin'></i>";
            
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    msg.style.display = "block";
                    msg.style.color = "#38bdf8";
                    msg.innerHTML = "تم استلام رسالتك بنجاح! شكراً لك.";
                    btn.innerHTML = "تم الإرسال ✓";
                    form.reset();
                    setTimeout(() => {
                        msg.style.display = "none";
                        btn.disabled = false;
                        btn.innerHTML = originalContent;
                    }, 5000);
                })
                .catch(error => {
                    msg.style.display = "block";
                    msg.style.color = "#ff4d4d";
                    msg.innerHTML = "حدث خطأ، حاول لاحقاً.";
                    btn.disabled = false;
                    btn.innerHTML = "إعادة المحاولة";
                });
        });
    }
});