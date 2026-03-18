import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer — HindiAudiobook.com",
  description: "HindiAudiobook.com ka Disclaimer. Content accuracy, copyright aur liability ke baare mein jaankari.",
  alternates: { canonical: "https://www.hindiaudiobook.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" lastUpdated="March 18, 2025">
      <div className="highlight-box">
        <strong>Important Notice:</strong> HindiAudiobook.com ek directory/aggregator site hai. Hum audio content host nahi karte — sirf link aur embed karte hain.
      </div>

      <h2>1. General Disclaimer</h2>
      <p>
        HindiAudiobook.com par di gayi information &quot;as is&quot; basis par provide ki jaati hai. Hum kisi bhi implicit ya explicit warranty nahi dete content ki accuracy, completeness ya fitness ke baare mein.
      </p>

      <h2>2. Copyright Disclaimer</h2>
      <p>
        HindiAudiobook.com copyright law ka respect karta hai. Iske baare mein kuch important baatein:
      </p>
      <ul>
        <li>
          <strong>Public Domain Content:</strong> Hum primarily public domain books ki audiobooks feature karte hain jo freely distributable hain.
        </li>
        <li>
          <strong>YouTube Embeds:</strong> YouTube videos YouTube ki embed policy ke under show kiye jaate hain. Original content creators ke rights protect hain.
        </li>
        <li>
          <strong>Archive.org Content:</strong> Archive.org se audio links unke respective licenses ke under hain.
        </li>
        <li>
          <strong>No Hosting:</strong> Hum koi bhi copyrighted audio file apne servers par host nahi karte.
        </li>
      </ul>

      <h2>3. Fair Use</h2>
      <p>
        Kuch content educational aur informational purposes ke liye include kiya jaata hai Fair Use doctrine ke under (Copyright Act Section 107). Iska use:
      </p>
      <ul>
        <li>Non-commercial hai</li>
        <li>Educational purpose serve karta hai</li>
        <li>Original work ki market value affect nahi karta</li>
        <li>Transformative nature ka hai</li>
      </ul>

      <h2>4. Accuracy Disclaimer</h2>
      <p>
        Hum accurate information provide karne ki koshish karte hain lekin guarantee nahi karte ki:
      </p>
      <ul>
        <li>Book descriptions completely accurate hain</li>
        <li>Author information up-to-date hai</li>
        <li>External links hamesha working hain</li>
        <li>Audio quality standard hai</li>
      </ul>

      <h2>5. Affiliate Disclaimer</h2>
      <p>
        HindiAudiobook.com kisi bhi book seller, publisher ya audio platform se financially affiliated nahi hai (unless explicitly mentioned). Hum koi commission nahi lete book purchases se.
      </p>
      <p>
        Google AdSense ke through ads se revenue generate hota hai — yeh standard advertising hai, affiliate marketing nahi.
      </p>

      <h2>6. Professional Advice Disclaimer</h2>
      <p>
        Audiobooks mein jo information share ki jaati hai — financial, medical, legal ya koi bhi professional advice — woh sirf educational/entertainment purposes ke liye hai. Kisi bhi important decision ke liye qualified professional se consult karein.
      </p>

      <h2>7. External Links Disclaimer</h2>
      <p>
        HindiAudiobook.com par external sites ke links hain. Unke content, security ya availability ke liye hum responsible nahi hain. External sites visit karte waqt unki own policies padhein.
      </p>

      <h2>8. Results Disclaimer</h2>
      <p>
        Audiobooks mein bataaye gaye results (financial success, personal development) typical nahi hain. Individual results vary karte hain. Hum koi specific outcome guarantee nahi karte.
      </p>

      <h2>9. Contact for Copyright Issues</h2>
      <p>
        Agar aapko lagta hai ki koi content aapke copyright ka violation karta hai, please immediately contact karein:
      </p>
      <ul>
        <li>📧 Email: <a href="mailto:dmca@hindiaudiobook.com">dmca@hindiaudiobook.com</a></li>
        <li>🌐 DMCA Page: <a href="/dmca">hindiaudiobook.com/dmca</a></li>
      </ul>
      <p>Hum 48 hours mein response karenge aur valid complaints par content remove karenge.</p>
    </LegalPage>
  );
}
