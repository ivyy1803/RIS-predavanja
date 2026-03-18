
# Predavanje 18.3.2026 – Specifikacija Programa lojalnosti

## 1. Kratek opis sistema
Program lojalnosti Maestro je zasnovan kot robusten, skalabilen in varnostno usmerjen informacijski sistem, namenjen nagrajevanju kupcev na podlagi njihove nakupne aktivnosti. Sistem združuje več ključnih modulov, ki omogočajo včlanitev uporabnikov, zbiranje točk, spremljanje statusov lojalnosti ter ponudbo nagrad. Celotna arhitektura je optimizirana za delovanje v velikih okoljih (500.000+ uporabnikov) ter temelji na Oracle informacijskem sistemu.

Sistem vključuje:
- registracijo uporabnikov s potrditvijo identitete,
- povezavo s poslovnim informacijskim sistemom za avtomatski zajem podatkov o nakupih,
- mesečni izračun točk,
- upravljanje statusov lojalnosti (osnovni, bronasti, srebrni, zlati),
- spletni portal za stranke,
- administrativni portal za zaposlene,
- podporo več jezikom,
- generiranje poročil in statistike,
- modularno arhitekturo za enostavne nadgradnje.

---

## 2. Funkcionalne zahteve

### 2.1 Včlanitev in upravljanje uporabnikov
1. Registracija uporabnikov preko spleta z varno potrditvijo e-pošte. **MUST**
2. Avtomatsko generiranje uporabniškega računa in pošiljanje fizične kartice. **MUST**
3. Skladnost z GDPR in drugimi varnostnimi standardi. **MUST**
4. Integracija s tiskalnimi sistemi za proizvodnjo kartic. **SHOULD**
5. Uporabniki lahko urejajo svoje osebne podatke. **SHOULD**

### 2.2 Statusi lojalnosti
6. Sistem podpira osnovni, bronasti, srebrni in zlati status. **MUST**
7. Status se samodejno spreminja glede na vrednost nakupov. **MUST**
8. Administratorji lahko spreminjajo pogoje statusnih prehodov. **MUST**

### 2.3 Točke zvestobe
9. Mesečan izračun točk na podlagi nakupov. **MUST**
10. Točkovnik prilagojen statusu uporabnika. **MUST**
11. Preverjanje upravičenosti do spremembe statusa pred dodelitvijo točk. **MUST**

### 2.4 Spletni portal za stranke
12. Pregled trenutnih točk in zgodovine. **MUST**
13. Unovčevanje točk za nagrade. **MUST**
14. Pregled nakupnega programa. **MUST**

### 2.5 Administrativni portal
15. Pregled statusov uporabnikov po obdobjih. **SHOULD**
16. Pregled statistike nakupov. **SHOULD**
17. Izvajanje SQL poizvedb. **SHOULD**
18. Upravljanje nagrad. **MUST**
19. Upravljanje pravil nagrajevanja. **MUST**

### 2.6 Ostale zahteve
20. Podpora 500.000+ uporabnikom. **MUST**
21. Podpora slovenščini in angleščini. **MUST**

---

## 3. Tehnične zahteve (razširjeno)

### 3.1 Oracle podatkovna baza
Oracle DB se uporablja zaradi:
- visoke razpoložljivosti (RAC, Data Guard),
- robustnih varnostnih mehanizmov,
- ACID transakcij,
- odlične podpore za velike podatkovne količine,
- naprednih indeksov in optimizacije poizvedb.

### 3.2 Horizontalna razširljivost
Sistem mora podpirati:
- dodajanje strežnikov brez izpada,
- load balancing,
- stateless poslovno logiko,
- centralizirano hrambo sej (Redis),
- porazdeljeno procesiranje mesečnih izračunov.

### 3.3 Varnost
Upoštevanje OWASP smernic:
- zaščita pred XSS, SQLi, CSRF,
- TLS 1.2+ na vseh točkah komunikacije,
- validacija podatkov na strani strežnika in odjemalca,
- dvostopenjska verifikacija identitete,
- šifriranje občutljivih podatkov v podatkovni bazi.

### 3.4 Sodobni spletni vmesnik
- odziven dizajn,
- podpora mobilnim napravam,
- React/Vue/Angular,
- prikaz grafov za statistiko,
- optimizirana hitrost nalaganja.

### 3.5 Integracija s poslovnim informacijskim sistemom
- varen API dostop (OAuth2, VPN),
- sinhronizacija podatkov mesečno ali po potrebi,
- validacija podatkov pred obdelavo,
- beleženje napak uvoza.

### 3.6 Mesečna sinhronizacija
Proces vključuje:
- avtomatsko obdelavo,
- preverjanje pogojev za prehode med statusi,
- generiranje mesečnih poročil,
- zanesljivost pri prekinitvah.

### 3.7 Modularnost
- ločeni moduli za uporabnike, nagrade, točke, sinhronizacije,
- omogočena hitra nadgradljivost,
- enostavno testiranje in odpravljanje napak.

---

## 4. Vmesniki (podrobno razširjeno)

### 4.1 Uporabniški portal
Omogoča:
- registracijo in prijavo,
- pregled točk,
- pregled nakupne zgodovine,
- filtriranje transakcij,
- pregled promocij,
- nakup in koriščenje nagrad,
- prejemanje obvestil,
- delovanje na računalnikih in mobilnih napravah.

### 4.2 Administrativni portal
Omogoča:
- napredno analitiko,
- generiranje poročil,
- dostop do orodij za SQL poizvedbe,
- pregled dnevnikov sistemskih dogodkov,
- konfiguracijo pravil nagrajevanja,
- urejanje nagrad in statusov,
- izvoz podatkov v različne formate.

### 4.3 Povezava s poslovnim sistemom
- pridobivanje podatkov o nakupih mesečno ali na zahtevo,
- validacija podatkov,
- obdelava v varnem okolju,
- izvoz napak in anomalij.

### 4.4 E-poštni vmesnik
- potrditvena e-pošta,
- obvestila o spremembah statusa,
- obvestila o porabi točk,
- integracija s SMTP ali storitvami tretjih oseb.

### 4.5 Tiskalni vmesnik
- generiranje kartic,
- izvoz podatkov za tisk (CSV/XML),
- spremljanje statusa pošiljk,
- ponovno naročilo kartic.

---

## 5. Slovar izrazov
1. Program lojalnosti – sistem nagrajevanja kupcev
2. Status – nivo lojalnosti
3. Točke – vrednost, pridobljena z nakupi
4. Nakupni program – zgodovina nakupov
5. Administracija – orodja za zaposlene
6. Portal – spletna aplikacija za uporabnike
7. Statusni prehod – pravila za napredovanje ali nazadovanje


## 6. Diagram primera stanj

![Diagram primerov uporabe](./usecase_diagram.png)
