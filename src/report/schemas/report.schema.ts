import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema({
    name: String,
    type: String,
    period: String,
    year: Number,
    assignee: String,
    deadline: Date,
    submitted: Boolean,
    url: String,
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
})
