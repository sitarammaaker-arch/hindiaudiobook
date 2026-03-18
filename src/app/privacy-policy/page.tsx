import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — HindiAudiobook.com",
  description: "HindiAudiobook.com ki Privacy Policy. Jaanein hum aapka data kaise collect, use aur protect karte hain.",
  alternates: { canonical: "https://www.hindiaudiobook.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 18, 2025">
      <div className="highlight-box">
        <strong>Saral bhasha mein:</strong> HindiAudiobook.com aapki personal information ko kisi third party ko nahi bechta. Hum sirf site improve karne ke liye data use karte hain.
      </div>

      <h2>1. Introduction</h2>
      <p>
        HindiAudiobook.com (&quot;hum&quot;, &quot;humari&quot;, &quot;website&quot;) aapki privacy ko seriously leta hai. Yeh Privacy Policy explain karti hai ki jab aap <strong>www.hindiaudiobook.com</strong> visit karte hain toh hum kaunsa data collect karte hain, kaise use karte hain, aur aapke rights kya hain.
      </p>
      <p>
        Is website ka use karke aap is Privacy Policy se agree karte hain. Agar aap agree nahi karte, toh please website use na karein.
      </p>

      <h2>2. Data Jo Hum Collect Karte Hain</h2>
      <h3>2.1 Automatically Collected Data</h3>
      <p>Jab aap website visit karte hain, yeh information automatically collect hoti hai:</p>
      <ul>
        <li>IP address (anonymized)</li>
        <li>Browser type aur version</li>
        <li>Operating system</li>
        <li>Pages visited aur time spent</li>
        <li>Referring URL (kahan se aaye)</li>
        <li>Device type (mobile/desktop)</li>
      </ul>

      <h3>2.2 Cookies</h3>
      <p>Hum cookies use karte hain jo aapke browser mein save hoti hain. Yeh cookies include karti hain:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Site ka basic function karne ke liye zaroor</li>
        <li><strong>Analytics Cookies:</strong> Google Analytics — site traffic analyze karne ke liye</li>
        <li><strong>Advertising Cookies:</strong> Google AdSense — relevant ads dikhane ke liye</li>
        <li><strong>Preference Cookies:</strong> Aapki settings (resume position, volume) save karne ke liye</li>
      </ul>
      <p>Aap browser settings mein cookies disable kar sakte hain, lekin kuch site features kaam nahi karenge.</p>

      <h3>2.3 LocalStorage Data</h3>
      <p>
        Hum aapke browser ke localStorage mein yeh data save karte hain:
      </p>
      <ul>
        <li>Audiobook resume position (kahan tak suna)</li>
        <li>Star ratings aapne diye</li>
        <li>Volume preferences</li>
      </ul>
      <p>Yeh data sirf aapke device par hota hai — hamare servers par nahi jaata.</p>

      <h2>3. Google AdSense aur Advertising</h2>
      <p>
        HindiAudiobook.com <strong>Google AdSense</strong> use karta hai ads dikhane ke liye. Google apne cookies use karke aapki browsing history ke basis par relevant ads dikhata hai.
      </p>
      <ul>
        <li>Google DoubleClick cookie use hoti hai</li>
        <li>Aap Google&apos;s Ad Settings mein personalized ads opt-out kar sakte hain</li>
        <li>Google ki Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
      </ul>

      <h2>4. Google Analytics</h2>
      <p>
        Hum Google Analytics use karte hain site traffic analyze karne ke liye. Yeh tool anonymized data collect karta hai — aapki personal identity reveal nahi hoti.
      </p>
      <ul>
        <li>IP anonymization enabled hai</li>
        <li>Data retention: 26 months</li>
        <li>Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
      </ul>

      <h2>5. Data Ka Use</h2>
      <p>Collected data ka use hum karte hain:</p>
      <ul>
        <li>Website performance improve karne ke liye</li>
        <li>User experience better banane ke liye</li>
        <li>Relevant ads dikhane ke liye (Google AdSense ke zariye)</li>
        <li>Technical issues fix karne ke liye</li>
        <li>New content decide karne ke liye (popular books)</li>
      </ul>

      <h2>6. Data Sharing</h2>
      <p>
        Hum aapka personal data <strong>kisi ko nahi bechte</strong>. Data sirf in cases mein share hota hai:
      </p>
      <ul>
        <li>Google (Analytics aur AdSense ke liye) — unki privacy policy apply hoti hai</li>
        <li>Legal requirement hone par (court order, government request)</li>
        <li>Site safety protect karne ke liye</li>
      </ul>

      <h2>7. Third-Party Links</h2>
      <p>
        HindiAudiobook.com par kuch links YouTube aur Archive.org jaisi third-party sites par jaati hain. Unki apni privacy policies hain — hum unke liye responsible nahi hain.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        HindiAudiobook.com 13 saal se kam ke bachon ka data knowingly collect nahi karta. Agar aap parent hain aur aapko lagta hai aapke bache ne data share kiya hai, toh humse contact karein.
      </p>

      <h2>9. Aapke Rights</h2>
      <p>Aapke paas yeh rights hain:</p>
      <ul>
        <li>Jaanne ka haq ki hum kaunsa data rakhte hain</li>
        <li>Data delete karwane ka haq</li>
        <li>Data correction ka haq</li>
        <li>Personalized ads opt-out karne ka haq</li>
        <li>Cookies disable karne ka haq</li>
      </ul>

      <h2>10. Data Security</h2>
      <p>
        Hum aapke data ki security ke liye reasonable measures lete hain. Lekin yaad rakhein ki internet par 100% secure transmission possible nahi hai.
      </p>

      <h2>11. Privacy Policy Changes</h2>
      <p>
        Hum yeh policy kabhi bhi update kar sakte hain. Changes is page par post kiye jayenge. Continued use of website means acceptance of updated policy.
      </p>

      <h2>12. Contact</h2>
      <p>
        Privacy se related koi bhi sawaal ho toh contact karein:<br />
        📧 Email: <a href="mailto:privacy@hindiaudiobook.com">privacy@hindiaudiobook.com</a><br />
        🌐 Contact Form: <a href="/contact">hindiaudiobook.com/contact</a>
      </p>
    </LegalPage>
  );
}
