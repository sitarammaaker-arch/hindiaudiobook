import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "DMCA Policy — HindiAudiobook.com",
  description: "HindiAudiobook.com ki DMCA Policy. Copyright infringement report karne ka process.",
  alternates: { canonical: "https://www.hindiaudiobook.com/dmca" },
};

export default function DMCAPage() {
  return (
    <LegalPage title="DMCA Policy" lastUpdated="March 18, 2025">
      <div className="highlight-box">
        <strong>Copyright Owner?</strong> Agar aapka copyrighted content is website par bina permission ke use ho raha hai, toh neeche diya process follow karein. Hum 48 hours mein action lenge.
      </div>

      <h2>1. DMCA Kya Hai?</h2>
      <p>
        Digital Millennium Copyright Act (DMCA) ek US federal law hai jo online copyright infringement se protect karta hai. HindiAudiobook.com is law ka respect karta hai aur valid copyright complaints par turant action leta hai.
      </p>

      <h2>2. Hamare Content Ke Baare Mein</h2>
      <p>
        HindiAudiobook.com primarily yeh content feature karta hai:
      </p>
      <ul>
        <li><strong>YouTube Embeds:</strong> YouTube ki official embed API use ki jaati hai — copyright YouTube aur content creators ke paas rehta hai</li>
        <li><strong>Archive.org Links:</strong> Public domain ya openly licensed content</li>
        <li><strong>Original Content:</strong> Book descriptions, reviews — ye hamari property hai</li>
      </ul>
      <p>
        Hum apne servers par koi bhi copyrighted audio file <strong>host nahi karte</strong>.
      </p>

      <h2>3. Copyright Infringement Report Karne Ka Process</h2>
      <p>
        Agar aapko lagta hai koi content aapke copyright ka violation karta hai, toh humein yeh information provide karein:
      </p>
      <ul>
        <li>
          <strong>Aapki identity:</strong> Naam, address, phone number, email
        </li>
        <li>
          <strong>Copyrighted work:</strong> Clearly identify karein kaun si work ka copyright aapke paas hai
        </li>
        <li>
          <strong>Infringing content:</strong> Exact URL jo allegedly infringing content contain karta hai
        </li>
        <li>
          <strong>Good faith statement:</strong> "I have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law."
        </li>
        <li>
          <strong>Accuracy statement:</strong> "The information in this notification is accurate, and under penalty of perjury, I am the owner or authorized to act on behalf of the owner."
        </li>
        <li>
          <strong>Electronic signature:</strong> Aapka naam (electronic signature ke roop mein)
        </li>
      </ul>

      <h2>4. DMCA Complaint Kahan Bhejein</h2>
      <div className="highlight-box">
        <strong>📧 DMCA Email:</strong> <a href="mailto:dmca@hindiaudiobook.com">dmca@hindiaudiobook.com</a><br />
        <strong>Subject line:</strong> DMCA Takedown Request — [Content URL]<br />
        <strong>Response time:</strong> 48 hours
      </div>

      <h2>5. Counter-Notice Process</h2>
      <p>
        Agar aapka content hata diya gaya lekin aap believe karte hain ki yeh galti se hua, toh counter-notice bhej sakte hain:
      </p>
      <ul>
        <li>Aapki identity information</li>
        <li>Removed content ki identification</li>
        <li>Statement ki removal galti se hui</li>
        <li>US District Court jurisdiction accept karne ka consent</li>
        <li>Aapka electronic signature</li>
      </ul>

      <h2>6. Repeat Infringer Policy</h2>
      <p>
        HindiAudiobook.com ek strict repeat infringer policy follow karta hai. Jo users repeatedly copyright violations karte hain unhe permanently ban kiya jayega.
      </p>

      <h2>7. Good Faith</h2>
      <p>
        Jaanboojhkar false DMCA complaints legal consequences le sakti hain jisme perjury aur damages claims shamil hain. Please sirf genuine complaints bhejein.
      </p>

      <h2>8. YouTube Content</h2>
      <p>
        Agar aapka YouTube video embed kiya gaya hai aur aap chahte hain ki remove ho, toh direct YouTube se bhi request kar sakte hain — woh apni Content ID system se automatically handle karte hain.
      </p>
      <p>
        YouTube DMCA: <a href="https://support.google.com/youtube/answer/2807622" target="_blank" rel="noopener noreferrer">support.google.com/youtube</a>
      </p>

      <h2>9. Contact</h2>
      <p>
        DMCA ya copyright se related koi bhi sawaal:<br />
        📧 <a href="mailto:dmca@hindiaudiobook.com">dmca@hindiaudiobook.com</a>
      </p>
    </LegalPage>
  );
}
