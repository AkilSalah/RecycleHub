export interface CollectRequest {
    id: number;
    userId: number;
    wasteType: string;
    estimatedWeight: number;
    collectionAddress: string;
    collectionDate: Date;
    timeSlot: string;
    startTime: string;
    endTime: string;
    status: string;
  }
  