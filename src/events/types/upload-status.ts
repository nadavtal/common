export enum UploadStatus {

    UploadingToServer = "uploading to server",
    Unzipping = "unzipping",
    Cancelled = "cancelled",
    Failed = "failed",
    AbortedByUser = "aborted by user",
    WaitingForNextChunk = "waiting for next chunk",
    UploadingToCloud = "uploading to cloud",
    Complete = "complete",
}
