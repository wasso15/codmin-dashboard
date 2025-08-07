# Guide de Test - Fonctionnalité d'Export

## Tests à effectuer

### 1. Test de l'export complet en un clic

**Scénario :** L'utilisateur veut exporter toutes les données dans tous les formats disponibles.

**Étapes :**

1. Se connecter au tableau de bord
2. Cliquer sur le bouton "Exporter le rapport"
3. Choisir "Export complet (tous formats)" - option mise en évidence en bleu
4. Vérifier que 4 fichiers sont téléchargés :
   - `rapport_complet_dashboard_YYYY-MM-DD.csv`
   - `rapport_complet_dashboard_YYYY-MM-DD.xlsx`
   - `rapport_complet_dashboard_YYYY-MM-DD.html`
   - `rapport_complet_dashboard_YYYY-MM-DD.json`

**Résultat attendu :**

- ✅ Tous les fichiers sont téléchargés
- ✅ Notification de succès s'affiche
- ✅ Indicateur de chargement fonctionne
- ✅ Menu se ferme après l'export

### 2. Test des exports individuels

**Scénario :** L'utilisateur veut exporter un format spécifique.

**Tests à effectuer :**

#### 2.1 Export CSV

- Choisir "Rapport complet (CSV)"
- Vérifier le téléchargement du fichier .csv
- Ouvrir dans Excel/Google Sheets pour vérifier le contenu

#### 2.2 Export Excel

- Choisir "Rapport complet (Excel)"
- Vérifier le téléchargement du fichier .xlsx
- Ouvrir dans Excel pour vérifier les onglets

#### 2.3 Export HTML

- Choisir "Rapport complet (HTML)"
- Vérifier le téléchargement du fichier .html
- Ouvrir dans un navigateur pour vérifier la mise en page
- Tester l'impression (Ctrl+P) pour convertir en PDF

#### 2.4 Export JSON

- Choisir "Données JSON complètes"
- Vérifier le téléchargement du fichier .json
- Ouvrir dans un éditeur de texte pour vérifier la structure

### 3. Test de gestion d'erreurs

**Scénario :** L'utilisateur n'est pas authentifié.

**Étapes :**

1. Se déconnecter
2. Essayer d'accéder à l'export
3. Vérifier la redirection vers la page de connexion

**Résultat attendu :**

- ✅ Redirection vers /login
- ✅ Pas d'export possible sans authentification

### 4. Test de l'interface utilisateur

**Scénario :** Vérifier que l'interface est intuitive.

**Étapes :**

1. Cliquer sur le bouton d'export
2. Vérifier l'apparition du menu déroulant
3. Vérifier que l'option "Export complet" est mise en évidence
4. Cliquer à l'extérieur du menu pour le fermer
5. Vérifier les descriptions de chaque option

**Résultat attendu :**

- ✅ Menu s'ouvre correctement
- ✅ Option "Export complet" est en bleu et mise en évidence
- ✅ Menu se ferme en cliquant à l'extérieur
- ✅ Descriptions claires pour chaque option

### 5. Test des notifications

**Scénario :** Vérifier que les notifications fonctionnent.

**Étapes :**

1. Effectuer un export réussi
2. Vérifier la notification de succès
3. Attendre que la notification disparaisse automatiquement
4. Effectuer un export avec erreur (si possible)
5. Vérifier la notification d'erreur

**Résultat attendu :**

- ✅ Notification de succès s'affiche
- ✅ Notification disparaît automatiquement après 5 secondes
- ✅ Notification d'erreur s'affiche en cas de problème

## Validation des fichiers

### Fichier CSV

- Contenu : Données tabulaires séparées par des virgules
- Encodage : UTF-8
- Headers : Première ligne contient les noms des colonnes

### Fichier Excel

- Format : .xlsx
- Onglets : Plusieurs onglets selon le type d'export
- Structure : Données tabulaires avec headers

### Fichier HTML

- Format : HTML lisible
- Mise en page : Tables formatées avec styles CSS
- Contenu : Toutes les données du tableau de bord
- Impression : Peut être converti en PDF via le navigateur

### Fichier JSON

- Format : JSON valide
- Structure : Objet avec propriétés stats, provinceData, monthlyData
- Métadonnées : Date d'export incluse

## Problèmes connus et solutions

### Problème : Fichiers Excel ne s'ouvrent pas

**Solution :** Le format XML simple peut ne pas être compatible avec toutes les versions d'Excel. Utiliser le format CSV comme alternative.

### Problème : Fichier HTML mal formaté

**Solution :** Le fichier HTML est optimisé pour l'impression. Pour une meilleure qualité PDF, utiliser l'impression du navigateur (Ctrl+P).

### Problème : Téléchargements multiples bloqués

**Solution :** Certains navigateurs peuvent bloquer les téléchargements multiples. Vérifier les paramètres du navigateur.

## Performance

### Temps d'export attendus

- Export CSV : < 1 seconde
- Export Excel : < 2 secondes
- Export HTML : < 2 secondes
- Export JSON : < 1 seconde
- Export complet : < 5 secondes

### Optimisations possibles

- Mise en cache des données
- Génération asynchrone pour gros volumes
- Compression des fichiers
