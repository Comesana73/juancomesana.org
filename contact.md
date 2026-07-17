---
title: "Contact"
description: "Contact page for Juan Comesaña."
permalink: /contact/
---

<div class="content content--center" markdown="1">

## Contact

If you would like to reach me, use the address below or the email link.

<p class="notice">
  <span id="email-text">juan [dot] comesana [at] rutgers [dot] edu</span>
  <a class="contact-email" href="#" data-user="juan.comesana" data-domain="rutgers.edu">Send email</a>
</p>

<script>
  (function () {
    const link = document.querySelector(".contact-email");
    const text = document.getElementById("email-text");
    if (!link || !text) return;
    const email = `${link.dataset.user}@${link.dataset.domain}`;
    link.href = `mailto:${email}`;
    link.textContent = "Email Juan";
    text.textContent = email.replace("@", " [at] ").replace(".", " [dot] ");
  })();
</script>

</div>
