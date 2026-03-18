
# Predavanje 18.3.2026 – Specifikacija Programa lojalnosti

## 1. Kratek opis
Sistem za podporo programu lojalnosti trgovske verige **Maestro** je zasnovan kot celovita informacijska rešitev, ki omogoča motiviranje strank k pogostejšim in večjim nakupom preko zbiranja točk zvestobe in napredovanja po različnih nivojih lojalnosti.

Omogoča:
- registracijo strank,
- varno potrjevanje identitete,
- izdajo fizične kartice lojalnosti,
- samodejno spremljanje nakupov preko povezave s poslovnim informacijskim sistemom,
- mesečni izračun točk na podlagi pravil,
- upravljanje statusov (osnovni, bronasti, srebrni, zlati),
- prilagoditev pravil nagrajevanja.

Uporabniki imajo dostop do spletnega portala za pregled točk, nakupne zgodovine, programa ugodnosti in unovčevanje točk. Administrativni portal omogoča vpogled v statistike, upravljanje pravil, poizvedbe nad podatkovno bazo in upravljanje nagrad. Sistem podpira več kot 500.000 uporabnikov, je večjezičen in temelji na obstoječi Oracle podatkovni bazi.

---

## 2. Funkcionalne zahteve

### Včlanitev in upravljanje uporabnikov
1. Registracija strank prek spleta z varno potrditvijo elektronskega naslova. **MUST**
2. Generiranje uporabniškega računa in pošiljanje fizične kartice. **MUST**
3. Podpora obdelave osebnih podatkov skladno z varnostnimi zahtevami. **MUST**
4. Pošiljanje fizične kartice lojalnosti. **SHOULD**
5. Urejanje osebnih podatkov uporabnika. **SHOULD**

### Statusi lojalnosti
6. Podpora nivojem: osnovni, bronasti, srebrni, zlati. **MUST**
7. Samodejna sprememba statusa na osnovi nakupov. **MUST**
8. Spreminjanje pravil nagrajevanja in statusnih prehodov. **MUST**

### Točke zvestobe
9. Mesečni izračun točk za pretekli mesec na osnovi nakupov. **MUST**
10. Izračun točk po točkovniku glede na status stranke. **MUST**
11. Pred dodelitvijo točk preverba možnosti spremembe statusa. **MUST**

### Spletni portal za stranke
12. Pregled zbranih točk. **MUST**
13. Koriščenje točk. **MUST**
14. Pregled nakupnega programa in zneskov. **MUST**

### Administrativni portal
15. Pregled statusov strank po obdobjih. **SHOULD**
16. Pregled statistike nakupov. **SHOULD**
17. Izvajanje SQL poizvedb. **SHOULD**
18. Upravljanje nagrad. **MUST**
19. Upravljanje pravil nagrajevanja in statusnih prehodov. **MUST**

### Ostale funkcionalne zahteve
20. Podpora vsaj 500.000 uporabnikom in razširljivost za tuje trge. **MUST**
21. Podpora slovenščini in angleščini. **MUST**

---

## 3. Tehnične zahteve
- Podatkovna baza: **Oracle**.
- Horizontalna razširljivost.
- Varna spletna aplikacija.
- Sodobne spletne tehnologije za uporabniški vmesnik.
- Integracija s poslovnim informacijskim sistemom.
- Mesečni uvoz ali sinhronizacija podatkov.
- Modularna zasnova sistema.

---

## 4. Vmesniki
- Portal za stranke – pregled točk, koriščenje, nakupi, statusi.
- Administrativni vmesnik – pravila, statistika, poizvedbe.
- Vmesnik do poslovnega informacijskega sistema – mesečni podatki o nakupih.
- Vmesnik za pošiljanje e-pošte – potrditvena sporočila.
- Vmesnik za tiskanje/pošiljanje kartic.

---

## 5. Slovar izrazov
1. **Program lojalnosti** – sistem nagrajevanja kupcev.
2. **Status** – nivo lojalnosti (osnovni, bronasti, srebrni, zlati).
3. **Točke zvestobe** – vrednost, pridobljena z nakupi.
4. **Nakupni program** – zgodovina nakupov, ki vpliva na točke.
5. **Administracija** – sistemski del za zaposlene.
6. **Portal** – spletna aplikacija, dostopna uporabnikom.
7. **Prehod med statusi** – pravila napredovanja ali nazadovanja.
