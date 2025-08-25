import { Subjects } from "./subjects";

export interface UploadCompleteEvent {
    subject: Subjects.UploadComplete;
    data: {
        id: string;
        orderId: string;
        stripeId: string;
    };
}