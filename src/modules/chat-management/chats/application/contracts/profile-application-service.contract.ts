export abstract class ChatProfileApplicationServiceContract {
  abstract validateProfileForChatCreation(profileId: string): Promise<boolean>;
}
