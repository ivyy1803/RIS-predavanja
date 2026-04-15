# 📘 Celovit načrt razvoja projekta 

---

# 📌 1. Osnovne informacije o projektu

Projekt traja **12 mesecev** in vključuje **4–5 članov ekipe**. Razvoj temelji na metodologiji **Agile (Scrum)**, ki omogoča iterativno gradnjo sistema, sprotno testiranje in prilagajanje spremembam.

## 🔧 Ključne značilnosti:

* Dolžina sprinta: **2 tedna**
* Število sprintov: **~24**
* Število izdaj: **5**
* Način dela: **inkrementalen razvoj (po delih)**

## 🎯 Cilji:

* razviti stabilno in razširljivo aplikacijo
* zagotoviti kakovostno uporabniško izkušnjo
* omogočiti enostavno nadgradnjo sistema
* pripraviti projekt za produkcijo ali predstavitev

---

# 🧭 2. Okvirni projektni plan 

Projekt je razdeljen na več faz, kjer vsaka faza vsebuje več sprintov. Vsaka izdaja ima jasno definiran cilj in rezultat.

---

## 📦 Izdaja 1 – Analiza in setup (Mesec 1–2)

### 🎯 Cilj:

Postaviti temelje projekta (brez tega kasnejši razvoj ni učinkovit).

### 🔍 Aktivnosti:

* analiza zahtev
* definicija uporabniških zgodb
* načrt arhitekture
* osnovni UI dizajn

---

### 🏃 Sprint 1 (Teden 1–2)

* zbiranje zahtev (intervjuji, ideje)
* zapis user stories
* osnovni diagrami (use-case)
* razdelitev vlog v ekipi

👉 **Rezultat:** jasno definirano, kaj gradimo

---

### 🏃 Sprint 2 (Teden 3–4)

* setup Git repozitorija
* nastavitev razvojnega okolja
* osnovni frontend + backend projekt

👉 **Rezultat:** tehnična osnova projekta

---

### 🏃 Sprint 3 (Teden 5–6)

* implementacija osnovne navigacije
* login/registracija
* povezava frontend ↔ backend (testno)

👉 **Rezultat:** delujoč “skeleton”

---

## 📦 Izdaja 2 – Core funkcionalnosti (Mesec 3–5)

### 🎯 Cilj:

Razviti ključne funkcionalnosti sistema.

---

### 🏃 Sprint 4 (Teden 7–8)

* definicija podatkovnih modelov
* povezava z bazo
* osnovni CRUD (create)

---

### 🏃 Sprint 5 (Teden 9–10)

* CRUD (read, update, delete)
* validacija podatkov

---

### 🏃 Sprint 6 (Teden 11–12)

* API endpointi
* povezava frontend ↔ backend

---

### 🏃 Sprint 7 (Teden 13–14)

* izboljšave UI
* testiranje osnovnih funkcij

👉 **Rezultat:** aplikacija že deluje

---

## 📦 Izdaja 3 – Napredne funkcionalnosti (Mesec 6–8)

### 🎯 Cilj:

Dodati napredne funkcije in izboljšati UX.

---

### 🏃 Sprint 8 (Teden 15–16)

* filtriranje in iskanje
* napredni queryji

---

### 🏃 Sprint 9 (Teden 17–18)

* uporabniške vloge (admin/user)
* avtorizacija

---

### 🏃 Sprint 10 (Teden 19–20)

* izboljšan UI/UX
* boljša navigacija

---

### 🏃 Sprint 11 (Teden 21–22)

* dodatne funkcionalnosti (odvisno od projekta)

---

### 🏃 Sprint 12 (Teden 23–24)

* refaktoriranje kode
* optimizacija strukture

👉 **Rezultat:** skoraj končan produkt

---

## 📦 Izdaja 4 – Testiranje in optimizacija (Mesec 9–10)

### 🎯 Cilj:

Zagotoviti stabilnost in kakovost.

---

### 🏃 Sprint 13 (Teden 25–26)

* unit testi
* testiranje funkcij

---

### 🏃 Sprint 14 (Teden 27–28)

* integracijsko testiranje
* testiranje API-ja

---

### 🏃 Sprint 15 (Teden 29–30)

* odpravljanje napak
* izboljšanje performans

---

### 🏃 Sprint 16 (Teden 31–32)

* varnost
* optimizacija baze

👉 **Rezultat:** stabilna aplikacija

---

## 📦 Izdaja 5 – Zaključek (Mesec 11–12)

### 🎯 Cilj:

Priprava na oddajo ali produkcijo.

---

### 🏃 Sprint 17 (Teden 33–34)

* dokumentacija (tehnična)

---

### 🏃 Sprint 18 (Teden 35–36)

* uporabniška navodila

---

### 🏃 Sprint 19 (Teden 37–38)

* deployment (npr. cloud)

---

### 🏃 Sprint 20 (Teden 39–40)

* priprava demo verzije

---

### 🏃 Sprint 21–24 (Teden 41–48)

* zadnje izboljšave
* priprava predstavitve

👉 **Rezultat:** končni produkt

---

# 🧪 3. Okviren načrt testiranja 

---

# 🎯 3.1 Namen in cilji testiranja

Testiranje predstavlja enega najpomembnejših delov razvoja programske opreme. Njegov glavni namen ni samo odkrivanje napak, temveč tudi zagotavljanje, da sistem deluje pravilno, učinkovito in varno v vseh predvidenih situacijah.

## 🔍 Glavni cilji:

* zagotoviti pravilno delovanje vseh funkcionalnosti
* odkriti napake čim prej v razvojnem ciklu
* izboljšati kakovost kode
* zagotoviti stabilnost sistema pri večji obremenitvi
* zaščititi sistem pred zlorabami in varnostnimi tveganji

## 📌 Pomembno:

Testiranje ni enkraten proces, ampak poteka **kontinuirano skozi celoten projekt**.

---

# 🔄 3.2 Strategija testiranja

Testiranje se izvaja na več nivojih in v različnih fazah razvoja. Uporablja se kombinacija avtomatiziranih in ročnih testov.

## 🧩 Nivoji testiranja:

1. Unit testiranje
2. Integracijsko testiranje
3. Sistemsko testiranje
4. End-to-End testiranje
5. Sprejemno (acceptance) testiranje

---

## 🗓️ Časovni plan testiranja

| Faza razvoja    | Tip testiranja         |
| --------------- | ---------------------- |
| Vsak sprint     | Unit + integracijsko   |
| Po izdaji       | Sistemsko + E2E        |
| Pred zaključkom | Performance + security |
| Po deploymentu  | Sprejemno testiranje   |

---

# 🔹 3.3 Unit testiranje (najnižji nivo)

## 🎯 Namen:

Testirati posamezne funkcije ali metode izolirano od ostalega sistema.

## 📋 Kaj testiramo:

* funkcije za obdelavo podatkov
* validacijo vhodnih podatkov
* poslovno logiko

## 📌 Primeri:

* preverjanje pravilnosti email validacije
* funkcija za izračun rezultata
* preverjanje pravilnosti API metode

## ⚙️ Lastnosti:

* hitro izvajanje
* avtomatizirano
* ne vključuje baze ali API-ja

## 🛠️ Orodja:

* Jest
* Mocha
* JUnit

---

# 🔹 3.4 Integracijsko testiranje

## 🎯 Namen:

Preveriti pravilno delovanje povezav med komponentami.

## 📋 Kaj testiramo:

* backend ↔ baza
* frontend ↔ backend
* API komunikacijo

## 📌 Primeri:

* ali se podatki pravilno shranijo v bazo
* ali API vrača pravilne rezultate
* ali frontend pravilno prikazuje podatke

## ⚠️ Izzivi:

* odvisnost od več komponent
* počasnejše izvajanje

## 🛠️ Orodja:

* Postman
* Supertest

---

# 🔹 3.5 Sistemsko testiranje

## 🎯 Namen:

Testirati celoten sistem kot celoto.

## 📋 Kaj testiramo:

* vse funkcionalnosti skupaj
* delovanje aplikacije kot enoten sistem

## 📌 Primer:

* uporabnik ustvari račun → se prijavi → uporablja aplikacijo

---

# 🔹 3.6 End-to-End (E2E) testiranje

## 🎯 Namen:

Simulirati dejansko uporabo sistema s strani uporabnika.

## 📋 Kaj testiramo:

* celoten uporabniški tok
* interakcijo UI z backendom

## 📌 Primer scenarija:

1. uporabnik se registrira
2. potrdi email
3. se prijavi
4. ustvari nov zapis
5. ga spremeni
6. izbriše
7. se odjavi

## 🛠️ Orodja:

* Cypress
* Selenium

---

# 🔹 3.7 Manual (ročno) testiranje

## 🎯 Namen:

Preveriti uporabniško izkušnjo in vizualne elemente.

## 📋 Kaj testiramo:

* izgled aplikacije
* uporabniški vmesnik
* uporabnost (UX)

## 📌 Primeri:

* ali so gumbi pravilno postavljeni
* ali aplikacija deluje intuitivno
* testiranje robnih primerov

---

# 🔹 3.8 Performance testiranje

## 🎯 Namen:

Preveriti, kako sistem deluje pod obremenitvijo.

## 📋 Kaj testiramo:

* hitrost odziva
* število sočasnih uporabnikov
* stabilnost sistema

## 📌 Primeri:

* koliko uporabnikov lahko uporablja sistem hkrati
* kako hitro API odgovori

## 🛠️ Orodja:

* JMeter
* k6

---

# 🔹 3.9 Security testiranje

## 🎯 Namen:

Zagotoviti varnost sistema in zaščito podatkov.

## 📋 Kaj testiramo:

* avtorizacijo (kdo ima dostop)
* avtentikacijo (prijava)
* zaščito API-ja

## 📌 Primeri:

* preverjanje JWT tokena
* zaščita pred SQL injection
* zaščita pred XSS napadi

---

# 🔹 3.10 Sprejemno (Acceptance) testiranje

## 🎯 Namen:

Preveriti, ali sistem ustreza zahtevam uporabnika ali naročnika.

## 📋 Kaj testiramo:

* ali funkcionalnosti ustrezajo zahtevam
* ali sistem izpolnjuje poslovne cilje

## 📌 Kdo testira:

* naročnik
* profesor
* končni uporabniki

---

# 🔁 3.11 Avtomatizacija testiranja

## 🎯 Cilj:

Zmanjšati ročno delo in povečati zanesljivost testov.

## 📋 Kaj avtomatiziramo:

* unit teste
* API teste
* E2E scenarije

## 📈 Prednosti:

* hitrejše testiranje
* manj človeških napak
* ponovljivost

---

# 📊 3.12 Upravljanje napak (Bug tracking)

## 🔍 Proces:

1. odkrivanje napake
2. zapis napake (bug report)
3. dodelitev razvijalcu
4. odprava napake
5. ponovno testiranje

## 🛠️ Orodja:

* Jira
* Trello
* GitHub Issues

---

# 🔄 3.13 Testiranje skozi sprint

## 📅 Potek:

* med razvojem → unit testi
* po implementaciji → integracijski testi
* na koncu sprinta → demo + testiranje

---

# 📈 3.14 Merjenje kakovosti

## 📊 Metode:

* code coverage (pokritost kode)
* število napak
* čas odziva sistema
* zadovoljstvo uporabnikov

---

# ⚠️ 3.15 Tveganja pri testiranju

* premalo testov
* slabo definirani testni primeri
* pomanjkanje časa
* nepopolna avtomatizacija


---
# 🌐 4. Backend – definicija API-ja 

---

# 🎯 4.1 Namen in vloga backend sistema

Backend predstavlja osrednji del aplikacije, kjer se izvaja:

* poslovna logika (business logic)
* obdelava podatkov
* komunikacija z bazo podatkov
* avtentikacija in avtorizacija uporabnikov

API (Application Programming Interface) omogoča komunikacijo med frontendom (uporabniški vmesnik) in backendom (strežnik).

## 📌 Ključni cilji API-ja:

* omogočiti jasno in strukturirano komunikacijo
* zagotoviti varnost in zaščito podatkov
* omogočiti razširljivost sistema
* ločiti frontend in backend razvoj

---

# 🧱 4.2 Arhitektura backend sistema

## 🔹 REST arhitektura

Uporabljamo **REST (Representational State Transfer)** pristop, ki temelji na:

* virih (resources)
* HTTP metodah
* brezstanjskosti (stateless)

## 📌 Lastnosti:

* vsak zahtevek vsebuje vse potrebne podatke
* strežnik ne shranjuje stanja seje
* komunikacija poteka preko HTTP protokola

---

## 🔹 Struktura aplikacije

Tipična backend struktura:

* **Controller layer**

  * sprejema HTTP zahteve
  * vrača odgovore

* **Service layer**

  * vsebuje poslovno logiko

* **Repository/Data layer**

  * komunikacija z bazo

* **Model layer**

  * definicija podatkovnih struktur

---

# 🔗 4.3 HTTP metode in njihova uporaba

| Metoda | Namen                 | Primer          |
| ------ | --------------------- | --------------- |
| GET    | pridobivanje podatkov | /api/users      |
| POST   | ustvarjanje           | /api/users      |
| PUT    | posodobitev           | /api/users/{id} |
| DELETE | brisanje              | /api/users/{id} |

---

# 📦 4.4 Struktura API endpointov

## 📌 Konvencije:

* `/api/...` kot osnovna pot
* uporaba množine (users, items)
* uporaba ID-jev za specifične vire

---

## 🔐 4.5 Avtentikacija (Authentication)

### 🎯 Namen:

Preveriti identiteto uporabnika.

### 🔹 JWT (JSON Web Token)

Po uspešni prijavi uporabnik prejme token.

### Primer:

#### POST /api/auth/login

**Request:**

```json id="req1"
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response:**

```json id="res1"
{
  "token": "jwt-token"
}
```

---

## 🔐 4.6 Avtorizacija (Authorization)

### 🎯 Namen:

Določiti, kaj uporabnik sme početi.

### 📌 Primer:

* admin → lahko briše uporabnike
* user → lahko ureja samo svoj profil

### 🔹 Implementacija:

* preverjanje JWT tokena
* preverjanje uporabniških vlog

---

# 👤 4.7 API za uporabnike (Users)

## 🔹 GET /api/users

Vrne seznam vseh uporabnikov

## 🔹 GET /api/users/{id}

Vrne podatke o enem uporabniku

## 🔹 POST /api/users

Ustvari novega uporabnika

## 🔹 PUT /api/users/{id}

Posodobi uporabnika

## 🔹 DELETE /api/users/{id}

Izbriše uporabnika

---

# 📦 4.8 Primer entitete (npr. "Item")

## 🔹 GET /api/items

* seznam vseh elementov

## 🔹 POST /api/items

* dodajanje novega elementa

## 🔹 GET /api/items/{id}

* podrobnosti

## 🔹 PUT /api/items/{id}

* posodobitev

## 🔹 DELETE /api/items/{id}

* brisanje

---

# 📥 4.9 Struktura zahtev (Request)

## 📌 Primer:

```json id="req2"
{
  "name": "Izdelek",
  "price": 100,
  "description": "Opis izdelka"
}
```

---

# 📤 4.10 Struktura odgovorov (Response)

## 📌 Uspešen odgovor:

```json id="res2"
{
  "id": 1,
  "name": "Izdelek",
  "price": 100
}
```

---

## ⚠️ 4.11 Napake (Error handling)

## 🎯 Namen:

Uporabniku vrniti jasno informacijo o napaki.

## 📌 Primer:

```json id="err1"
{
  "error": "Invalid input",
  "message": "Email is required"
}
```

## 🔹 HTTP status kode:

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 500 Internal Server Error

---

# 🔍 4.12 Validacija podatkov

## 🎯 Namen:

Preprečiti napačne ali nevarne podatke.

## 📌 Primeri:

* email mora biti pravilen
* geslo mora imeti minimalno dolžino
* obvezna polja ne smejo biti prazna

---

# 🛢️ 4.13 Delo z bazo podatkov

## 🔹 Operacije:

* INSERT
* SELECT
* UPDATE
* DELETE

## 📌 Primer relacij:

* uporabnik ↔ naročila
* uporabnik ↔ vloge

---

# ⚡ 4.14 Optimizacija API-ja

## 📋 Pristopi:

* indeksiranje baze
* pagination (strani)
* caching
* zmanjšanje števila zahtev

---

# 🔒 4.15 Varnost API-ja

## 🔹 Ukrepi:

* HTTPS
* zaščita pred SQL injection
* zaščita pred XSS
* rate limiting

---

# 📑 4.16 Dokumentacija API-ja

## 🎯 Namen:

Olajšati razvoj in uporabo API-ja.

## 📋 Vključuje:

* opis endpointov
* primeri request/response
* opis parametrov

## 🛠️ Orodja:

* Swagger / OpenAPI

---

# 🔄 4.17 Verzije API-ja

## 🎯 Namen:

Omogočiti nadgradnje brez lomljenja sistema.

## 📌 Primer:

* /api/v1/users
* /api/v2/users

---

# 📊 4.18 Logiranje in monitoring

## 🎯 Namen:

Spremljanje delovanja sistema.

## 📋 Kaj beležimo:

* napake
* zahtevke
* odzivne čase

---

# 🔗 4.19 Primer celotnega toka

1. uporabnik pošlje zahtevek (frontend)
2. controller sprejme zahtevek
3. service obdela logiko
4. repository dostopa do baze
5. odgovor se vrne frontend-u

---

# 🎯 4.20 Zaključek

Backend in API:

* predstavljata jedro sistema
* omogočata komunikacijo med komponentami
* zagotavljata varnost in stabilnost

Dobro zasnovan API pomeni:

* lažji razvoj
* manj napak
* boljšo razširljivost sistema

---


# 👥 5. Organizacija ekipe (razširjeno)

## 🔹 Vloge

### Frontend developer

* UI/UX implementacija
* delo z API-jem

### Backend developer

* poslovna logika
* baza podatkov

### Full-stack developer

* povezovanje sistemov

### QA/Tester

* testiranje
* iskanje napak

### Projektni vodja

* koordinacija ekipe
* spremljanje napredka

---


