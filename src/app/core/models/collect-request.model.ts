export interface CollectRequest {
    id: number; 
    userId: number; 
    wasteType: 'plastique' | 'verre' | 'papier' | 'metal'; 
    estimatedWeight: number; 
    collectionAddress: string; 
    collectionDate: Date; 
    timeSlot: string; 
    status: 'en attente' | 'occupée' | 'en cours' | 'validée' | 'rejetée'; // Statut de la demande
  }