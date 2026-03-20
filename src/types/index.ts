export interface UserProfile {
    id: string;
    cedula: string;
    full_name: string;
    phone: string;
    created_at?: string;
}

export interface Locale {
    id: string;
    name: string;
    image_url: string;
    description: string;
}

export interface Rating {
    id: string;
    user_id: string;
    locale_id: string;
    flavor: number;
    service: number;
    presentation: number;
    created_at: string;
}

export interface Vote {
    id: string;
    user_id: string;
    locale_id: string;
    created_at: string;
}
