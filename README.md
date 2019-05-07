# mad-hatter
Javascript kurs - završni rad
Tema: web sajt imaginarne čajdžinice i prodavnice - "The Mad Hatter" Tea House.
Opis: Stranica predstavlja delatnost čajdžinice, prikazujući osnovne informacije, galeriju slika, kontakt.
Koncipirana je da bude one-page-application. Sa izuzetkom on-line prodavnice, koja je urađena na posebnoj stranici.
Tehnologije: Pri razvooju stranice koristila sam html, css, javascript.
Struktura: Projekat sadrži nekoliko foldera: css, img, img-shop, js, video. U root folderu su smešteni json fajl i dva html fajla.

Stranica se pokreće index.html fajlom. Za njega su vezani styles.css i app.js.
shop.html se odnosi na oon-line prodavnicu, do koje se dolazi linkom sa index.html-a. Za shop.html su vezani stylesShop.css i appShop.js fajlovi kao i products.json.

Pomoću json fajla dinamički ubacujemo proizvode na stranicu on-line prodavnice. 
Kako sam pri razvoju projekta nisam koristila server niti neku spoljnu bazu podataka, podatke iz json-a sam uzimala lokalno.

Važna napomena!
Da bi aplikacija uspešno radila - neophodno je da se index.html pokrene iz Visual Studio Coda uz pomoć Live Servera (koji instaliramo kao ekstenziju za editor).

