# Exercice 2

Déplacer la SAGA paiement au sein d'un microservice à part

## Etape 1

Création du microservice
Ajout du microservice dans le docker-compose

## Etape 2

Créer une route permettant le lancement de la création d'un paiement

### Etape 3

Création de la SAGA :

Verification de la viabilité du buyerId 
Verification de la viabilité du productId
Verification de la somme proposée est supérieure au prix du produit
Verification de la quantité et réservation 
Création du paiement si OK, rollback si NOK 