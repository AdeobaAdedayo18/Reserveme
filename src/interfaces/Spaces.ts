export interface Space {
    id: string;
    name: string;
    description: string;
    capacity: number;
    is_available: boolean;
    location: string;
    amenities: string[];
    hourly_rate: number;
    images: string[];
}