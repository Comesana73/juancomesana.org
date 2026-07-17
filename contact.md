---
title: "Contact"
description: "Contact page for Juan Comesaña."
permalink: /contact/
---

<div class="content content--center" markdown="1">

## Contact

<a class="contact-email" href="#" data-user="juan.comesana" data-domain="rutgers.edu">Email Juan</a>

<script>
  (function () {
    const link = document.querySelector(".contact-email");
    if (!link) return;
    const email = `${link.dataset.user}@${link.dataset.domain}`;
    link.href = `mailto:${email}`;
    link.textContent = "Email Juan";
  })();
</script>

</div>
