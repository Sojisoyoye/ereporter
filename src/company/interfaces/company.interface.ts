import { Document } from 'mongoose';

export interface Company extends Document {
    readonly name: string;
    readonly address: string;
    readonly email: string;
    readonly description: string;
    readonly reports: any;
}