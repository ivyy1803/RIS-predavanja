# Dokumentacija - API načrt

## Uvod

API načrt opisuje glavne komunikacijske poti med uporabniškim vmesnikom, strežnikom in podatkovno bazo aplikacije **Program lojalnosti Maestro**. Aplikacija uporablja REST API, ki omogoča prijavo, registracijo, potrditev e-pošte, upravljanje uporabnikov, pregled in koriščenje nagrad, pregled transakcij, mesečni obračun točk ter administratorske funkcionalnosti.

Backend aplikacije je izdelan z uporabo **Node.js** in **Express.js**, podatki pa se hranijo v podatkovni bazi **PostgreSQL**.

Osnovni naslov API-ja:

```text
http://localhost:3000/api
```

---

## 1. Avtentikacija

### 1.1 Registracija uporabnika

```http
POST /api/auth/register
```

#### Namen

Ustvari nov uporabniški račun za stranko, ki se želi vključiti v program lojalnosti Maestro.

#### Vhodni podatki

```json
{
  "name": "Ana",
  "surname": "Novak",
  "email": "ana@email.com",
  "username": "ana",
  "password": "ana123"
}
```

#### Izhodni podatki

```json
{
  "message": "Registracija je uspešna. Za aktivacijo računa potrdi e-poštni naslov.",
  "user": {
    "id": 2,
    "name": "Ana",
    "surname": "Novak",
    "email": "ana@email.com",
    "username": "ana",
    "role": "USER",
    "points": 0,
    "status": "osnovni",
    "email_verified": false
  },
  "demoVerificationLink": "http://localhost:3000/api/auth/verify-email/primer-tokena"
}
```

#### Opis delovanja

Sistem preveri, ali so vsa obvezna polja izpolnjena. Nato preveri, ali uporabnik z enakim uporabniškim imenom ali e-poštnim naslovom že obstaja. Če je registracija uspešna, se uporabniku ustvari račun s statusom `osnovni`.

Račun ob registraciji še ni aktiven, dokler uporabnik ne potrdi e-poštnega naslova prek potrditvene povezave. V demo verziji se povezava za potrditev e-pošte izpiše v terminalu strežnika in v konzoli brskalnika.

---

### 1.2 Prijava uporabnika

```http
POST /api/auth/login
```

#### Namen

Omogoča prijavo uporabnika ali administratorja v aplikacijo.

#### Vhodni podatki

```json
{
  "username": "user",
  "password": "user123"
}
```

#### Izhodni podatki

```json
{
  "message": "Prijava uspešna.",
  "user": {
    "id": 2,
    "name": "Ana",
    "surname": "Novak",
    "email": "ana@email.com",
    "username": "user",
    "role": "USER",
    "points": 69,
    "status": "zlati",
    "email_verified": true
  }
}
```

#### Opis delovanja

Sistem preveri uporabniško ime in geslo. Če so podatki pravilni, vrne podatke uporabnika. Frontend glede na vlogo uporabnika odpre uporabniški ali administratorski del aplikacije.

Če uporabnik še ni potrdil e-poštnega naslova, sistem prijavo zavrne in prikaže obvestilo, da mora najprej potrditi e-pošto.

---

### 1.3 Potrditev e-pošte

```http
GET /api/auth/verify-email/:token
```

#### Namen

Endpoint omogoča potrditev e-poštnega naslova po registraciji uporabnika.

#### Primer zahteve

```http
GET /api/auth/verify-email/8f3a9c...
```

#### Izhodni podatki

Pri uspešni potrditvi sistem vrne HTML odgovor:

```html
<h2>E-pošta je uspešno potrjena.</h2>
<p>Račun je aktiviran. Zdaj se lahko prijaviš v aplikacijo.</p>
```

#### Opis delovanja

Ob registraciji sistem ustvari potrditveni žeton in povezavo za potrditev e-pošte. Ko uporabnik odpre povezavo, sistem nastavi `email_verified = true` in izbriše potrditveni žeton.

Če je povezava neveljavna ali je že bila uporabljena, sistem prikaže obvestilo o neveljavni povezavi.

---

## 2. Uporabniki

### 2.1 Pridobivanje podatkov uporabnika

```http
GET /api/users/:id
```

#### Namen

Vrne podatke posameznega uporabnika.

#### Primer zahteve

```http
GET /api/users/2
```

#### Izhodni podatki

```json
{
  "id": 2,
  "name": "Ana",
  "surname": "Novak",
  "email": "ana@email.com",
  "username": "user",
  "role": "USER",
  "points": 69,
  "status": "zlati"
}
```

#### Opis delovanja

Pred vračilom podatkov sistem ponovno izračuna število točk uporabnika na podlagi mesečnih obračunov in že izkoriščenih nagrad. Tako se zagotovi, da so prikazane točke vedno pravilne.

---

### 2.2 Posodobitev profila

```http
PUT /api/users/:id
```

#### Namen

Omogoča uporabniku spremembo osebnih podatkov.

#### Primer zahteve

```http
PUT /api/users/2
```

#### Vhodni podatki

```json
{
  "name": "Ana",
  "surname": "Kovač",
  "email": "ana.kovac@email.com"
}
```

#### Izhodni podatki

```json
{
  "message": "Profil je uspešno posodobljen.",
  "user": {
    "id": 2,
    "name": "Ana",
    "surname": "Kovač",
    "email": "ana.kovac@email.com",
    "username": "user",
    "role": "USER",
    "points": 69,
    "status": "zlati"
  }
}
```

#### Opis delovanja

Sistem preveri, ali so ime, priimek in e-pošta izpolnjeni. Nato posodobi podatke uporabnika v bazi. Uporabniškega imena ni mogoče spreminjati.

---

### 2.3 Sprememba gesla

```http
PUT /api/users/:id/password
```

#### Namen

Omogoča uporabniku spremembo gesla.

#### Primer zahteve

```http
PUT /api/users/2/password
```

#### Vhodni podatki

```json
{
  "currentPassword": "user123",
  "newPassword": "novo123",
  "confirmPassword": "novo123"
}
```

#### Izhodni podatki

```json
{
  "message": "Geslo je uspešno spremenjeno."
}
```

#### Opis delovanja

Sistem preveri trenutno geslo, nato preveri, ali se novo geslo in ponovitev gesla ujemata. Če so podatki pravilni, se geslo posodobi v bazi.

---

## 3. Nagrade

### 3.1 Pregled vseh aktivnih nagrad

```http
GET /api/rewards?userId=:userId
```

#### Namen

Vrne seznam aktivnih nagrad. Če je podan `userId`, sistem pri vsaki nagradi označi, ali jo je uporabnik že izkoristil.

#### Primer zahteve

```http
GET /api/rewards?userId=2
```

#### Izhodni podatki

```json
[
  {
    "id": 1,
    "title": "Popust 5%",
    "description": "Popust pri naslednjem nakupu",
    "points_required": 5,
    "active": true,
    "claimed": true
  },
  {
    "id": 2,
    "title": "Brezplačna kava",
    "description": "Brezplačna kava v poslovalnici",
    "points_required": 7.5,
    "active": true,
    "claimed": false
  }
]
```

#### Opis delovanja

Frontend uporablja ta endpoint za prikaz kartic nagrad. Če je nagrada že izkoriščena, se gumb na uporabniškem vmesniku prikaže kot onemogočen z napisom **Izkoriščeno**.

---

### 3.2 Koriščenje nagrade

```http
POST /api/rewards/claim
```

#### Namen

Omogoča uporabniku koriščenje nagrade z zbranimi točkami.

#### Vhodni podatki

```json
{
  "userId": 2,
  "rewardId": 4
}
```

#### Izhodni podatki

```json
{
  "message": "Nagrada je uspešno izkoriščena.",
  "points": 61.5
}
```

#### Opis delovanja

Sistem preveri, ali uporabnik obstaja, ali nagrada obstaja, ali je aktivna, ali jo uporabnik še ni izkoristil in ali ima dovolj točk. Če so pogoji izpolnjeni, se koriščenje shrani v tabelo `reward_claims`, uporabnikove točke pa se ponovno izračunajo.

---

## 4. Transakcije

### 4.1 Pregled transakcij uporabnika

```http
GET /api/transactions/user/:userId
```

#### Namen

Vrne seznam transakcij posameznega uporabnika.

#### Primer zahteve

```http
GET /api/transactions/user/2
```

#### Izhodni podatki

```json
[
  {
    "id": 10,
    "amount": 540,
    "points": 0,
    "transaction_date": "2026-04-18T00:00:00.000Z",
    "processed": false
  }
]
```

#### Opis delovanja

Transakcije same po sebi ne povečajo števila točk. Najprej čakajo na mesečni obračun. Polje `processed` pove, ali je transakcija že bila vključena v obračun.

---

### 4.2 Pregled zadnje transakcije uporabnika

```http
GET /api/transactions/user/:userId/last
```

#### Namen

Vrne zadnjo transakcijo uporabnika, ki se prikaže na nadzorni plošči.

#### Primer zahteve

```http
GET /api/transactions/user/2/last
```

#### Izhodni podatki

```json
{
  "id": 10,
  "amount": 540,
  "points": 20,
  "transaction_date": "2026-04-18T00:00:00.000Z",
  "processed": true
}
```

#### Opis delovanja

Endpoint se uporablja na nadzorni plošči za prikaz zadnje aktivnosti uporabnika.

---

### 4.3 Pregled mesečnih obračunov uporabnika

```http
GET /api/transactions/user/:userId/monthly
```

#### Namen

Vrne mesečne obračune za uporabnika.

#### Primer zahteve

```http
GET /api/transactions/user/2/monthly
```

#### Izhodni podatki

```json
[
  {
    "calculation_year": 2026,
    "calculation_month": 4,
    "total_amount": 540,
    "old_status": "srebrni",
    "new_status": "zlati",
    "points_awarded": 20,
    "calculated_at": "2026-05-23T10:30:00.000Z"
  }
]
```

#### Opis delovanja

Podatki se uporabljajo v zaslonski maski **Transakcije**, kjer uporabnik vidi mesečne obračune, skupni znesek nakupov, stari status, novi status in dodeljene točke.

---

## 5. Administracija

### 5.1 Pregled uporabnikov

```http
GET /api/admin/users
```

#### Namen

Vrne seznam navadnih uporabnikov.

#### Izhodni podatki

```json
[
  {
    "id": 2,
    "name": "Ana",
    "surname": "Novak",
    "email": "ana@email.com",
    "username": "user",
    "role": "USER",
    "points": 69,
    "status": "zlati"
  }
]
```

#### Opis delovanja

Endpoint vrne samo uporabnike z vlogo `USER`. Administratorji niso prikazani med navadnimi uporabniki. Pred vračilom se točke uporabnikov ponovno izračunajo.

---

### 5.2 Brisanje uporabnika

```http
DELETE /api/admin/users/:id
```

#### Namen

Omogoča administratorju brisanje uporabnika.

#### Primer zahteve

```http
DELETE /api/admin/users/5
```

#### Izhodni podatki

```json
{
  "message": "Uporabnik je izbrisan."
}
```

#### Opis delovanja

Sistem izbriše uporabnika iz baze. Zaradi povezav v bazi se z uporabnikom odstranijo tudi njegovi povezani podatki, kjer je to določeno s tujimi ključi.

---

### 5.3 Dodajanje nagrade

```http
POST /api/admin/rewards
```

#### Namen

Omogoča administratorju dodajanje nove nagrade.

#### Vhodni podatki

```json
{
  "title": "Darilna kartica 20 EUR",
  "description": "Darilna kartica v vrednosti 20 EUR",
  "points_required": 30
}
```

#### Izhodni podatki

```json
{
  "message": "Nagrada je dodana.",
  "reward": {
    "id": 6,
    "title": "Darilna kartica 20 EUR",
    "description": "Darilna kartica v vrednosti 20 EUR",
    "points_required": 30,
    "active": true
  }
}
```

#### Opis delovanja

Administrator vnese naziv, opis in potrebno število točk. Nova nagrada se shrani kot aktivna in je nato vidna uporabnikom.

---

### 5.4 Brisanje oziroma deaktivacija nagrade

```http
DELETE /api/admin/rewards/:id
```

#### Namen

Omogoča administratorju odstranitev nagrade iz aktivne ponudbe.

#### Primer zahteve

```http
DELETE /api/admin/rewards/6
```

#### Izhodni podatki

```json
{
  "message": "Nagrada je izbrisana."
}
```

#### Opis delovanja

Nagrada se ne izbriše fizično iz baze, ampak se označi kot neaktivna. Tako se ne prikazuje več uporabnikom.

---

### 5.5 Dodajanje transakcije

```http
POST /api/admin/transactions
```

#### Namen

Omogoča administratorju dodajanje transakcije za uporabnika.

#### Vhodni podatki

```json
{
  "user_id": 2,
  "amount": 540,
  "transaction_date": "2026-04-18T10:30"
}
```

#### Izhodni podatki

```json
{
  "message": "Transakcija je dodana in čaka na mesečni obračun.",
  "transaction": {
    "id": 10,
    "user_id": 2,
    "amount": 540,
    "points": 0,
    "transaction_date": "2026-04-18T10:30:00.000Z",
    "processed": false
  }
}
```

#### Opis delovanja

Transakcija se shrani z vrednostjo `processed = false`. Točke se pri dodajanju transakcije ne izračunajo takoj, ampak šele pri mesečnem obračunu.

---

### 5.6 Mesečni obračun točk

```http
POST /api/admin/process-month
```

#### Namen

Izvede mesečni obračun točk za izbrano leto in mesec.

#### Vhodni podatki

```json
{
  "year": 2026,
  "month": 4
}
```

#### Izhodni podatki

```json
{
  "message": "Mesečni obračun je uspešno izveden.",
  "processedUsers": 1
}
```

#### Opis delovanja

Sistem poišče vse neobračunane transakcije za izbrani mesec. Transakcije združi po uporabniku in izračuna skupni mesečni znesek nakupov.

Za vsakega uporabnika sistem:

1. pridobi trenutni status,
2. izračuna novi status glede na pravila prehajanja,
3. glede na novi status in mesečni znesek določi število točk,
4. shrani mesečni obračun,
5. označi transakcije kot obračunane,
6. ponovno izračuna skupne točke uporabnika.

---

### 5.7 Pregled statistike

```http
GET /api/admin/stats
```

#### Namen

Vrne osnovno statistiko aplikacije.

#### Izhodni podatki

```json
{
  "totalUsers": 5,
  "totalPoints": 220,
  "totalRewards": 12,
  "totalTransactions": 34
}
```

#### Opis delovanja

Endpoint se uporablja v admin panelu za prikaz števila uporabnikov, skupnih točk, aktivnih nagrad in vseh transakcij.

---

## 6. Varnost in nadzor dostopa

Frontend uporablja lokalno preverjanje prijave prek datoteke `authGuard.js`.

### Pravila dostopa

| Stran | Pravilo |
|---|---|
| `dashboard.html` | Dostop ima samo prijavljen uporabnik |
| `profil.html` | Dostop ima samo prijavljen uporabnik |
| `nagrade.html` | Dostop ima samo prijavljen uporabnik |
| `transakcije.html` | Dostop ima samo prijavljen uporabnik |
| `admin.html` | Dostop ima samo uporabnik z vlogo `ADMIN` |

Če uporabnik ni prijavljen, se preusmeri na stran za prijavo. Če navaden uporabnik poskuša odpreti admin panel, ga sistem preusmeri na nadzorno ploščo.

---

## 7. Glavne podatkovne tabele

| Tabela | Namen |
|---|---|
| `users` | Hrani uporabnike, vloge, statuse, stanje točk in podatke o potrditvi e-pošte |
| `transactions` | Hrani transakcije oziroma nakupe uporabnikov |
| `monthly_calculations` | Hrani mesečne obračune, stare in nove statuse ter dodeljene točke |
| `rewards` | Hrani nagrade, ki jih uporabniki lahko izkoristijo |
| `reward_claims` | Hrani podatke o izkoriščenih nagradah |
| `loyalty_points_rules` | Hrani pravila za dodeljevanje točk |
| `loyalty_status_rules` | Hrani pravila za prehajanje med statusi |

---

## 8. Pregled API endpointov

| Metoda | Endpoint | Namen |
|---|---|---|
| POST | `/api/auth/register` | Registracija uporabnika |
| POST | `/api/auth/login` | Prijava uporabnika |
| GET | `/api/auth/verify-email/:token` | Potrditev e-poštnega naslova |
| GET | `/api/users/:id` | Pridobivanje podatkov uporabnika |
| PUT | `/api/users/:id` | Posodobitev profila |
| PUT | `/api/users/:id/password` | Sprememba gesla |
| GET | `/api/rewards?userId=:userId` | Pregled aktivnih nagrad |
| POST | `/api/rewards/claim` | Koriščenje nagrade |
| GET | `/api/transactions/user/:userId` | Pregled transakcij uporabnika |
| GET | `/api/transactions/user/:userId/last` | Pregled zadnje transakcije |
| GET | `/api/transactions/user/:userId/monthly` | Pregled mesečnih obračunov |
| GET | `/api/admin/users` | Pregled uporabnikov |
| DELETE | `/api/admin/users/:id` | Brisanje uporabnika |
| POST | `/api/admin/rewards` | Dodajanje nagrade |
| DELETE | `/api/admin/rewards/:id` | Deaktivacija nagrade |
| POST | `/api/admin/transactions` | Dodajanje transakcije |
| POST | `/api/admin/process-month` | Mesečni obračun točk |
| GET | `/api/admin/stats` | Pregled statistike |

---

## 9. Sklep

API aplikacije **Program lojalnosti Maestro** podpira glavne funkcionalnosti uporabniškega in administratorskega dela sistema. Uporabniški del omogoča registracijo, potrditev e-pošte, prijavo, pregled točk, pregled transakcij, pregled nagrad, koriščenje nagrad in urejanje profila. Administratorski del omogoča upravljanje uporabnikov, nagrad, transakcij, statistike in mesečnega obračuna točk.

API je zasnovan kot REST vmesnik, kjer frontend komunicira z backendom prek HTTP zahtev, backend pa podatke shranjuje in pridobiva iz PostgreSQL baze.
