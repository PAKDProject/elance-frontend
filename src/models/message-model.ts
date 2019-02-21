export interface IMessage {
    content: string
    isSeen: boolean
    recipientId: string
    senderId: string
    timestamp: Date
}