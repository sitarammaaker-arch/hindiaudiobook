import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — HindiAudiobook.com",
  description: "HindiAudiobook.com ke Terms and Conditions. Website use karne ke rules aur conditions.",
  alternates: { canonical: "https://www.hindiaudiobook.com/terms-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" lastUpdated="March 18, 2025">
      <div className="highlight-box">
        <strong>Please dhyan se padhein:</strong> Is website ka use karke aap in Terms & Conditions se agree karte hain.
      </div>

      <h2>1. Agreement to Terms</h2>
      <p>
        In Terms & Conditions (&quot;Terms&quot;) ko padhkar aap HindiAudiobook.com (&quot;website&quot;, &quot;we&quot;, &quot;us&quot;) ke saath ek legal agreement mein enter karte hain. Agar aap in terms se agree nahi karte toh website use karna band karein.
      </p>

      <h2>2. Website Ka Purpose</h2>
      <p>
        HindiAudiobook.com ek free Hindi audiobook directory hai jo users ko:
      </p>
      <ul>
        <li>Hindi audiobooks discover karne mein help karta hai</li>
        <li>Public domain aur licensed audio content provide karta hai</li>
        <li>Archive.org aur YouTube jaise platforms se audio content embed karta hai</li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <h3>3.1 Website Content</h3>
      <p>
        HindiAudiobook.com ka original content (design, code, descriptions, curated lists) hamari intellectual property hai. Bina permission ke copy ya redistribute karna prohibited hai.
      </p>
      <h3>3.2 Third-Party Content</h3>
      <p>
        Audio content jo hum embed karte hain woh respective copyright holders ki property hai. Hum sirf link/embed karte hain — host nahi karte.
      </p>
      <ul>
        <li>YouTube videos YouTube&apos;s Terms of Service ke under hain</li>
        <li>Archive.org content unke respective licenses ke under hai</li>
        <li>Public domain content freely usable hai</li>
      </ul>

      <h2>4. Acceptable Use</h2>
      <p>Aap is website ka use karte waqt:</p>
      <ul>
        <li>✅ Personal use ke liye audiobooks sun sakte hain</li>
        <li>✅ Friends ke saath links share kar sakte hain</li>
        <li>✅ Educational purposes ke liye use kar sakte hain</li>
        <li>❌ Content scrape ya mass download nahi kar sakte</li>
        <li>❌ Commercial purposes ke liye content use nahi kar sakte</li>
        <li>❌ Automated bots se site access nahi kar sakte</li>
        <li>❌ Site ke security systems bypass nahi kar sakte</li>
        <li>❌ Harmful, illegal ya objectionable content upload nahi kar sakte</li>
      </ul>

      <h2>5. Advertisements</h2>
      <p>
        HindiAudiobook.com Google AdSense ke zariye ads dikhata hai. Yeh ads Google ke policies ke under hain. Hum ad content ke liye responsible nahi hain. Advertised products/services se hum affiliated nahi hain unless explicitly stated.
      </p>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        HindiAudiobook.com &quot;as is&quot; provide kiya jaata hai bina kisi warranty ke. Hum guarantee nahi karte:
      </p>
      <ul>
        <li>Website 24/7 available rahegi</li>
        <li>Content error-free hoga</li>
        <li>Audio links hamesha kaam karenge (third-party dependent)</li>
        <li>Information always up-to-date hogi</li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>
        HindiAudiobook.com kisi bhi direct, indirect, incidental ya consequential damages ke liye liable nahi hai jo website use karne se ho. Iska maximum liability aapke dwara paid amount (jo zero hai kyunki site free hai) tak limited hai.
      </p>

      <h2>8. External Links</h2>
      <p>
        Website mein YouTube, Archive.org aur doosri third-party sites ke links hain. Hum unke content, privacy practices ya availability ke liye responsible nahi hain.
      </p>

      <h2>9. Privacy</h2>
      <p>
        Aapki privacy hamari <a href="/privacy-policy">Privacy Policy</a> ke under govern hoti hai jo in Terms ka part hai.
      </p>

      <h2>10. Modifications</h2>
      <p>
        Hum in Terms ko kabhi bhi modify karne ka right reserve karte hain. Changes website par post kiye jayenge. Continued use means acceptance.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        Yeh Terms Indian law ke under govern hoti hain. Kisi bhi dispute ke liye India ki courts mein jurisdiction hogi.
      </p>

      <h2>12. Contact</h2>
      <p>
        Koi bhi sawaal ho:<br />
        📧 Email: <a href="mailto:legal@hindiaudiobook.com">legal@hindiaudiobook.com</a><br />
        🌐 Contact Form: <a href="/contact">hindiaudiobook.com/contact</a>
      </p>
    </LegalPage>
  );
}
