import { Document } from 'mongoose';

export interface Report extends Document {
    readonly name: string;
    readonly type: string;
    readonly period: string;
    readonly year: number;
    readonly assignee: string;
    readonly deadline: Date;
    readonly submitted: boolean;
    readonly url: string;
    readonly companyId: string;
}

export class ReportEntity {
    constructor(
        public name: string,
        public type: string,
        public period: string,
        public year: number,
        public assignee: string,
        public deadline: Date,
        public submitted: boolean,
        public url: string,
        public companyId: string
    ) { }
}