export interface WasteItem {
    wasteType: "plastique" | "verre" | "papier" | "metal"
    estimatedWeight: number
  }
  
  export interface CollectRequest {
    id: number;
    userId: number;
    wasteItems: WasteItem[];
    collectionAddress: string;
    collectionCity: string;
    collectionDate: Date;
    timeSlot: string;
    startTime: string;
    endTime: string;
    status: "en_attente" | "occupée" | "en_cours" | "validée" | "rejetée"; 
    collectorId?: number; 
  }
  
  