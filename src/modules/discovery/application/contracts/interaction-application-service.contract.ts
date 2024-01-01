export abstract class DiscoveryInteractionApplicationServiceContract {
  abstract getInteractedProfilesIdForProfile(
    profileId: string,
  ): Promise<string[]>;
}
