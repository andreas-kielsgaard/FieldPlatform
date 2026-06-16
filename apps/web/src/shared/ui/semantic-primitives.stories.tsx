import {
  CommunityRhythmSection,
  EntityCard,
  FieldSignalCard,
  ProfileDataVisibilityPanel,
  PublicationStatusBadge,
  RelationClaimPrompt,
  ReviewStateBadge,
  SaveFollowTrackControl,
  StewardAttributionBlock,
  VisibilityBadge,
  WaysInBlock,
  WhoThisIsForBlock,
} from "./semantic-primitives";

export default {
  title: "Field Platform/Semantic primitives",
};

export function PublishedPublicCommunity() {
  return (
    <EntityCard
      eyebrow="Community"
      summary="A stewarded field-orientation surface with concrete entry guidance."
      title="Harbor Repair Circle"
    >
      <VisibilityBadge scope="public" />
      <PublicationStatusBadge status="published" />
      <ReviewStateBadge state="accepted" />
    </EntityCard>
  );
}

export function DraftStewardVisibleEvent() {
  return (
    <EntityCard
      eyebrow="Event"
      summary="Draft events remain steward-visible until review and publication are complete."
      title="Tool orientation evening"
    >
      <VisibilityBadge scope="steward_visible" />
      <PublicationStatusBadge status="draft" />
      <ReviewStateBadge state="pending_review" />
    </EntityCard>
  );
}

export function PendingRelationClaim() {
  return (
    <RelationClaimPrompt
      rationale="This event is a concrete entry point into the repair circle."
      relationType="entry_point_for"
      state="pending_review"
    />
  );
}

export function WaysInGuidance() {
  return (
    <WaysInBlock
      items={[
        {
          access: "Open drop-in",
          audience: "First-time participants",
          entrySuggestion: "Arrive for the first 20 minutes and join the tool orientation.",
          experienceLevel: "beginner",
          priceText: "Free",
          threshold: "No repair experience required",
        },
      ]}
    />
  );
}

export function StewardAttribution() {
  return (
    <StewardAttributionBlock
      contribution="Maintains the representation and reviews proposed relation claims."
      stewardName="Mira Chen"
    />
  );
}

export function ParticipationControl() {
  return <SaveFollowTrackControl kind="tracked" selected={false} />;
}

export function ProfileVisibility() {
  return (
    <ProfileDataVisibilityPanel showEmail={false} showParticipation={false} showStewardships />
  );
}

export function FieldSignal() {
  return (
    <FieldSignalCard
      body="A seasonal repair run needs three extra tool stewards this month."
      signalType="stewardship_need"
      title="Tool steward capacity"
    />
  );
}

export function CommunityRhythm() {
  return (
    <CommunityRhythmSection rhythmSummary="Open table every Thursday, steward review every Monday." />
  );
}

export function WhoThisIsFor() {
  return <WhoThisIsForBlock audiences={["New repair volunteers", "Returning tool stewards"]} />;
}
