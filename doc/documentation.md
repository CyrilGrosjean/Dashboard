# **Dashboard Epitech**

## **Authors**

- cyril.grosjean@epitech.eu
- mattis.litot@epitech.eu

## **Architecture**

Notre projet est divisé en plusieurs micro-services.

Cette architecture nous permet de travailler plus rapidement et de coder des API qui sont évolutives et que nous pouvons facilement gérer.

De plus la generetion des widgets ce fait de manière générique, afin d'viter la duplication de code.

### **Les services**

- Currency
- Login
- Reddit
- Riot
- Spotify
- Weather
- Youtube

### **Les widgets**

- Weather by City
- Weather Pollution
- Riot Rotations
- Riot last match
- Reddit Service
- Youtube Stat
- Youtube Video
- Crypto Currency
- Money Currency
- Spotify track
- Spotify artist

## **Production deployement**

Notre projet utilise `docker-compose`, `Angular` pour la partie front et `RestJs` pour la partie back.

### **Docker compose**

Pour lancer le projet et le construire `$> docker-compose up --build`

Pour lancer le projet: `$> docker-compose up`
