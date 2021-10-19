# Exercice 1

Ajout de la notion de quantité

## Etape 1

Créer une entité quantité dans product
Mettre à jour l'entité au niveau de swagger
Verifier via les différentes routes (POST, PUT, GET) que la quantité est bien disponible

### Etape 2

Ajouter une vérification de la quantité lors de la création du paiement

### Etape 3

Implémentation de la SAGA :

Vérifier que la quantité disponible permet le paiement (plus grand que 0)
Réserver la quantité
Valider le paiement

Si le paiement est invalidé, rollback de la quantité à sa valeur initiale