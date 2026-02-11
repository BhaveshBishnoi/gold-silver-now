<?php
$pageTitle = "Contact Us - Gold Silver Now";
$pageDesc = "Get in touch with Gold Silver Now for support, inquiries, or feedback.";
$page = 'contact';
include_once __DIR__ . '/includes/header.php';
?>

<!-- Main Content -->
<section class="container" style="padding: 4rem 2rem; min-height: 60vh;">
    <h1 style="margin-bottom: 2rem;">Contact Us</h1>
    <div style="background: var(--card-bg); padding: 2rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2rem;">
            Have questions about our data or suggestions for improvement? We'd love to hear from you.
        </p>

        <div style="display: grid; gap: 2rem; max-width: 600px;">
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <i class="fa-solid fa-envelope" style="color: var(--gold-primary); font-size: 1.5rem; margin-top: 0.25rem;"></i>
                <div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Email Support</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">For general inquiries & partnerships:</p>
                    <a href="mailto:contact@goldsilvernow.in" style="color: var(--gold-primary); font-weight: 500;">contact@goldsilvernow.in</a>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <i class="fa-solid fa-clock" style="color: var(--gold-primary); font-size: 1.5rem; margin-top: 0.25rem;"></i>
                <div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Response Time</h3>
                    <p style="color: var(--text-secondary);">
                        We aim to respond to all inquiries within 24-48 business hours.
                    </p>
                </div>
            </div>

            <div style="margin-top: 2rem; padding: 1.5rem; background: var(--secondary-bg); border-radius: 0.5rem;">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Send us a Message</h4>
                <form onsubmit="event.preventDefault(); alert('Message sent! (Demo only)');">
                    <input type="text" placeholder="Name" class="form-input">
                    <input type="email" placeholder="Email" class="form-input">
                    <textarea placeholder="Message" rows="4" class="form-input"></textarea>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    </div>
</section>

<?php include_once __DIR__ . '/includes/footer.php'; ?>