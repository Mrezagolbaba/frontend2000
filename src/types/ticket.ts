export interface ITicket {
    id:          string;
    status:      string;
    category:    string;
    subject:     string;
    description: string;
    userId:      string;
    createdAt:   Date;
    updatedAt:   Date;
}