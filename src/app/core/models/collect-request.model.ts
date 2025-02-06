export interface CollectRequest {
    id: number; 
    userId: number; 
    wasteType: 'plastique' | 'verre' | 'papier' | 'metal'; 
    estimatedWeight: number; 
    collectionAddress: string; 
    collectionDate: Date; 
    timeSlot: string; 
    status: 'en_attente' | 'occupée' | 'en_cours' | 'validée' | 'rejetée'; 
  }